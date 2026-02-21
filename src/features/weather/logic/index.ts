import { useCallback, useEffect, useMemo, useState } from 'react';

type WeatherData = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
};

const mapWeatherCode = (code: number) => {
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Storm';
  return 'Unknown';
};

export const useWeatherController = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
    const reverseUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&count=1`;

    const [weatherResponse, reverseResponse] = await Promise.all([fetch(weatherUrl), fetch(reverseUrl)]);

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather');
    }

    const weatherJson = await weatherResponse.json();
    const reverseJson = reverseResponse.ok ? await reverseResponse.json() : null;
    const current = weatherJson.current;

    setWeatherData({
      city: reverseJson?.results?.[0]?.name ?? 'Unknown',
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      description: mapWeatherCode(current.weather_code),
    });
  }, []);

  const refreshWeather = useCallback(() => {
    setStatus('loading');
    setErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetchWeather(position.coords.latitude, position.coords.longitude);
          setStatus('success');
        } catch {
          setStatus('error');
          setErrorMessage('Weather request failed');
        }
      },
      () => {
        setStatus('error');
        setErrorMessage('Location permission is required');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [fetchWeather]);

  useEffect(() => {
    refreshWeather();
  }, [refreshWeather]);

  const weatherStatusText = useMemo(() => {
    if (status === 'loading') return 'Loading...';
    if (status === 'error') return errorMessage;
    return weatherData ? `${weatherData.description} in ${weatherData.city}` : 'No weather data';
  }, [status, errorMessage, weatherData]);

  return {
    status,
    weatherStatusText,
    weatherData,
    refreshWeather,
  };
};
