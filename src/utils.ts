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

//The api returns a forecast for every 3 hours fo the next 5 day(total of 40)
// However i only want one forcast for each day instead of 8 and that's why i need this filer func
export const filterDailyForecasts = (forecastList: DailyForecast[]) => {
  const dailyForecasts: DailyForecast[] = [];

  forecastList.forEach((forecast) => {
    const time = forecast.dt_txt.split(" ")[1];
    if (time === "15:00:00") {
      const date = forecast.dt_txt.split(" ")[0];
      const existingForecast = dailyForecasts.find(
        (item) => item.dt_txt.split(" ")[0] === date
      );
      if (!existingForecast) {
        dailyForecasts.push(forecast);
      }
    }
  });

  return dailyForecasts;
};
