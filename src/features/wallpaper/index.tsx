import { useMemo } from 'react';
import { useWallpaperController } from './logic';
import { WallpaperWidgetUI } from './components';

const WallpaperWidget = () => {
  const wallpaperController = useWallpaperController();
  const { wallpaper, nextWallpaper, randomizeWallpaper } = wallpaperController;

  const state = useMemo(
    () => ({
      wallpaperController: {
        wallpaper,
      },
    }),
    [wallpaper]
  );

  const actions = useMemo(
    () => ({
      wallpaperController: {
        nextWallpaper,
        randomizeWallpaper,
      },
    }),
    [nextWallpaper, randomizeWallpaper]
  );

  return <WallpaperWidgetUI state={state} actions={actions} />;
};

export default WallpaperWidget;
