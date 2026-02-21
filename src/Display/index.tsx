import DashboardLayout from '@/shared/Layout';
import Widgets from '@/features/widgets';
import Flex from '@/shared/ui/Flex/Flex';

const AppDisplay = () => (
  <DashboardLayout
    header={<Widgets.Clock />}
    sidebarLeft={<></>}
    main={<Widgets.Calendar />}
    // sidebarRight={<Widgets.Weather />}
    sidebarRight={<Widgets.AddTask />}
    footer={<Widgets.Wallpaper />}
  />
);

export default AppDisplay;
