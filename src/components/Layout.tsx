import Header from './Header';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }: any) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
}
