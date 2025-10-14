// Function to transform your existing row-based data into day-based structure
export default function transformToTimetableLayout(remappedData) {
  const groupedByDate = remappedData.reduce((acc, item) => {
    const dayValue = item?.day?.value || "";
    const dateValue = item?.date?.value || "";

    if (!acc[dateValue]) {
      acc[dateValue] = {
        day: {
          value: dayValue,
          isError: item?.day?.isError || false,
          errorMsg: item?.day?.errorMsg || "",
        },
        date: {
          value: dateValue,
          isError: item?.date?.isError || false,
          errorMsg: item?.date?.errorMsg || "",
        },
        batches: [],
      };
    }

    const lecture = {
      branch: {
        value: item?.branch?.value || "",
        isError: item?.branch?.isError || false,
        errorMsg: item?.branch?.errorMsg || "",
      },
      standard: {
        value: item?.standard?.value || "",
        isError: item?.standard?.isError || false,
        errorMsg: item?.standard?.errorMsg || "",
      },
      batch: {
        value: item?.batch?.value || "",
        isError: item?.batch?.isError || false,
        errorMsg: item?.batch?.errorMsg || "",
      },
      time_in: {
        value: item?.time_in?.value || "",
        isError: item?.time_in?.isError || false,
        errorMsg: item?.time_in?.errorMsg || "",
      },
      time_out: {
        value: item?.time_out?.value || "",
        isError: item?.time_out?.isError || false,
        errorMsg: item?.time_out?.errorMsg || "",
      },
      teacher: {
        value: item?.teacher?.value || "",
        isError: item?.teacher?.isError || false,
        errorMsg: item?.teacher?.errorMsg || "",
      },
      subject: {
        value: item?.subject?.value || "",
        isError: item?.subject?.isError || false,
        errorMsg: item?.subject?.errorMsg || "",
      },
      topic: {
        value: item?.topic?.value || "",
        isError: item?.topic?.isError || false,
        errorMsg: item?.topic?.errorMsg || "",
      },
      room: {
        value: item?.room?.value || "",
        isError: item?.room?.isError || false,
        errorMsg: item?.room?.errorMsg || "",
      },
    };

    acc[dateValue].batches.push(lecture);

    return acc;
  }, {});

  // Convert to array format
  const dates = Object.values(groupedByDate).map((dateData) => {
    // ✅ Group lectures consecutively by branch
    dateData.batches.sort((a, b) =>
      a.branch.value.localeCompare(b.branch.value)
    );
    return dateData;
  });

  return { data: dates };
}

export function transformToTimetableFormat(data) {
  const groupedByDate = data.reduce((acc, item) => {
    const dayValue = item.day || "";
    const dateValue = item.date || "";

    if (!acc[dateValue]) {
      acc[dateValue] = {
        day: {
          value: dayValue,
          isError: item.day?.isError || false,
          errorMsg: item.day?.errorMsg || "",
        },
        date: {
          value: dateValue,
          isError: item.date?.isError || false,
          errorMsg: item.date?.errorMsg || "",
        },
        batches: [],
      };
    }

    const lecture = {
      branch: {
        value: item.branches.code || "",
        isError: item.branch?.isError || false,
        errorMsg: item.branch?.errorMsg || "",
      },
      standard: {
        value: item.standards.code || "",
        isError: item.standard?.isError || false,
        errorMsg: item.standard?.errorMsg || "",
      },
      batch: {
        value: item.batches.code || "",
        isError: item.batch?.isError || false,
        errorMsg: item.batch?.errorMsg || "",
      },
      time_in: {
        value: item.time_in || "",
        isError: item.time_in?.isError || false,
        errorMsg: item.time_in?.errorMsg || "",
      },
      time_out: {
        value: item.time_out || "",
        isError: item.time_out?.isError || false,
        errorMsg: item.time_out?.errorMsg || "",
      },
      teacher: {
        value: item.teachers.code || "",
        isError: item.teacher?.isError || false,
        errorMsg: item.teacher?.errorMsg || "",
      },
      subject: {
        value: item.subjects.code || "",
        isError: item.subject?.isError || false,
        errorMsg: item.subject?.errorMsg || "",
      },
      topic: {
        value: item?.topic || "",
        isError: false,
        errorMsg: "",
      },
      room: {
        value: item.rooms.code || "",
        isError: item.room?.isError || false,
        errorMsg: item.room?.errorMsg || "",
      },
    };

    acc[dateValue].batches.push(lecture);

    return acc;
  }, {});

  const dates = Object.values(groupedByDate).map((dateData) => {
    // ✅ Group lectures consecutively by branch
    dateData.batches.sort((a, b) =>
      a.branch.value.localeCompare(b.branch.value)
    );
    return dateData;
  });

  return { data: dates };
}
