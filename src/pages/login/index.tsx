import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';
import Header from '@/components/Header';
import { useMutateLogin } from '@/hook/use-mutate-login';

export default function LoginPage() {
  const router = useRouter();

  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useMutateLogin;
  };

  return (
    <div className={styles.loginPage}>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className={styles.loginBox}>
          <div>
            <div className={styles.loginText}>아이디</div>
            <input
              className={styles.loginInput}
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              required
            />
          </div>

          <div>
            <div className={styles.loginText}>비밀번호</div>
            <input
              className={styles.loginInput}
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              required
            />
          </div>

          <button className={styles.loginBtn} type="submit">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
