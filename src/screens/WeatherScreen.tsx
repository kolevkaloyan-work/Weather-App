import { View, Text, Image, ImageBackground, Keyboard } from "react-native";
import { useWeather } from "../contexts/WeatherContext";
import WeatherDetailsContainer from "../components/WeatherDetailsContainer";
import SearchBar from "../components/SearchBar";
import { LoaderScreen } from "react-native-ui-lib";
import _ from "lodash";
import ErrorMessageContainer from "../components/ErrorContainer";
import ToggleDegrees from "../components/ToggleDegrees";
import { useWeatherQuery } from "../api/useWeatherQuery";
import { useQueryClient } from "@tanstack/react-query";
import ForecastScrollView from "../components/ForecastScrollView";

export const WeatherScreen = () => {
  const { searchValue, setSearchValue, RPH, RPW, isCelsius } = useWeather();

  const queryClient = useQueryClient();
  const { useGetWeather, useGetForecast } = useWeatherQuery();
  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError
  } = useGetWeather(searchValue, isCelsius);
  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    error: forecastError
  } = useGetForecast(searchValue, isCelsius);

  const debouncedSearch = _.debounce((search: string) => {
    setSearchValue(search);
  }, 800);

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const handleSearchClick = () => {
    if (searchValue !== "") {
      queryClient.invalidateQueries({ queryKey: ["weather", "forecast"] });
    }
    Keyboard.dismiss();
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/background.jpg")}
        imageStyle={{ resizeMode: "cover", flex: 1 }}
        style={{ height: RPH(100) }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <SearchBar
            placeholder="Search by city..."
            onChangeText={handleSearchChange}
            maxLength={15}
            handleSearchClick={handleSearchClick}
          />
          <ToggleDegrees isCelsius={isCelsius} />
        </View>
        {isLoadingWeather ? (
          <LoaderScreen
            message={"Loading..."}
            color={"white"}
            messageStyle={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold"
            }}
          />
        ) : weatherError ? (
          <ErrorMessageContainer
            errorMsg={
              "Couldn't find the city you are looking for! Please write the correct name and try again."
            }
          />
        ) : (
          <>
            <View
              style={{
                alignItems: "center"
              }}
            >
              {weatherData?.main && (
                <>
                  <Text style={{ fontSize: 30, color: "white" }}>
                    {weatherData?.name}/{weatherData?.sys.country}
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
                        uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`
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
                      {weatherData?.main.temp.toFixed(0)}&deg;
                      {isCelsius ? "C" : "F"}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {weatherData?.weather[0].description}
                  </Text>
                </>
              )}
            </View>
            {weatherData && <WeatherDetailsContainer weather={weatherData} />}
            {!isLoadingForecast && weatherData && (
              <ForecastScrollView forecastData={forecastData?.list} />
            )}
          </>
        )}
      </ImageBackground>
    </>
  );
};
