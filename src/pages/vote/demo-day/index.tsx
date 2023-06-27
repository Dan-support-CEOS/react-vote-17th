import groupData from '../../../jsons/groupData.json';
import VoteBox from '../../../components/demoVote';
import styles from '../../../styles/Demo.module.css';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { mutateRefreshing } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function DemoDayVotePage() {
  const group = groupData.groups;
  const router = useRouter();

  const useMutateRefreshing = useMutation(mutateRefreshing, {
    onSuccess: data => {
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
  }, []);

  return (
    <div className={styles.demoPage}>
      <Header />
      <div className={styles.titleText}>데모데이 투표</div>
      <VoteBox groups={group} />
    </div>
  );
}
