/**
 * Date Formatter for Chit-Chat
 * @param {string} //ISO date string of creation of message
 */
export function messageDateFormat(stringDate) {
  const dateNow = new Date();
  const dateObj = new Date(stringDate);
  let result = dateObj.toLocaleString();
  let hours = dateObj.getHours();
  const hourDifference = getHoursDifference(dateObj, dateNow);
  const partOfDay = hours >= 12 ? "PM" : "AM";
  if (hours > 12) hours -= 12;
  let minutes = dateObj.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  const timeString = `${hours}:${minutes} ${partOfDay}`;
  const [dayString, monthString, todaysDate] = dateObj
    .toDateString()
    .split(" ");
  const dateString = `${dayString} ${monthString} ${todaysDate}`;
  if (hourDifference < 24 && dateNow.getHours() >= hourDifference) {
    result = `${timeString}, Today`;
  } else {
    result = `${dateString}, ${timeString}`;
  }
  return result;
}

/**
 * For calculating diffence between two dates in hours
*/
function getHoursDifference(startDate, endDate) {
  // Convert the date strings or date objects to Date objects if needed
  if (!(startDate instanceof Date)) {
    startDate = new Date(startDate);
  }
  if (!(endDate instanceof Date)) {
    endDate = new Date(endDate);
  }

  // Calculate the difference in milliseconds
  const timeDifference = endDate - startDate;

  // Calculate the difference in hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference;
}
