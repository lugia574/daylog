import type { ReactNode } from 'react';
import styles from '../../Desktop.module.scss';

type Props = {
  children: ReactNode;
};

const Header = ({ children }: Props) => <header className={styles.HeaderLayout}>{children}</header>;

export default Header;
