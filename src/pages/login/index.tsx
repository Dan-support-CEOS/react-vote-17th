import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query'; //getQueryClient 추가하기
import { useRecoilState } from 'recoil';
import { login } from '@/apis/auth';
import { userState } from '@/store/store';
import axios from 'axios';
import styles from '../../styles/Login.module.css';
import Header from '@/components/Header';

export default function LoginPage() {
  const [user, setUser] = useRecoilState(userState); //전역 상태 userState

  const router = useRouter();

  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  //api 로직 가져와서 사용하기
  const loginMutation = useMutation(login, {
    onSuccess: data => {
      setUser(data); //전역 상태 userState에, 백엔드로부터 받은 'uid,name,team,part,accessToken..' 저장!
      axios.defaults.headers.common['Authorization'] =
        'Bearer' + data.accessToken;
      router.push('/');
    },
    onError: error => {
      alert('로그인에 실패했습니다');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({ id: id, password: pwd });
  };

  return (
    <div className={styles.loginPage}>
      <Header />
      <form>
        <div className={styles.loginBox}>
          {/* onSubmit={handleSubmit} */}

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
