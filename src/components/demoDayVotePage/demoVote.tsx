import { useState } from 'react';
import { Ingroup } from '../../interface/interface';
import styles from '../styles/Demo.module.css';
import { useMutation } from '@tanstack/react-query';
import { demoDayVote } from '@/apis/vote';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';

interface demoVoteProps {
  groups: Ingroup[];
}

export default function demoVote({ groups }: demoVoteProps) {
  const firstGroup = groups.filter(group => group.id < 2);
  const secondGroup = groups.filter(group => group.id > 1);
  const [clickIndex, setClickIndex] = useState(5);
  const [votedTeam, setVotedTeam] = useState('');

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
    },
    onError: data => {
      alert('투표할 팀을 선택해주세요');
    },
  });

  //click된 box는 border 생기도록
  function Box({ groups }: demoVoteProps) {
    return (
      <>
        {groups.map(group => (
          <div onClick={() => onClick(group)}>
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
