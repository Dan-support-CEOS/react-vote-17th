import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'; //getQueryClient 추가하기
//import { useRecoilState } from 'recoil';
//import { login } from '@/service/auth';

export default function LoginPage() {
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  return (
    <form>
      {/* onSubmit={handleSubmit} */}
      <h3>아이디</h3>
      <input
        placeholder="아이디"
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        required
      />

      <h3>비밀번호</h3>
      <input
        placeholder="비밀번호"
        type="password"
        value={pwd}
        onChange={e => setPwd(e.target.value)}
        required
      />

      <button type="submit">로그인</button>
    </form>
  );
}
