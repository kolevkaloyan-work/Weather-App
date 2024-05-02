import React, { createContext, useContext, useState } from "react";
import { WeatherData } from "../types/WeatherType";
import { Dimensions } from "react-native";

interface WeatherContextType {
  currentCity: string;
  searchValue: string;
  weather: WeatherData | undefined;
  forecasts: DailyForecast[] | undefined;
  units: string;
  setCurrentCity: (city: string) => void;
  setSearchValue: (searchValue: string) => void;
  setWeather: (weather: WeatherData | undefined) => void;
  setForecasts: (forecasts: DailyForecast[] | undefined) => void;
  setUnits: (unit: string) => void;
  RPH: (percentage: number) => number;
  RPW: (percentage: number) => number;
}

const WeatherContext = createContext<WeatherContextType>({
  currentCity: "Sofia",
  searchValue: "Sofia",
  weather: undefined,
  forecasts: undefined,
  units: "metric",
  setCurrentCity: () => {},
  setSearchValue: () => {},
  setWeather: () => {},
  setForecasts: () => {},
  setUnits: () => {},
  RPH: () => 0,
  RPW: () => 0
});

export const WeatherProvider = ({ children }: any) => {
  const [currentCity, setCurrentCity] = useState<string>("Sofia");
  const [searchValue, setSearchValue] = useState<string>("Sofia");
  const [weather, setWeather] = useState<WeatherData | undefined>();
  const [forecasts, setForecasts] = useState<DailyForecast[] | undefined>();
  const [units, setUnits] = useState<string>("metric");

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  //responsive height
  const RPH = (percentage: number) => {
    return (percentage / 100) * screenHeight;
  };

  //responsive width
  const RPW = (percentage: number) => {
    return (percentage / 100) * screenWidth;
  };

  return (
    <WeatherContext.Provider
      value={{
        currentCity,
        searchValue,
        weather,
        forecasts,
        units,
        setCurrentCity,
        setSearchValue,
        setWeather,
        setForecasts,
        setUnits,
        RPH,
        RPW
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
