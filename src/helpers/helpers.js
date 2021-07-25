function getCurrentDate() {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return currentDate;
}
function getDailyLimit(weight, height, age, desiredWeight) {
  const dailyLimit =
    10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
  return Math.round(dailyLimit);
}

module.exports = { getCurrentDate, getDailyLimit };
