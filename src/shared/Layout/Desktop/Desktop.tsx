import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import SidebarRight from './components/SidebarRight/SidebarRight';
import styles from './Desktop.module.scss';

type DesktopProps = {
  children: React.ReactNode;
};

const Desktop = ({ children }: DesktopProps) => <div className={styles.DesktopLayout}>{children}</div>;

export default Desktop;

Desktop.Header = Header;
Desktop.Main = Main;
Desktop.Footer = Footer;
Desktop.SidebarLeft = SidebarLeft;
Desktop.SidebarRight = SidebarRight;
