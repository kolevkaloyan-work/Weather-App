import React from "react";
import { TouchableOpacity } from "react-native";
import { TextField } from "react-native-ui-lib";
import SearchSVG from "../assets/SVGs/Search"; // Assuming you have the SearchSVG component
import { useWeather } from "../contexts/WeatherContext";

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  maxLength?: number;
  handleSearchClick: () => void;
}

const SearchBar = ({
  value,
  placeholder,
  onChangeText,
  maxLength,
  handleSearchClick
}: SearchBarProps) => {
  const { RPH, RPW } = useWeather();

  return (
    <TextField
      value={value}
      placeholder={placeholder}
      floatingPlaceholder
      onChangeText={onChangeText}
      maxLength={maxLength}
      style={{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
      }}
      fieldStyle={{
        height: RPH(7),
        borderRadius: 20,
        marginHorizontal: RPW(5),
        backgroundColor: "rgba(255, 255, 255, 0.3)"
      }}
      floatingPlaceholderStyle={{
        color: "white",
        textAlign: "left",
        display: "flex",
        paddingLeft: RPW(3),
        paddingTop: RPH(2)
      }}
      containerStyle={{
        height: RPH(10),
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        opacity: 1,
        marginBottom: RPH(4),
        marginTop: RPH(3)
      }}
      trailingAccessory={
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: 10,
            borderRadius: 20,
            marginRight: 5
          }}
          onPress={handleSearchClick}
        >
          <SearchSVG height={RPH(3)} width={RPW(5)} />
        </TouchableOpacity>
      }
    />
  );
};

export default SearchBar;
