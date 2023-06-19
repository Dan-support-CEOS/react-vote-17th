import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'; //getQueryClient 추가하기
import { useRecoilValue } from 'recoil';
import { login } from '@/apis/auth';
import { userState } from '@/store/store';

export default function PartLeaderVotePage() {
  const user = useRecoilValue(userState); //전역 상태 userState
  const accessToken = user.accessToken;

  //const { part } = useParams(); //next 버전 찾아보기
  const part = 'fe'; //임시

  /*api 로직 가져와서 사용하기
  const loginMutation = useMutation(login, {
    onSuccess: data => {
      setUser(data); //전역 상태 userState에, 백엔드로부터 받은 'uid,name,team,part,accessToken..' 저장!
      alert('로그인이 완료됐어요!');
    },
    onError: error => {
      alert('로그인에 실패했어요.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({ id: id, password: pwd });
  };
  */

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

  //const Info = { part==='fe' ? FeInfo : BeInfo };
  //아래 FeInfo를 Info로 바꿔야 됨

  return (
    <div>
      <h3>{FeInfo.partName} 파트장 투표</h3>
      {FeInfo.candidates.map((candidate, idx) => (
        <button key={idx}>{candidate}</button>
      ))}
    </div>
  );
}
