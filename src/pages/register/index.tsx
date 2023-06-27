import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'; //getQueryClient 추가하기
import { register, checkId, checkEmail } from '@/apis/auth';

export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdConfirm, setPwdConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [team, setTeam] = useState<string>('DANSUPPORT');
  const [part, setPart] = useState<string>('FRONTEND');

  //에러 메시지,확인 메시지 state
  const [nameMsg, setNameMsg] = useState<string>('');
  const [idMsg, setIdMsg] = useState<string>('');
  const [pwdMsg, setPwdMsg] = useState<string>('');
  const [pwdConfirmMsg, setPwdConfirmMsg] = useState<string>('');
  const [emailMsg, setEmailMsg] = useState<string>('');

  //유효성 검사 state (Checked->형식에 맞는지 안맞는지, Valid->중복인지 아닌지)
  const [isNameChecked, setIsNameChecked] = useState<boolean>(false);
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [isPwdChecked, setIsPwdChecked] = useState<boolean>(false);
  const [isPwdConfirmChecked, setIsPwdConfirmChecked] =
    useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  //api 로직들 가져와서 사용하기
  const registerMutation = useMutation(register, {
    onSuccess: data => {
      alert('회원가입이 완료됐어요!');
    },
    onError: error => {
      alert('회원가입에 실패했어요.');
    },
  });

  const checkIdMutation = useMutation(checkId, {
    onSuccess: data => {
      alert('사용 가능한 아이디입니다');
      setIsIdValid(true);
    },
    onError: error => {
      alert('이미 사용 중인 아이디입니다');
      setIsIdValid(false);
    },
  });

  const checkEmailMutation = useMutation(checkEmail, {
    onSuccess: data => {
      alert('사용 가능한 이메일입니다');
      setIsEmailValid(true);
    },
    onError: error => {
      alert('이미 사용 중인 이메일입니다');
      setIsEmailValid(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(
        isNameChecked &&
        isIdChecked &&
        isPwdChecked &&
        isPwdConfirmChecked &&
        isEmailChecked &&
        isIdValid &&
        isEmailValid
      )
    ) {
      alert('다 제대로 입력해야 회원가입 됩니다잉'); //나중에 멘트 수정
      return;
    }

    registerMutation.mutate({
      name: name,
      id: id,
      password: pwd,
      email: email,
      team: team,
      part: part,
    });
  };

  const checkDuplicatedId = (e: any) => {
    e.preventDefault();

    checkIdMutation.mutate(id);
  };

  const checkDuplicatedEmail = (e: any) => {
    e.preventDefault();

    checkEmailMutation.mutate(email);
  };

  //

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

  const TeamList = ['DANSUPPORT', 'HOOKING', 'BARIBARI', 'THERAPESE', 'REPICK'];
  const PartList = ['FRONTEND', 'BACKEND'];

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
      <button>중복 인증</button> {/* onClick={checkDuplicatedId} */}
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
      <button>중복 인증</button> {/* onClick={checkDuplicatedEmail} */}
      <h3>팀명/파트</h3>
      <select
        onChange={(e: any) => {
          setTeam(e.target.value);
          console.log(team);
        }}
      >
        {TeamList.map((item, idx) => (
          <option value={item} key={idx}>
            {item}
          </option>
        ))}
      </select>
      <select
        onChange={(e: any) => {
          setPart(e.target.value);
          console.log(part);
        }}
      >
        {PartList.map((item, idx) => (
          <option value={item} key={idx}>
            {item}
          </option>
        ))}
      </select>
      <button type="submit">회원가입</button>
    </form>
  );
}
