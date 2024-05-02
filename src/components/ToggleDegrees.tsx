import React from "react";
import { View, Text, Switch } from "react-native";
import { useWeather } from "../contexts/WeatherContext";

interface TemperatureUnitSwitchProps {
  isCelsius: boolean;
}

const ToggleDegrees = ({ isCelsius }: TemperatureUnitSwitchProps) => {
  const { RPH, RPW, setIsCelsius, searchValue } = useWeather();
  const toggleSwitch = () => {
    if (searchValue && searchValue !== "") {
      setIsCelsius((prev: any) => !prev);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: RPH(2)
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>F &deg;</Text>

      <Switch
        trackColor={{ false: "grey", true: "grey" }}
        thumbColor={isCelsius ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="rgba(255, 255, 255, 0.3)"
        onValueChange={toggleSwitch}
        value={isCelsius}
      />
      <Text style={{ color: "white", fontSize: 20, marginRight: RPW(2) }}>
        C &deg;
      </Text>
    </View>
  );
};

export default ToggleDegrees;
