import React from "react";
import { View } from "react-native";
import { WeatherData } from "../types/WeatherType";
import { useWeather } from "../contexts/WeatherContext";
import WeatherUnit from "./WeatherDetails";

interface WeatherDetailsContainerProps {
  weather: WeatherData;
}

const WeatherDetailsContainer = ({ weather }: WeatherDetailsContainerProps) => {
  const { RPH, RPW, isCelsius } = useWeather();
  return (
    <View
      style={{
        marginVertical: RPH(3),
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderColor: "rgba(255, 255, 255, 0.6)",
        borderWidth: 0.5,
        paddingVertical: RPH(1),
        marginHorizontal: RPW(6),
        borderRadius: 20
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        <WeatherUnit
          title="Feel"
          value={`${weather.main.feels_like.toFixed(1).toString()} \u00B0${
            isCelsius ? "C" : "F"
          }`}
        />
        <WeatherUnit
          title="Low"
          value={`${weather.main.temp_min.toFixed(1).toString()} \u00B0${
            isCelsius ? "C" : "F"
          }`}
        />
        <WeatherUnit
          title="High"
          value={`${weather.main.temp_max.toFixed(1).toString()} \u00B0${
            isCelsius ? "C" : "F"
          }`}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        <WeatherUnit
          title="Wind"
          value={
            weather.wind.speed.toString() + `${isCelsius ? " M/S" : " KT"}`
          }
          icon="wind"
        />
        <WeatherUnit
          title="Humidity"
          value={weather.main.humidity.toString() + " %"}
          icon="humidity"
        />
      </View>
    </View>
  );
};

export default WeatherDetailsContainer;
