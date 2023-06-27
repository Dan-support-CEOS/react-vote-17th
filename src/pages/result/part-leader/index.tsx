import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPartLeaderResult } from '@/apis/voteResult';
import styles from '../../../styles/PartLeaderResultPage.module.css';

export default function PartLeaderResultPage() {
  const [part, setPart] = useState<string>('fe');
  //const [result, setResult] = useState();

  //api 로직 가져와서 사용하기
  const { data: partLeaderResult } = useQuery(
    ['partLeaderResult', part],
    () => getPartLeaderResult(part),
    {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        alert('결과를 가져오는데 실패했습니다.');
      },
    },
  );

  const handlePartBtnClick = (e: any) => {
    setPart(e.currentTarget.name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <button
          className={styles.partBtn}
          name="fe"
          onClick={handlePartBtnClick}
        >
          FE
        </button>
        <button
          className={styles.partBtn}
          name="be"
          onClick={handlePartBtnClick}
        >
          BE
        </button>
        <div className={styles.title}>
          {part === 'fe' ? 'FE' : 'BE'} 파트장 투표결과
        </div>
      </div>

      <div className={styles.rankBox}>
        {partLeaderResult?.map((item: any, idx: number) => (
          <div className={styles.rank} key={idx}>
            {idx + 1} {item.cname} {item.count}
          </div>
        ))}
      </div>
    </div>
  );
}
