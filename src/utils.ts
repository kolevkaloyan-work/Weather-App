export const getDayOfTheWeek = (date: string) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date(date);
  let day = weekday[d.getDay()];

  return day;
};
