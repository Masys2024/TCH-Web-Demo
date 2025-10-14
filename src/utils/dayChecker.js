export default function dayChecker(dayStr) {
  const validDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return validDays.includes(dayStr);
}
