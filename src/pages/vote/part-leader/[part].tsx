import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';
import { useMutation } from '@tanstack/react-query'; //getQueryClient 추가하기
import { votePartLeader } from '@/apis/vote';
import { useRouter } from 'next/router';
import styles from '../../../styles/PartLeaderVotePage.module.css';

export default function PartLeaderVotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');

  const user = useRecoilValue(userState); //전역 상태 userState
  const accessToken = user.accessToken;

  const router = useRouter();
  const { part } = router.query;

  //api 로직 가져와서 사용하기
  const votePartLeaderMutation = useMutation(votePartLeader, {
    onSuccess: data => {
      alert('투표가 완료됐어요!');
      router.push('/result/part-leader');
    },
    onError: error => {
      alert('투표에 실패했어요.');
    },
  });

  const handleVoteBtnClick = (e: any) => {
    votePartLeaderMutation.mutate({
      name: selectedCandidate,
      accessToken: accessToken,
      part: part,
    });
  };

  const handleCandidateClick = (e: any) => {
    setSelectedCandidate(e.target.textContent);
    //console.log(selectedCandidate);
  };

  const FeInfo = {
    partName: 'FE',
    candidates: [
      '권가은',
      '김문기',
      '김서연',
      '노수진',
      '배성준',
      '신유진',
      '오예린',
      '이예지',
      '장효신',
      '최민주',
    ],
  };
  const BeInfo = {
    partName: 'BE',
    candidates: [
      '김지원',
      '김현수',
      '김현우',
      '서찬혁',
      '서혜준',
      '임탁균',
      '이소정',
      '조예지',
      '최유미',
      '황재령',
    ],
  };

  const Info = part === 'fe' ? FeInfo : BeInfo;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{Info.partName} 파트장 투표</div>
      <div className={styles.candidatesBox}>
        {Info.candidates.map((candidate, idx) => (
          <button
            className={
              selectedCandidate === candidate
                ? styles.selectedCandidateBtn
                : styles.candidateBtn
            }
            key={idx}
            onClick={handleCandidateClick}
          >
            {candidate}
          </button>
        ))}
      </div>
      <button className={styles.voteBtn} onClick={handleVoteBtnClick}>
        투표하기
      </button>
    </div>
  );
}
