import React, {
  RefObject,
  createContext,
  useContext,
  useRef,
  useState
} from "react";
import { WeatherData } from "../types/WeatherType";
import { Dimensions } from "react-native";
import { TextFieldRef } from "react-native-ui-lib";

interface WeatherContextType {
  currentCity: string;
  searchValue: string;
  weather: WeatherData | undefined;
  forecasts: DailyForecast[] | undefined;
  isCelsius: boolean;
  setCurrentCity: (city: string) => void;
  setSearchValue: (searchValue: string) => void;
  setWeather: (weather: WeatherData | undefined) => void;
  setForecasts: (forecasts: DailyForecast[] | undefined) => void;
  setIsCelsius: (unit: any) => void;
  RPH: (percentage: number) => number;
  RPW: (percentage: number) => number;
  inputRef: RefObject<any>;
}

const WeatherContext = createContext<WeatherContextType>({
  currentCity: "Sofia",
  searchValue: "Sofia",
  weather: undefined,
  forecasts: undefined,
  isCelsius: true,
  setCurrentCity: () => {},
  setSearchValue: () => {},
  setWeather: () => {},
  setForecasts: () => {},
  setIsCelsius: () => {},
  RPH: () => 0,
  RPW: () => 0,
  inputRef: useRef(null)
});

export const WeatherProvider = ({ children }: any) => {
  const [currentCity, setCurrentCity] = useState<string>("Sofia");
  const [searchValue, setSearchValue] = useState<string>("Sofia");
  const [weather, setWeather] = useState<WeatherData | undefined>();
  const [forecasts, setForecasts] = useState<DailyForecast[] | undefined>();
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const inputRef = useRef<TextFieldRef>(null);

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  //responsive height
  const RPH = (percentage: number) => {
    return (percentage / 100) * screenHeight;
  };

  //responsive width
  const RPW = (percentage: number) => {
    return (percentage / 100) * screenWidth;
  };

  return (
    <WeatherContext.Provider
      value={{
        currentCity,
        searchValue,
        weather,
        forecasts,
        setCurrentCity,
        setSearchValue,
        setWeather,
        setForecasts,
        isCelsius,
        setIsCelsius,
        RPH,
        RPW,
        inputRef
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
