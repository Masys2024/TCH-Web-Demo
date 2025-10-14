// helpers/formatUtils.js
import * as XLSX from "xlsx";

export const formatExcelDate = (excelDate) => {
  if (!excelDate) return "";
  try {
    const formatted = XLSX.SSF.format("dd mmmm yyyy", excelDate);
    return formatted;
  } catch {
    return "";
  }
};

export const formatExcelTime = (value) => {
  if (value == null || value === "") return "";
  try {
    return XLSX.SSF.format("hh:mm:ss AM/PM", value);
  } catch {
    return "";
  }
};
