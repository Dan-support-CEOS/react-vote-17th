import { getDemoDayResult } from '@/apis/auth';
import styles from '../../../styles/Demo.module.css';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function DemoDayResultPage() {
  const [groups, setGroups] = useState<any[]>([]);

  const { data: demoDayResult } = useQuery(
    ['demo-day-result'],
    getDemoDayResult,
    {
      onSuccess: data => {
        console.log(data);
        setGroups(demoDayResult);
      },
    },
  );

  const rank = [1, 2, 3, 4, 5];
  let newRank;

  groups.sort(function compare(a, b) {
    return b.score - a.score;
  });

  return (
    <div className={styles.demoPage}>
      <Header />
      <div className={styles.titleText}>데모데이 투표결과</div>
      {groups.map((group, index) => {
        newRank = rank[index];

        if (index != 0 && groups[index].score === groups[index - 1].score) {
          rank[index] = rank[index - 1];
          newRank = rank[index - 1];
        }
        return (
          <>
            {newRank == 1 ? (
              <div className={styles.firstLongBox}>
                <div className={styles.firstNumberBox}>{newRank}</div>
                <div className={styles.resultNameText}>{group.tname}</div>
                <div className={styles.resultDetailText}></div>
                <div className={styles.scoreText}>{group.score}</div>
              </div>
            ) : (
              <div className={styles.longBox}>
                <div className={styles.numberBox}>{newRank}</div>
                <div className={styles.resultNameText}>{group.tname}</div>
                <div className={styles.resultDetailText}></div>
                <div className={styles.scoreText}>{group.score}</div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
