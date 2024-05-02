import React from "react";
import { View, Text } from "react-native";
import WindSVG from "../assets/SVGs/Wind";
import HumiditySVG from "../assets/SVGs/Humidity";
import RainSVG from "../assets/SVGs/Rain";
import { useWeather } from "../contexts/WeatherContext";

interface WeatherUnitType {
  title: string;
  value: string;
  icon?: string;
}

const WeatherUnit = ({ title, value, icon }: WeatherUnitType) => {
  const { RPH, RPW } = useWeather();

  return (
    <View
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        paddingVertical: RPH(2),
        paddingHorizontal: RPW(8)
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          paddingBottom: RPH(1)
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{ fontSize: 15, color: "white", paddingHorizontal: RPW(3) }}
        >
          {value}
        </Text>
        {icon === "wind" && <WindSVG height={RPH(5)} width={RPW(5)} />}
        {icon === "humidity" && <HumiditySVG height={RPH(5)} width={RPW(5)} />}
        {icon === "rain" && <RainSVG height={RPH(5)} width={RPW(5)} />}
      </View>
    </View>
  );
};

export default WeatherUnit;
