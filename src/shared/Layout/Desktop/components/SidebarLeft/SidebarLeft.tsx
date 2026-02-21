import type { ReactNode } from 'react';
import styles from '../../Desktop.module.scss';

type Props = {
  children: ReactNode;
};

const SidebarLeft = ({ children }: Props) => <aside className={styles.SidebarLeftLayout}>{children}</aside>;

export default SidebarLeft;
