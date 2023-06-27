import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { demoDayAuthority, mutateRefreshing } from '@/apis/auth';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';

export default function Home() {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const accessToken = user.accessToken;

  const useMutationDemoAuthority = useMutation(demoDayAuthority, {
    onSuccess: data => {
      router.push('/vote/demo-day');
    },
    onError: error => {
      alert('재투표가 불가합니다');
    },
  });

  const handleDemoBtnClick = () => {
    if (!(accessToken === '')) {
      useMutationDemoAuthority.mutate(accessToken);
    } else {
      alert('로그인 후에 이용가능합니다.');
    }
  };

  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.part}>
        <div className={styles.titleText}>파트장 투표</div>
        <button className={styles.voteBtn}>투표하기</button>
        <button className={styles.resultBtn}>결과보기</button>
      </div>
      <hr className={styles.line} />
      <div className={styles.part}>
        <div className={styles.titleText}>데모데이 투표</div>
        <button className={styles.voteBtn} onClick={handleDemoBtnClick}>
          투표하기
        </button>
        <Link href="/result/demo-day">
          <button className={styles.resultBtn}>결과보기</button>
        </Link>
      </div>
    </div>
  );
}
