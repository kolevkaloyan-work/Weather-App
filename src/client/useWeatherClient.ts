import axios from "axios";
import { useWeather } from "../contexts/WeatherContext";
import { filterDailyForecasts } from "../utils";

export const useWeatherClient = () => {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 5000
  });

  const getWeather = async (searchValue: string, isCelsius: boolean) => {
    return api
      .get(
        `/weather?q=${searchValue}&appid=${process.env.API_KEY}&units=${
          isCelsius ? "metric" : "imperial"
        }`
      )
      .then((res) => res.data);
  };

  const getForecast = async (searchValue: string, isCelsius: boolean) => {
    return api
      .get(
        `/forecast?q=${searchValue}&appid=${process.env.API_KEY}&units=${
          isCelsius ? "metric" : "imperial"
        }`
      )
      .then((res) => res.data);
  };

  return { getWeather, getForecast };
};
