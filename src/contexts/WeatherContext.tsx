import React, { createContext, useContext, useState } from "react";
import { Dimensions } from "react-native";

export interface WeatherContextType {
  searchValue: string;
  isCelsius: boolean;
  setSearchValue: (searchValue: string) => void;
  setIsCelsius: (unit: any) => void;
  RPH: (percentage: number) => number;
  RPW: (percentage: number) => number;
}

const WeatherContext = createContext<WeatherContextType>({
  searchValue: "Sofia",
  isCelsius: true,
  setSearchValue: () => {},
  setIsCelsius: () => {},
  RPH: () => 0,
  RPW: () => 0
});

export const WeatherProvider = ({ children }: any) => {
  const [searchValue, setSearchValue] = useState<string>("Sofia");
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
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
        searchValue,
        setSearchValue,
        isCelsius,
        setIsCelsius,
        RPH,
        RPW
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
