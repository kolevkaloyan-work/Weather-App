import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard,
  Switch
} from "react-native";
import { useWeather } from "../contexts/WeatherContext";
import WeatherForecastCard from "../components/ForecastCard";
import WeatherDetailsContainer from "../components/WeatherDetailsContainer";
import SearchBar from "../components/SearchBar";
import { getDayOfTheWeek } from "../utils";
import { Colors, LoaderScreen } from "react-native-ui-lib";
import _ from "lodash";
import ErrorMessageContainer from "../components/ErrorContainer";
import ToggleDegrees from "../components/ToggleDegrees";

export const WeatherScreen = () => {
  const {
    currentCity,
    setCurrentCity,
    searchValue,
    setSearchValue,
    weather,
    setWeather,
    forecasts,
    setForecasts,
    RPH,
    RPW,
    isCelsius
  } = useWeather();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const weatherURL = `/weather?q=${searchValue}&appid=${
    process.env.API_KEY
  }&units=${isCelsius ? "metric" : "imperial"}`;
  const forecastURL = `/forecast?q=${searchValue}&appid=${
    process.env.API_KEY
  }&units=${isCelsius ? "metric" : "imperial"}`;

  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 5000
  });

  const debouncedSearch = _.debounce(() => {
    fetchData(weatherURL, "weather");
    fetchData(forecastURL, "forecast");
  }, 800);

  useEffect(() => {
    fetchData(weatherURL, "weather");
    fetchData(forecastURL, "forecast");

    return () => {
      setWeather(undefined);
      setForecasts(undefined);
    };
  }, [isCelsius]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setError(false);
  };

  const handleSearchClick = () => {
    if (searchValue !== "") {
      setIsLoading(true);
      debouncedSearch();
    }
    Keyboard.dismiss();
  };

  //The api returns a forecast for every 3 hours fo the next 5 day(total of 40)
  // However i only want one forcast for each day instead of 8 and that's why i need this filer func
  const filterDailyForecasts = (forecastList: DailyForecast[]) => {
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

  const fetchData = async (
    url: string,
    endpointType: "weather" | "forecast"
  ) => {
    try {
      const res = await api.get(url);
      if (endpointType === "weather") {
        setWeather(res.data);
      } else if (endpointType === "forecast") {
        const filteredForecasts = filterDailyForecasts(res.data?.list);
        setCurrentCity(res.data?.city?.name);
        setForecasts(filteredForecasts);
      }
      setError(false);
    } catch (err: any) {
      console.log(err);
      setError(true);
      setErrorMessage(
        "Can't find the city you are looking for. Please, try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View>
        <ImageBackground
          source={require("../assets/background.jpg")}
          imageStyle={{ resizeMode: "cover", flex: 1 }}
          style={{ height: RPH(100) }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <SearchBar
              value={searchValue}
              placeholder="Search by city..."
              onChangeText={handleSearchChange}
              maxLength={15}
              handleSearchClick={handleSearchClick}
            />
            <ToggleDegrees isCelsius={isCelsius} />
          </View>
          {isLoading ? (
            <LoaderScreen
              message={"Loading..."}
              color={"white"}
              messageStyle={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold"
              }}
            />
          ) : error ? (
            <ErrorMessageContainer message={errorMessage} />
          ) : (
            <>
              <View
                style={{
                  alignItems: "center"
                }}
              >
                {weather?.main && (
                  <>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {weather?.name}/{weather?.sys.country}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={{
                          uri: `https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`
                        }}
                        height={RPH(15)}
                        width={RPW(25)}
                      />
                      <Text
                        style={{
                          fontSize: 80,
                          fontWeight: "bold",
                          color: "white"
                        }}
                      >
                        {weather?.main.temp.toFixed(0)}&deg;
                        {isCelsius ? "C" : "F"}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 20, color: "white" }}>
                      {weather?.weather[0].description}
                    </Text>
                  </>
                )}
              </View>
              {weather && <WeatherDetailsContainer weather={weather} />}
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
                {forecasts?.map((forecast, index) => {
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
            </>
          )}
        </ImageBackground>
      </View>
    </>
  );
};
