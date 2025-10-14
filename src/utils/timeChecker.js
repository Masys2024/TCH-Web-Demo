export default function timeChecker(timeStr) {
  if (timeStr === "") {
    return true;
  }
  const pattern = /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/;
  return pattern.test(timeStr);
}
