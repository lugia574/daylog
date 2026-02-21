import type { ReactNode } from 'react';
import styles from '../../Desktop.module.scss';

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => <main className={styles.MainLayout}>{children}</main>;

export default Main;
