import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { WeatherData } from "./types/WeatherType";

export const WeatherScreen = () => {
  const [currentCity, setCurrentCity] = useState("");
  const [weather, setWeather] = useState<WeatherData>();
  const [forecasts, setForecasts] = useState<DailyForecast[]>();
  const [units, setUnits] = useState<string>("metric");
  const [userLocation, setUserLocation] = useState({
    lat: "42.6977028",
    lon: "23.319941"
  });

  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 5000
  });

  //The api returns a forecast for every 3 hours fo the next 5 day(total of 40)
  // However i only want one forcast for each day instead of 8 and that's why i need this filer func
  function filterDailyForecasts(forecastList: DailyForecast[]) {
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
  }

  const weatherURL = `/weather?lat=${userLocation.lat}4&lon=${userLocation.lon}&appid=${process.env.API_KEY}&units=${units}`;
  const forecastURL = `/forecast?lat=${userLocation.lat}4&lon=${userLocation.lon}&appid=${process.env.API_KEY}&units=${units}`;

  const fetchData = async (
    url: string,
    endpointType: "weather" | "forecast"
  ) => {
    console.log(url, "URL");
    try {
      const res = await api.get(url);
      if (endpointType === "weather") {
        setWeather(res.data);
      } else if (endpointType === "forecast") {
        const filteredForecasts = filterDailyForecasts(res.data?.list);
        setCurrentCity(res.data?.city?.name);
        setForecasts(filteredForecasts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(weatherURL, "weather");

    return () => {
      setWeather(undefined);
    };
  }, [weatherURL]);

  useEffect(() => {
    fetchData(forecastURL, "forecast");

    return () => {
      setForecasts(undefined);
    };
  }, [forecastURL]);

  return (
    <>
      <ScrollView style={{ marginTop: 50, alignContent: "center" }}>
        {forecasts?.map((forecast) => {
          return (
            <View style={{ marginVertical: 5 }}>
              <Text style={styles.header}>{currentCity}</Text>
              <Text>
                {forecast.main.temp_min} - {forecast.main.temp_max}
              </Text>
              <Text style={styles.header}>
                {forecast.dt_txt + "          "}
                {forecast.main.temp} temp for the day
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`
                }}
                height={100}
                width={100}
              />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  forecastContainer: {
    maxHeight: "70%",
    maxWidth: "80%",
    fontSize: 24
    // alignItems: "center"
    // justifyContent: "center"
  }
});
