/**
 * Date Formatter for Chit-Chat
 * @param {string} //ISO date string of creation of message
 */
export function messageDateFormat(stringDate) {
  const dateNow = new Date();
  const dateObj = new Date(stringDate);
  let result = dateObj.toLocaleString();
  let hours = dateObj.getHours();
  const hourDifference = dateNow.getHours() - dateObj.getHours();
  const partOfDay = hours >= 12 ? "PM" : "AM";
  if (hours > 12) hours -= 12;
  let minutes = dateObj.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  const timeString = `${hours}:${minutes} ${partOfDay}`;
  const [dayString, monthString, todaysDate] = dateObj
    .toDateString()
    .split(" ");
  const dateString = `${dayString} ${monthString} ${todaysDate}`;
  if (hourDifference > 24) {
    result = `${timeString}, Today`;
  } else {
    result = `${dateString}, ${timeString}`;
  }
  return result;
}
