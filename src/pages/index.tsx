import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className= {styles.homePage}>
      <Header/>
      <div className = {styles.part}>
        <div className = {styles.homeText}>파트장 투표</div>
        <button className= {styles.voteBtn}>투표하기</button>
        <button className= {styles.resultBtn}>결과보기</button>
      </div>
      <hr className = {styles.line}/>
      <div className = {styles.part}>
        <div className = {styles.homeText}>데모데이 투표</div>
        <Link href= '/demoVote'>
        <button className= {styles.voteBtn}>투표하기</button>
        </Link>
        <Link href= '/demoResult'>
        <button className= {styles.resultBtn}>결과보기</button>
        </Link>
      </div>
    </div>
  );
}
