import { userState } from '@/store/store';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import styles from '../../../styles/PartSelectPage.module.css';

export default function PartSelectPage() {
  const user = useRecoilValue(userState); //전역 상태 userState
  const userPart = user.part;

  const router = useRouter();

  const handleBtnClick = (e: any) => {
    if (userPart === e.currentTarget.name) {
      router.push(`/vote/part-leader/${userPart}`);
    } else {
      alert('본인이 해당하는 파트의 파트장 투표만 가능합니다!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.circles}>
        <button className={styles.circle} name="fe" onClick={handleBtnClick}>
          FRONT-END 파트장 투표
        </button>
        <button className={styles.circle} name="be" onClick={handleBtnClick}>
          BACK-END 파트장 투표
        </button>
      </div>
    </div>
  );
}
