export default function dateChecker(dateStr) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const pattern = /^([1-9]|0[1-9]|[12][0-9]|3[01]) ([A-Z][a-z]+) (\d{4})$/;
  const match = dateStr.match(pattern);

  if (!match) return false;

  const [, , month] = match;
  return months.includes(month);
}
