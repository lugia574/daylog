import type { ReactNode } from 'react';
import Desktop from './Desktop/Desktop';

type DashboardLayoutProps = {
  header: ReactNode;
  sidebarLeft: ReactNode;
  main: ReactNode;
  sidebarRight: ReactNode;
  footer: ReactNode;
};

const DashboardLayout = ({ header, sidebarLeft, main, sidebarRight, footer }: DashboardLayoutProps) => (
  <Desktop>
    <Desktop.Header>{header}</Desktop.Header>
    <Desktop.SidebarLeft>{sidebarLeft}</Desktop.SidebarLeft>
    <Desktop.Main>{main}</Desktop.Main>
    <Desktop.SidebarRight>{sidebarRight}</Desktop.SidebarRight>
    <Desktop.Footer>{footer}</Desktop.Footer>
  </Desktop>
);

export default DashboardLayout;
