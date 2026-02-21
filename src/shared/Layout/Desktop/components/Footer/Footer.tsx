import type { ReactNode } from 'react';
import styles from '../../Desktop.module.scss';

type Props = {
  children: ReactNode;
};

const Footer = ({ children }: Props) => <footer className={styles.FooterLayout}>{children}</footer>;

export default Footer;
