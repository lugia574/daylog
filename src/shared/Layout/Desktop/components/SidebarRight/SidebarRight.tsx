import type { ReactNode } from 'react';
import styles from '../../Desktop.module.scss';

type Props = {
  children: ReactNode;
};

const SidebarRight = ({ children }: Props) => <aside className={styles.SidebarRightLayout}>{children}</aside>;

export default SidebarRight;
