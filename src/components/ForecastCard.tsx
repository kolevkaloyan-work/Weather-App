import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useWeather } from "../contexts/WeatherContext";

interface WeatherForecastCard {
  forecast: DailyForecast;
  dayofTheWeek: string;
}

const WeatherForecastCard = ({
  forecast,
  dayofTheWeek
}: WeatherForecastCard) => {
  const { RPH, RPW } = useWeather();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 20,
        marginHorizontal: RPW(2),
        flexBasis: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        height: RPH(20)
      }}
    >
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`
        }}
        style={{
          paddingTop: RPH(10),
          height: RPH(10),
          width: RPW(25)
        }}
      />
      <Text style={styles.day}>{dayofTheWeek}</Text>
      <Text
        style={{
          paddingBottom: RPH(2),
          fontSize: 25,
          fontWeight: "bold",
          color: "white"
        }}
      >
        {forecast.main.temp.toFixed(0)} &deg;C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  }
});

export default WeatherForecastCard;
