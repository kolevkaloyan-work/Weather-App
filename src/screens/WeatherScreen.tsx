import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard
} from "react-native";
import { useWeather } from "../contexts/WeatherContext";
import WeatherForecastCard from "../components/ForecastCard";
import WeatherDetailsContainer from "../components/WeatherDetailsContainer";
import SearchBar from "../components/SearchBar";
import { filterDailyForecasts, getDayOfTheWeek } from "../utils";
import { LoaderScreen } from "react-native-ui-lib";
import _ from "lodash";
import ErrorMessageContainer from "../components/ErrorContainer";
import ToggleDegrees from "../components/ToggleDegrees";
import { useWeatherQuery } from "../api/useWeatherQuery";
import { useQueryClient } from "@tanstack/react-query";

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
            // value={searchValue}
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
          <ErrorMessageContainer />
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
                {filterDailyForecasts(forecastData.list)?.map(
                  (
                    forecast: DailyForecast,
                    index: React.Key | null | undefined
                  ) => {
                    let dayofTheWeek = getDayOfTheWeek(forecast.dt_txt);
                    return (
                      <WeatherForecastCard
                        key={index}
                        forecast={forecast}
                        dayofTheWeek={dayofTheWeek}
                      />
                    );
                  }
                )}
              </ScrollView>
            )}
          </>
        )}
      </ImageBackground>
    </>
  );
};
