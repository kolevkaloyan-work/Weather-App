import { WeatherScreen } from "./src/screens/WeatherScreen";
import { WeatherProvider } from "./src/contexts/WeatherContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <WeatherScreen />
      </WeatherProvider>
    </QueryClientProvider>
  );
}
