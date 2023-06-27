import { getDemoDayResult } from '@/apis/voteResult';
import styles from '../../../styles/DemoDayPage.module.css';
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
        setGroups(data);
      },
    },
  );

  const rank = [1, 2, 3, 4, 5];
  let newRank;

  return (
    <div className={styles.demoPage}>
      <div className={styles.titleText}>데모데이 투표결과</div>
      {groups &&
        groups.map((group, index) => {
          newRank = rank[index];

          if (index != 0 && groups[index].count === groups[index - 1].count) {
            rank[index] = rank[index - 1];
            newRank = rank[index - 1];
          }
          return (
            <>
              {newRank == 1 ? (
                <div className={styles.firstLongBox}>
                  <div className={styles.firstNumberBox}>{newRank}</div>
                  <div className={styles.resultNameText}>{group.tname}</div>
                  <div className={styles.resultDetailText}>{group.detail}</div>
                  <div className={styles.scoreText}>{group.count}</div>
                </div>
              ) : (
                <div className={styles.longBox}>
                  <div className={styles.numberBox}>{newRank}</div>
                  <div className={styles.resultNameText}>{group.tname}</div>
                  <div className={styles.resultDetailText}>{group.detail}</div>
                  <div className={styles.scoreText}>{group.count}</div>
                </div>
              )}
            </>
          );
        })}
    </div>
  );
}
