import { useState } from 'react';
import { Ingroup } from '../../interface/interface';
import styles from '../../styles/DemoDayPage.module.css';
import { useMutation } from '@tanstack/react-query';
import { demoDayVote } from '@/apis/vote';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';
import { useRouter } from 'next/router';

interface demoVoteProps {
  groups: Ingroup[];
}

export default function DemoVote({ groups }: demoVoteProps) {
  const firstGroup = groups.filter(group => group.id < 2);
  const secondGroup = groups.filter(group => group.id > 1);
  const [clickIndex, setClickIndex] = useState(5);
  const [votedTeam, setVotedTeam] = useState('');

  const router = useRouter();

  const user = useRecoilValue(userState);
  const token = user.accessToken;

  //팀 클릭했을 때
  const onClick = (group: Ingroup) => {
    setClickIndex(group.id);
    setVotedTeam(group.tname);
  };

  //click유무에 따라 alert
  const voteMutationDemo = useMutation(demoDayVote, {
    onSuccess: data => {
      alert('투표되었습니다');
      router.push('/result/demo-day');
    },
    onError: data => {
      if (clickIndex == 5) {
        alert('투표할 팀을 선택해주세요');
      } else {
        alert('자신의 팀은 투표가 불가합니다');
      }
    },
  });

  //click된 box는 border 생기도록
  function Box({ groups }: demoVoteProps) {
    return (
      <>
        {groups.map((group, idx) => (
          <div key={idx} onClick={() => onClick(group)}>
            {clickIndex === group.id ? (
              <div className={styles.clickedBox}>
                <div className={styles.textBox}>
                  <div className={styles.nameText}>{group.tname}</div>
                  <div className={styles.detailText}>{group.detail}</div>
                </div>
              </div>
            ) : (
              <div className={styles.box}>
                <div className={styles.textBox}>
                  <div className={styles.nameText}>{group.tname}</div>
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
          voteMutationDemo.mutate({ tname: votedTeam, accessToken: token });
        }}
      >
        투표하기
      </button>
    </>
  );
}
