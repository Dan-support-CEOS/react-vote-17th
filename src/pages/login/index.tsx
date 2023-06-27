import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Header from '@/components/Header';
import { login } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/store';

export default function LoginPage() {
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();

  const useMutateLogin = useMutation(login, {
    onSuccess: data => {
      setUser({
        ...user,
        name: data.user.name,
        team: data.user.team,
        part: data.user.part,
        accessToken: data.token.access_token,
      }); //전역 상태 userState에, 백엔드로부터 받은 'name,team,part,accessToken..' 저장!
      router.push('/');
    },
    onError: error => {
      alert('로그인에 실패했습니다');
      setId('');
      setPwd('');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    useMutateLogin.mutate({ id: id, password: pwd });

    e.preventDefault();
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
