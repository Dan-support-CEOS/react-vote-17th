import styles from '../styles/Header.module.css';
import CEOSLogo from '../../public/img/ceos-logo.svg';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/store';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/apis/auth';
import { useRouter } from 'next/router';

export default function Header() {
  const [user, setUser] = useRecoilState(userState); //전역 상태 userState
  const { team: userTeam, part: userPart, name: userName, accessToken } = user; //구조분해할당

  const router = useRouter();

  //api 로직 가져와서 사용하기
  const logoutMutation = useMutation(logout, {
    onSuccess: data => {
      console.log(data);
      setUser({ ...user, accessToken: '', name: '', team: '', part: '' });
      alert('로그아웃이 완료됐어요!');
      router.push('/');
    },
    onError: error => {
      console.log(error);
      alert('로그아웃에 실패했어요.');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(accessToken);
  };

  return (
    <div className={styles.HeaderPage}>
      <Link href="/">
        <CEOSLogo className={styles.logo} />
      </Link>
      {accessToken === '' ? (
        <div className={styles.buttons}>
          <Link href="/login">
            <button className={styles.loginBtn}>로그인</button>
          </Link>
          <Link href="/register">
            <button className={styles.registerBtn}>회원가입</button>
          </Link>
        </div>
      ) : (
        <div className={styles.buttons}>
          <p className={styles.text}>
            {userTeam} {userPart === 'fe' ? 'FE' : 'BE'} {userName}
          </p>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
