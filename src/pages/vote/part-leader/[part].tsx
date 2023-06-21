import { useRouter } from 'next/router';

export default function PartLeaderVotePage() {
  const router = useRouter();
  const { part } = router.query;

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
    <div>
      <h3>{Info.partName} 파트장 투표</h3>
      {Info.candidates.map((candidate, idx) => (
        <button key={idx}>{candidate}</button>
      ))}
      <button>투표하기</button>
    </div>
  );
}
