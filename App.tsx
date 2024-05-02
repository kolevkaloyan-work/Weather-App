import { WeatherScreen } from "./src/screens/WeatherScreen";
import { WeatherProvider } from "./src/contexts/WeatherContext";

export default function App() {
  return (
    <WeatherProvider>
      <WeatherScreen />
    </WeatherProvider>
  );
}
