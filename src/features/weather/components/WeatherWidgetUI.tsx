import { memo } from 'react';
import Flex from '@/shared/ui/Flex/Flex';
import Button from '@/shared/ui/Button/Button';
import styles from './WeatherWidgetUI.module.scss';

type WeatherWidgetUIProps = {
  state: {
    weatherController: {
      status: 'idle' | 'loading' | 'success' | 'error';
      weatherStatusText: string;
      weatherData: {
        city: string;
        temperature: number;
        humidity: number;
        windSpeed: number;
        description: string;
      } | null;
    };
  };
  actions: {
    weatherController: {
      refreshWeather: () => void;
    };
  };
};

const WeatherWidgetUI = ({ state, actions }: WeatherWidgetUIProps) => {
  const { status, weatherStatusText, weatherData } = state.weatherController;
  const { refreshWeather } = actions.weatherController;

  return (
    <Flex className={styles.Widget} direction="column" gap={12}>
      <Flex justify="space-between" align="center">
        <Flex as="h2" className={styles.Title}>
          Weather
        </Flex>
        <Button variant="ghost" size="sm" color="#f0f5ff" onClick={refreshWeather}>
          Refresh
        </Button>
      </Flex>

      <Flex as="p" className={styles.Status}>
        {weatherStatusText}
      </Flex>

      {weatherData && status === 'success' ? (
        <Flex direction="column" gap={6} className={styles.InfoBox}>
          <Flex as="p" className={styles.Temp}>
            {Math.round(weatherData.temperature * 10) / 10}°C
          </Flex>
          <Flex as="p" className={styles.InfoText}>
            Humidity: {weatherData.humidity}%
          </Flex>
          <Flex as="p" className={styles.InfoText}>
            Wind: {weatherData.windSpeed} km/h
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default memo(WeatherWidgetUI);
