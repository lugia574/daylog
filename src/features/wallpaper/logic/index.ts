import { useCallback, useEffect, useMemo, useState } from 'react';

const WALLPAPERS = ['/wallpapers/0.jpg', '/wallpapers/1.jpg', '/wallpapers/2.jpg', '/wallpapers/3.jpg'];

const toBackgroundStyle = (source: string) => `linear-gradient(130deg, rgba(8, 18, 34, 0.6), rgba(17, 35, 58, 0.44)), url(${source}) center / cover no-repeat`;

export const useWallpaperController = () => {
  const [wallpaperIndex, setWallpaperIndex] = useState(() => Math.floor(Math.random() * WALLPAPERS.length));

  const nextWallpaper = useCallback(() => {
    setWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
  }, []);

  const randomizeWallpaper = useCallback(() => {
    setWallpaperIndex(Math.floor(Math.random() * WALLPAPERS.length));
  }, []);

  const wallpaper = useMemo(() => WALLPAPERS[wallpaperIndex], [wallpaperIndex]);

  useEffect(() => {
    document.documentElement.style.setProperty('--app-background', toBackgroundStyle(wallpaper));
  }, [wallpaper]);

  return {
    wallpaper,
    nextWallpaper,
    randomizeWallpaper,
  };
};
