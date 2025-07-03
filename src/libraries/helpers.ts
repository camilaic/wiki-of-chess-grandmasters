export function getFormattedHours(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600); // total hours, not just hours in a day
  const minutes = Math.floor((totalSeconds % 3600) / 60); // minutes left after hours
  const seconds = totalSeconds % 60; // seconds left after minutes

  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(":");

  console.log(formattedTime); // 21:12:09
  return formattedTime;
}

