import { formatExcelDate, formatExcelTime } from "./formatUtils";

/**
 * Parses a timetable Excel sheet with 3 header rows and returns structured JSON.
 */
export const parseTimetableData = (data) => {
  const output = [];

  if (!data || data.length < 4) return output;

  const dayRow = data[0]; // Row with "Monday", "Tuesday", etc.
  const dateRow = data[1]; // Row with dates (Excel serial numbers)
  const headerRow = data[2]; // Row with "Branch", "Standard", "Batch", etc.

  // ✅ Validate structure
  validateTimetableFormat(headerRow);

  const dateGroups = [];

  // ⬅️ Start from column 3 (after Branch, Standard, Batch)
  for (let col = 3; col < dayRow.length; col += 6) {
    const day = dayRow[col];
    const rawDate = dateRow[col];

    if (!day || !rawDate) continue;

    const formattedDate = formatExcelDate(rawDate);

    dateGroups.push({
      day: capitalize(day.trim()),
      date: formattedDate,
      startCol: col,
      endCol: col + 5,
    });
  }

  // ⬇️ Start processing data from row 3 onwards
  for (let rowIdx = 3; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx];

    const branch = row[0];
    const standard = row[1];
    const batch = row[2];
    if (!branch && !standard && !batch) continue;

    // Skip accidental duplicate header rows
    if (
      branch?.toLowerCase()?.includes("branch") ||
      standard?.toLowerCase()?.includes("standard") ||
      batch?.toLowerCase()?.includes("batch")
    ) {
      continue;
    }

    for (const group of dateGroups) {
      const [timeMorning, timeEvening, teacher, subject, topic, room] =
        row.slice(group.startCol, group.endCol + 1);

      const rowExcelNum = rowIdx + 1;
      const errors = [];

      if (!isValidTime(timeMorning)) {
        errors.push(
          `Invalid or missing 'Time (In)' in ${group.day}, Row ${rowExcelNum}`
        );
      }

      if (!isValidTime(timeEvening)) {
        errors.push(
          `Invalid or missing 'Time (Out)' in ${group.day}, Row ${rowExcelNum}`
        );
      }

      if (errors.length > 0) {
        throw new Error(errors.join(" | "));
      }

      output.push({
        day: group.day,
        date: group.date,
        branch: branch?.trim() || "",
        standard: standard?.trim() || "",
        batch: batch?.trim() || "",
        time_in: formatExcelTime(timeMorning),
        time_out: formatExcelTime(timeEvening),
        teacher: teacher || "",
        subject: subject || "",
        room: room || "",
        topic: topic || "",
      });
    }
  }

  // return output;
  return output.filter(
    (item) => item.room !== "" && item.teacher !== "" && item.subject !== ""
  );
};

/**
 * Validates the header row to ensure required structure.
 * Throws an error if structure is incorrect.
 */
const validateTimetableFormat = (headerRow) => {
  const requiredBaseHeaders = ["Branch", "Standard", "Batch"];
  for (let i = 0; i < requiredBaseHeaders.length; i++) {
    const actual = headerRow[i];
    const expected = requiredBaseHeaders[i];
    if (!actual || actual.trim().toLowerCase() !== expected.toLowerCase()) {
      throw new Error(`Missing or incorrect column '${expected}'`);
    }
  }

  return true;
};

/**
 * Basic time validity checker
 */
const isValidTime = (value) => {
  if (!value) return false;

  if (typeof value === "number") return true; // Excel time as float (e.g., 0.4 for 9:36 AM)

  const timeStr = value.trim?.();
  return /^([01]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?\s?(AM|PM)?$/i.test(timeStr);
};

/**
 * Capitalizes a word
 */
const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const parseBulkStudents = (data) => {
  const output = [];

  if (!data || data.length < 4) return output;

  for (let rowIdx = 1; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx];
    if (row?.length === 0) {
      continue;
    } else {
      output.push({
        No: row[0] || "",
        name: `${row[1] || ""} ${row[2] || ""} ${row[3] || ""}`.trim(),
        First_Name: row[1] || "",
        Middle_Name: row[2] || "",
        Last_Name: row[3] || "",
        Course_Name: row[4] || "",
        Std: row[5] || "",
        Div: row[6] || "",
        Address: row[7] || "",
        Student_Mobile: row[8] || "",
        Email: row[9] || "",
        DOB: row[10] || "",
        Gender: row[11] || "",
        Admission_Date: row[12] || "",
        Father_Name: row[13] || "",
        Father_Mobile: row[14] || "",
        Mother_Name: row[15] || "",
        Mother_Mobile: row[16] || "",
        Latest_Qualification: row[17] || "",
        Qualification_Result: row[18] || "",
        School_Or_College: row[19] || "",
        Telephone: row[20] || "",
        Father_Email: row[21] || "",
        Father_Off_Addr: row[22] || "",
        Board_Name: row[23] || "",
        Mother_Email: row[24] || "",
        Mother_Off_Address: row[25] || "",
      });
    }
  }

  // return output;
  return output;
};
