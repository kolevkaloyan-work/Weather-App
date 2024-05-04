import { useQuery } from "@tanstack/react-query";
import { useWeatherClient } from "../client/useWeatherClient";
import { useCallback } from "react";

export const useWeatherQuery = () => {
  const { getWeather, getForecast } = useWeatherClient();

  const useGetWeather = useCallback(
    (searchValue: string, isCelsius: boolean) => {
      return useQuery({
        queryKey: ["weather", searchValue, isCelsius],
        queryFn: () => getWeather(searchValue, isCelsius)
      });
    },
    []
  );

  const useGetForecast = useCallback(
    (searchValue: string, isCelsius: boolean) => {
      return useQuery({
        queryKey: ["forecast", searchValue, isCelsius],
        queryFn: () => getForecast(searchValue, isCelsius)
      });
    },
    []
  );

  return { useGetWeather, useGetForecast };
};
