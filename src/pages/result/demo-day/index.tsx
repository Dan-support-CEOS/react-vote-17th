import styles from '../../../styles/Demo.module.css';
import Header from '@/components/Header';
import groupData from '../../../jsons/groupData.json';

export default function DemoDayResultPage() {
  const groups = groupData.groups;
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
                <div className={styles.resultNameText}>{group.name}</div>
                <div className={styles.resultDetailText}>{group.detail}</div>
                <div className={styles.scoreText}>{group.score}</div>
              </div>
            ) : (
              <div className={styles.longBox}>
                <div className={styles.numberBox}>{newRank}</div>
                <div className={styles.resultNameText}>{group.name}</div>
                <div className={styles.resultDetailText}>{group.detail}</div>
                <div className={styles.scoreText}>{group.score}</div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
