import { useMemo } from 'react';
import { useWeatherController } from './logic';
import { WeatherWidgetUI } from './components';

const WeatherWidget = () => {
  const weatherController = useWeatherController();
  const { status, weatherStatusText, weatherData, refreshWeather } = weatherController;

  const state = useMemo(
    () => ({
      weatherController: {
        status,
        weatherStatusText,
        weatherData,
      },
    }),
    [status, weatherStatusText, weatherData]
  );

  const actions = useMemo(
    () => ({
      weatherController: {
        refreshWeather,
      },
    }),
    [refreshWeather]
  );

  return <WeatherWidgetUI state={state} actions={actions} />;
};

export default WeatherWidget;
