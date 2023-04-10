//function that creates the date time object
// {day: 1, weekday: saturday, month: 1, year: 2020, hour, minute, second, ampm}
//

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
export function getCurrentDateTime() {
  const now = new Date();
  return JSON.stringify({
    day: now.getDate(),
    weekday: weekdays[now.getDay()],
    month: months[now.getMonth()],
    year: now.getFullYear(),
    hour: now.getHours() === 0
      ? 12
      : now.getHours() > 12
      ? now.getHours() - 12
      : now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
    //determine if am or pm
    ampm: now.getHours() >= 12 ? "pm" : "am",
  });
}