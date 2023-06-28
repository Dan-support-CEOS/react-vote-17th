import styles from '@/styles/HomePage.module.css';
import { userState } from '@/store/store';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { checkPartLeaderVoteAuthority } from '@/apis/vote';
import { demoDayAuthority } from '@/apis/vote';

export default function Home() {
  const user = useRecoilValue(userState); //전역 상태 userState
  const accessToken = user.accessToken;

  const router = useRouter();

  //파트장
  const checkPartLeaderVoteAuthorityMutation = useMutation(
    checkPartLeaderVoteAuthority,
    {
      onSuccess: data => {
        router.push('/vote/part-select');
      },
      onError: error => {
        console.log(error);
        alert('재투표가 불가합니다');
      },
    },
  );

  const handlePartLeaderVoteBtnClick = () => {
    if (!(accessToken === '')) {
      checkPartLeaderVoteAuthorityMutation.mutate(accessToken);
    } else {
      alert('로그인 후에 투표 가능합니다');
    }
  };

  //데모데이
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
      useMutationDemoAuthority.mutate({ accessToken: accessToken });
    } else {
      alert('로그인 후에 투표 가능합니다');
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.part}>
        <div className={styles.titleText}>파트장 투표</div>
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
        <div className={styles.titleText}>데모데이 투표</div>
        <button className={styles.voteBtn} onClick={handleDemoBtnClick}>
          투표하기
        </button>
        <button
          className={styles.resultBtn}
          onClick={() => router.push('/result/demo-day')}
        >
          결과보기
        </button>
      </div>
    </div>
  );
}
