import { memo } from 'react';
import Flex from '@/shared/ui/Flex/Flex';
import Button from '@/shared/ui/Button/Button';
import styles from './WallpaperWidgetUI.module.scss';

type WallpaperWidgetUIProps = {
  state: {
    wallpaperController: {
      wallpaper: string;
    };
  };
  actions: {
    wallpaperController: {
      nextWallpaper: () => void;
      randomizeWallpaper: () => void;
    };
  };
};

const WallpaperWidgetUI = ({ state, actions }: WallpaperWidgetUIProps) => {
  const { wallpaper } = state.wallpaperController;
  const { nextWallpaper, randomizeWallpaper } = actions.wallpaperController;

  return (
    <Flex className={styles.Widget} justify="space-between" align="center" gap={12}>
      <Flex as="p" className={styles.Label}>
        Wallpaper: {wallpaper.split('/').pop()}
      </Flex>
      <Flex gap={8}>
        <Button variant="outlined" size="sm" color="#e6efff" onClick={nextWallpaper}>
          Next
        </Button>
        <Button variant="ghost" size="sm" color="#e6efff" onClick={randomizeWallpaper}>
          Random
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(WallpaperWidgetUI);
