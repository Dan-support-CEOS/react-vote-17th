import styles from '@/styles/HomePage.module.css';
import Link from 'next/link';
import { userState } from '@/store/store';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { checkPartLeaderVoteAuthority } from '@/apis/vote';

export default function Home() {
  const user = useRecoilValue(userState); //전역 상태 userState
  const accessToken = user.accessToken;

  const router = useRouter();

  const checkPartLeaderVoteAuthorityMutation = useMutation(
    checkPartLeaderVoteAuthority,
    {
      onSuccess: data => {
        router.push('/vote/part-select');
      },
      onError: error => {
        alert('재투표 불가합니다.');
      },
    },
  );

  const handlePartLeaderVoteBtnClick = () => {
    if (!(accessToken === '')) {
      checkPartLeaderVoteAuthorityMutation.mutate(accessToken);
    } else {
      alert('로그인 후에 투표 가능합니다.');
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.part}>
        <div className={styles.homeText}>파트장 투표</div>
        <button
          className={styles.voteBtn}
          onClick={handlePartLeaderVoteBtnClick}
        >
          투표하기
        </button>
        <button
          className={styles.resultBtn}
          onClick={() => router.push('/result/part-leader')}
        >
          결과보기
        </button>
      </div>
      <hr className={styles.line} />
      <div className={styles.part}>
        <div className={styles.homeText}>데모데이 투표</div>
        <Link href="/vote/demo-day">
          <button className={styles.voteBtn}>투표하기</button>
        </Link>
        <Link href="/result/demo-day">
          <button className={styles.resultBtn}>결과보기</button>
        </Link>
      </div>
    </div>
  );
}
