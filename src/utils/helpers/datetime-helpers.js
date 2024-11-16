function compareTime(dateTime1, dateTime2) {
  //Arrival
  let dt1 = new Date(dateTime1);
  //Departure
  let dt2 = new Date(dateTime2);
  return dt1 <= dt2;
}
module.exports = { compareTime };
