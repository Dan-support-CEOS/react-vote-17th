import VoteBox from '../../../components/DemoDayVotePage/DemoVote';
import styles from '../../../styles/DemoDayPage.module.css';

export default function DemoDayVotePage() {
  const group = [
    {
      tname: '댄서포트',
      detail: '댄서들을 위한 통합 플랫폼',
      id: 0,
    },
    {
      tname: 'Hooking',
      detail: 'SNS 마케팅 문구 레퍼런스 플랫폼',
      id: 1,
    },
    {
      tname: 'Repick',
      detail: '2040 남성들을 위한 맞춤형 중고 패션 구독 서비스',
      id: 2,
    },
    {
      tname: '바리바리',
      detail: 'SNS 마케팅 문구 레퍼런스 플랫폼',
      id: 3,
    },
    {
      tname: 'TherapEase',
      detail: '심리상담이 원활하게 이루어지기 위한 업무관리 플랫폼',
      id: 4,
    },
  ];

  return (
    <div className={styles.demoPage}>
      <div className={styles.titleText}>데모데이 투표</div>
      <VoteBox groups={group} />
    </div>
  );
}
