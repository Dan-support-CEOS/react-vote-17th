import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import Header from '@/components/Header';
import { login } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginPage() {
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const router = useRouter();

  const useMutateLogin = useMutation(login, {
    onSuccess: data => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer' + data.accessToken; //accessToken을 받으면 바로 axios header의 default값으로 넣어줘서 api 호출 시마다 유효성을 체크하는 방식이기 때문에 성공시에 header에 담아줌
      router.push('/');
    },
    onError: error => {
      alert('로그인에 실패했습니다');
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
