import dateChecker from "@/utils/dateChecker";
import dayChecker from "@/utils/dayChecker";
import timeChecker from "@/utils/timeChecker";

/**
 * Helper: convert "HH:MM:SS AM/PM" to minutes since midnight
 */
function toMinutes(timeStr) {
  if (!timeStr) return null;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

/**
 * Maps parsed timetable entries with DB records and adds validation flags
 */
export default function remappingWithDB(
  data,
  { BRANCHES, STANDARDS, BATCHES, ROOMS, SUBJECTS, TEACHERS }
) {
  if (!data?.length) return data;

  const temp_data = [];

  // Step 1: map base validations
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const {
      day,
      date,
      time_in,
      time_out,
      teacher: teacherCode,
      subject: subjectCode,
      batch: batchCode,
      room: roomCode,
      branch: branchCode,
      standard: standardCode,
      topic,
    } = item;

    const branch = BRANCHES?.find((b) => b.code === String(branchCode));
    const standard = STANDARDS?.find((s) => s.code === String(standardCode));
    const batch = BATCHES?.find((b) => b.code === String(batchCode));
    const teacher = TEACHERS?.find((t) => t.code === String(teacherCode));
    const subject = SUBJECTS?.find((s) => s.code === String(subjectCode));
    const room = ROOMS?.find((r) => r.code === String(roomCode));

    const time_in_error = timeChecker(time_in)
      ? ""
      : "Time doesn't match the format 'HH:MM:SS AM/PM'";

    const time_out_error = timeChecker(time_out)
      ? ""
      : "Time doesn't match the format 'HH:MM:SS AM/PM'";

    const teacher_error =
      teacher?.code || teacherCode === "" ? "" : "Code Not Found";

    const subject_error =
      subject?.code || subjectCode === "" ? "" : "Code Not Found";

    const batch_error = batch?.code || batchCode === "" ? "" : "Code Not Found";
    const branch_error =
      branch?.code || branchCode === "" ? "" : "Code Not Found";
    const standard_error =
      standard?.code || standardCode === "" ? "" : "Code Not Found";

    const room_error = room?.code || roomCode === "" ? "" : "Code Not Found";

    const day_error = dayChecker(day) ? "" : "Enter a Valid Day";
    const date_error = dateChecker(date) ? "" : "Enter a Valid Date";

    temp_data.push({
      originalIndex: i,
      day: { value: day, isError: !!day_error, errorMsg: day_error },
      date: { value: date, isError: !!date_error, errorMsg: date_error },
      time_in: {
        value: time_in,
        isError: !!time_in_error,
        errorMsg: time_in_error,
      },
      time_out: {
        value: time_out,
        isError: !!time_out_error,
        errorMsg: time_out_error,
      },
      teacher: {
        value: teacherCode,
        isError: !!teacher_error,
        errorMsg: teacher_error,
      },
      subject: {
        value: subjectCode,
        isError: !!subject_error,
        errorMsg: subject_error,
      },
      batch: {
        value: batchCode,
        isError: !!batch_error,
        errorMsg: batch_error,
      },
      topic: { value: topic, isError: false, errorMsg: "" },
      room: { value: roomCode, isError: !!room_error, errorMsg: room_error },
      branch: {
        value: branchCode,
        isError: !!branch_error,
        errorMsg: branch_error,
      },
      standard: {
        value: standardCode,
        isError: !!standard_error,
        errorMsg: standard_error,
      },
    });
  }

  // Step 2: teacher scheduling checks
  const teacherSchedules = {};

  temp_data.forEach((entry, idx) => {
    const teacherCode = entry.teacher.value;
    if (!teacherCode) return;

    const day = entry.day.value;
    const date = entry.date.value;
    const branchCode = entry.branch.value;
    const batchCode = entry.batch.value;
    const timeIn = toMinutes(entry.time_in.value);
    const timeOut = toMinutes(entry.time_out.value);

    if (!teacherSchedules[teacherCode]) teacherSchedules[teacherCode] = [];
    teacherSchedules[teacherCode].push({
      idx,
      day,
      date,
      batchCode,
      branchCode,
      timeIn,
      timeOut,
      ...entry,
    });
  });

  // Step 3: validate per teacher
  Object.values(teacherSchedules).forEach((schedule) => {
    // group by date
    const grouped = {};
    schedule.forEach((lec) => {
      const key = `${lec.date.value}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(lec);
    });

    Object.values(grouped).forEach((lectures) => {
      // sort by time_in
      lectures.sort((a, b) => a.timeIn - b.timeIn);

      for (let i = 0; i < lectures.length; i++) {
        const current = lectures[i];
        const currentEntry = temp_data[current.idx];

        // 1. Check for duplicate lecture time (exact overlap)
        for (let j = i + 1; j < lectures.length; j++) {
          const other = lectures[j];

          if (
            current.timeIn === other.timeIn &&
            current.timeOut === other.timeOut &&
            current.date.value === other.date.value
          ) {
            currentEntry.teacher.isError = true;
            currentEntry.teacher.errorMsg =
              "Teacher has another lecture at the same time";
            temp_data[other.idx].teacher.isError = true;
            temp_data[other.idx].teacher.errorMsg =
              "Teacher has another lecture at the same time";
          } else if (
            current.timeOut === other.timeIn &&
            current.date.value === other.date.value
          ) {
            const gap = other.timeIn - current.timeOut; // in minutes
            if (other.branchCode === current.branchCode) {
              break;
            } else if (gap >= 0 && other.branchCode !== current.branchCode) {
              const branch = BRANCHES?.find(
                (b) => b.code === String(current.branchCode)
              );
              const timeLimit = branch?.time_limit
                ? parseInt(branch.time_limit)
                : 30;

              if (gap < timeLimit) {
                currentEntry.teacher.isError = true;
                currentEntry.teacher.errorMsg = `Consecutive lecture gap below limit(${timeLimit})`;
                temp_data[other.idx].teacher.isError = true;
                temp_data[
                  other.idx
                ].teacher.errorMsg = `Consecutive lecture gap below limit(${timeLimit})`;
              }
            }
          }
        }
      }
    });
  });

  return temp_data;
}
