export default function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds] = time.split(":");

  hours = parseInt(hours, 10);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
}
