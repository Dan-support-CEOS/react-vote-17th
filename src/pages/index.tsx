import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.part}>
        <div className={styles.titleTextPart}>파트장 투표</div>
        <div className={styles.partDevide}>
          <div className={styles.partText}>FE</div>
          <div className={styles.partText}>BE</div>
        </div>
        <div className={styles.partDevide}>
          <button className={styles.voteBtnPart}>투표하기</button>
          <button className={styles.voteBtnPart}>투표하기</button>
        </div>
        <button className={styles.resultBtn}>결과보기</button>
      </div>
      <hr className={styles.line} />
      <div className={styles.part}>
        <div className={styles.titleTextDemo}>데모데이 투표</div>
        <Link href="/vote/demo-day">
          <button className={styles.voteBtnDemo}>투표하기</button>
        </Link>
        <Link href="/result/demo-day">
          <button className={styles.resultBtn}>결과보기</button>
        </Link>
      </div>
    </div>
  );
}
