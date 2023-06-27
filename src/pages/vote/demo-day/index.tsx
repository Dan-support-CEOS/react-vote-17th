import groupData from '../../../jsons/groupData.json';
import VoteBox from '../../../components/demoDayVotePage/demoVote';
import styles from '../../../styles/Demo.module.css';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { tokenRefresh } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/store';

export default function DemoDayVotePage() {
  const group = groupData.groups;
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  {
    /*
  const useMutateRefreshing = useMutation(tokenRefresh, {
    onSuccess: data => {
      setUser({
        ...user,
        name: data.user.name,
        team: data.user.team,
        part: data.user.part,
        accessToken: data.token.access_token,
      }); //전역 상태 userState에, 백엔드로부터 받은 'name,team,part,accessToken..' 저장!
      axios.defaults.headers.common['Authorization'] =
        'Bearer' + data.accessToken;
    },
    onError: () => {
      axios.defaults.headers.common['Authorization'] = '';
      router.push('/');
    },
  });

  useEffect(() => {
    useMutateRefreshing.mutate;
  }, []);*/
  }

  return (
    <div className={styles.demoPage}>
      <Header />
      <div className={styles.titleText}>데모데이 투표</div>
      <VoteBox groups={group} />
    </div>
  );
}
