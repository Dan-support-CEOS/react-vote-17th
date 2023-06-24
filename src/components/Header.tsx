import styles from '../styles/Header.module.css';
import CEOSLogo from '../../public/img/ceos-logo.svg';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={styles.HeaderPage}>
      <Link href="/">
        <CEOSLogo className={styles.logo} />
      </Link>
      <div className={styles.buttons}>
        <Link href="/login">
          <button className={styles.loginBtn}>로그인</button>
        </Link>
        <Link href="/register">
          <button className={styles.registerBtn}>회원가입</button>
        </Link>
      </div>
    </div>
  );
}
