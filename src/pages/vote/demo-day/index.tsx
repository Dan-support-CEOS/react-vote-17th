import groupData from '../../../jsons/groupData.json';
import VoteBox from '../../../components/DemoDayVotePage/DemoVote';
import styles from '../../../styles/DemoDayPage.module.css';

export default function DemoDayVotePage() {
  const group = groupData.groups;

  return (
    <div className={styles.demoPage}>
      <div className={styles.titleText}>데모데이 투표</div>
      <VoteBox groups={group} />
    </div>
  );
}
