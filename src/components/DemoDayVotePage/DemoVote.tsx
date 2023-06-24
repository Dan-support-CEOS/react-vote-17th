import { useState } from 'react';
import { Ingroup } from '../../interface/interface';
import styles from '../../styles/Demo.module.css';

interface DemoVoteProps {
  groups: Ingroup[];
}

export default function DemoVote({ groups }: DemoVoteProps) {
  const firstGroup = groups.filter(group => group.id < 2);
  const secondGroup = groups.filter(group => group.id > 1);
  const [clickIndex, setClickIndex] = useState(5);

  //click유무에 따라 alert
  function onVote() {
    if (clickIndex == 5) {
      alert('투표할 팀을 선택해주세요');
    } else {
      alert('투표되었습니다');
    }
  }

  //click된 box는 border 생기도록
  function Box({ groups }: DemoVoteProps) {
    return (
      <>
        {groups.map((group, idx) => (
          <div key={idx} onClick={() => setClickIndex(group.id)}>
            {clickIndex === group.id ? (
              <div className={styles.clickedBox}>
                <div className={styles.textBox}>
                  <div className={styles.nameText}>{group.name}</div>
                  <div className={styles.detailText}>{group.detail}</div>
                </div>
              </div>
            ) : (
              <div className={styles.box}>
                <div className={styles.textBox}>
                  <div className={styles.nameText}>{group.name}</div>
                  <div className={styles.detailText}>{group.detail}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className={styles.componentPage}>
        <div className={styles.componentPart}>
          <Box groups={firstGroup} />
        </div>
        <div className={styles.componentPart}>
          <Box groups={secondGroup} />
        </div>
      </div>
      <button
        className={styles.voteBtn}
        onClick={() => {
          onVote();
        }}
      >
        투표하기
      </button>
    </>
  );
}
