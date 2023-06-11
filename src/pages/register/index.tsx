import { useState } from 'react';
//import { useRecoilState } from 'recoil';
//import { register } from '@/service/auth';

export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdConfirm, setPwdConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [part, setPart] = useState<string>('');

  //에러 메시지,확인 메시지
  const [nameMsg, setNameMsg] = useState<string>('');
  const [idMsg, setIdMsg] = useState<string>('');
  const [pwdMsg, setPwdMsg] = useState<string>('');
  const [pwdConfirmMsg, setPwdConfirmMsg] = useState<string>('');
  const [emailMsg, setEmailMsg] = useState<string>('');

  //유효성 검사 (Checked->형식에 맞는지 안맞는지, Valid->중복인지 아닌지)
  const [isNameChecked, setIsNameChecked] = useState<boolean>(false);
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [isPwdChecked, setIsPwdChecked] = useState<boolean>(false);
  const [isPwdConfirmChecked, setIsPwdConfirmChecked] =
    useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMsg('2글자 이상 5글자 이하로 입력해주세요');
      setIsNameChecked(false);
    } else {
      setNameMsg('올바른 이름 형식 입니다');
      setIsNameChecked(true);
    }
  };

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; //나중에 id 형식 바꾸기!

    if (!idRegex.test(currentId)) {
      setIdMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요');
      setIsIdChecked(false);
    } else {
      setIdMsg('올바른 아이디 형식 입니다.');
      setIsIdChecked(true);
    }
  };

  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPwd = e.target.value;
    setPwd(currentPwd);
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!pwdRegex.test(currentPwd)) {
      setPwdMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요');
      setIsPwdChecked(false);
    } else {
      setPwdMsg('올바른 비밀번호 형식 입니다');
      setIsPwdChecked(true);
    }
  };

  const handleChangePwdConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPwdConfirm = e.target.value;
    setPwdConfirm(currentPwdConfirm);

    if (pwd !== currentPwdConfirm) {
      setPwdConfirmMsg('비밀번호가 일치하지 않습니다');
      setIsPwdConfirmChecked(false);
    } else {
      setPwdConfirmMsg('비밀번호가 일치합니다');
      setIsPwdConfirmChecked(true);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegex =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegex.test(currentEmail)) {
      setEmailMsg('이메일 형식이 올바르지 않습니다');
      setIsEmailChecked(false);
    } else {
      setEmailMsg('올바른 이메일 형식입니다');
      setIsEmailChecked(true);
    }
  };

  return (
    <form>
      {/* onSubmit={handleSubmit} */}
      <h3>이름</h3>
      <input
        placeholder="이름"
        type="text"
        value={name}
        onChange={handleChangeName}
        required
      />
      <p>{nameMsg}</p>
      {/* 나중에, className={isNameChecked ? 'success' : 'error'} 작성해서, 색깔 토글해주기! */}
      <h3>아이디</h3>
      <input
        placeholder="아이디"
        type="text"
        value={id}
        onChange={handleChangeId}
        required
      />
      <p>{idMsg}</p>
      <button>중복 인증</button>
      <h3>비밀번호</h3>
      <input
        placeholder="비밀번호"
        type="password"
        value={pwd}
        onChange={handleChangePwd}
        required
      />
      <p>{pwdMsg}</p>
      <h3>비밀번호 확인</h3>
      <input
        placeholder="비밀번호 확인"
        type="password"
        value={pwdConfirm}
        onChange={handleChangePwdConfirm}
        required
      />
      <p>{pwdConfirmMsg}</p>
      <h3>이메일</h3>
      <input
        placeholder="이메일"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        required
      />
      <p>{emailMsg}</p>
      <button>중복 인증</button>
      <h3>팀명/파트</h3>
      <select>
        {/* List 만들어서 리팩토링 나중에 */}
        <option value="dansupport">DANSUPPORT</option>
        <option value="hooking">HOOKING</option>
        <option value="baribari">BARIBARI</option>
        <option value="therapese">THERAPESE</option>
        <option value="repick">REPICK</option>
      </select>
      <select>
        {/* List 만들어서 리팩토링 나중에 */}
        <option value="frontend">FRONTEND</option>
        <option value="backend">BACKEND</option>
      </select>
      <button type="submit">회원가입</button>
    </form>
  );
}
