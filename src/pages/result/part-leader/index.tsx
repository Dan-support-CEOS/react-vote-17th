import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPartLeaderResult } from '@/apis/voteResult';

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
    <div>
      <button name="fe" onClick={handlePartBtnClick}>
        FE
      </button>
      <button name="be" onClick={handlePartBtnClick}>
        BE
      </button>

      <h3>{part === 'fe' ? 'FE' : 'BE'} 파트장 투표결과</h3>

      {/*
      {partLeaderResult.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
      */}
    </div>
  );
}
