import React from "react";
import { ScrollView } from "react-native";
import { useWeather } from "../contexts/WeatherContext";
import { filterDailyForecasts, getDayOfTheWeek } from "../utils";
import WeatherForecastCard from "./ForecastCard";

const ForecastScrollView = ({
  forecastData
}: {
  forecastData: DailyForecast[];
}) => {
  const { RPH, RPW } = useWeather();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      style={{
        marginTop: RPH(5),
        alignContent: "center",
        paddingHorizontal: RPW(5),
        maxHeight: "25%"
      }}
    >
      {filterDailyForecasts(forecastData)?.map((forecast, index) => {
        let dayofTheWeek = getDayOfTheWeek(forecast.dt_txt);
        return (
          <WeatherForecastCard
            key={index}
            forecast={forecast}
            dayofTheWeek={dayofTheWeek}
          />
        );
      })}
    </ScrollView>
  );
};

export default ForecastScrollView;
