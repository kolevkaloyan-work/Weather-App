import React from "react";
import { View, Text } from "react-native";
import { useWeather } from "../contexts/WeatherContext";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessageContainer = ({ message }: ErrorMessageProps) => {
  const { RPH, RPW } = useWeather();
  return (
    <View
      style={{
        alignItems: "center",
        paddingVertical: RPH(8),
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignContent: "center",
        borderRadius: 20,
        marginHorizontal: RPW(5)
      }}
    >
      <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
        {message}
      </Text>
    </View>
  );
};

export default ErrorMessageContainer;
