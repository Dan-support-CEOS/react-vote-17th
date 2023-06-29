import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'; //getQueryClient 추가하기
import { register, checkId, checkEmail } from '@/apis/auth';
import { useRouter } from 'next/router';
import styles from '../../styles/RegisterPage.module.css';

export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdConfirm, setPwdConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [team, setTeam] = useState<string>('댄서포트');
  const [part, setPart] = useState<string>('fe'); //'fe'/'be'

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

  const router = useRouter();

  //api 로직들 가져와서 사용하기
  const registerMutation = useMutation(register, {
    onSuccess: data => {
      alert('회원가입이 완료됐어요!');
      router.push('/login');
    },
    onError: error => {
      alert('알맞은 이메일 형식을 입력해주세요!'); //임시
    },
  });

  const checkIdMutation = useMutation(checkId, {
    onSuccess: data => {
      setIsIdValid(true);
      alert('사용 가능한 아이디입니다');
    },
    onError: error => {
      setIsIdValid(false);
      alert('이미 사용 중인 아이디입니다');
      setId('');
      setIdMsg('');
    },
  });

  const checkEmailMutation = useMutation(checkEmail, {
    onSuccess: data => {
      setIsEmailValid(true);
      alert('사용 가능한 이메일입니다');
    },
    onError: error => {
      setIsEmailValid(false);
      alert('이미 사용 중인 이메일입니다');
      setEmail('');
      setEmailMsg('');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isIdValid && !isEmailValid) {
      alert('아이디와 이메일 중복 확인 절차가 필요합니다.');
      return;
    } else if (!isIdValid) {
      alert('아이디 중복 확인 절차가 필요합니다.');
      return;
    } else if (!isEmailValid) {
      alert('이메일 중복 확인 절차가 필요합니다.');
      return;
    } else if (
      !(
        isNameChecked &&
        isIdChecked &&
        isPwdChecked &&
        isPwdConfirmChecked &&
        isEmailChecked
      )
    ) {
      alert('모든 형식을 알맞게 입력해주세요!'); //나중에 멘트 수정
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
    setIsIdValid(false);
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/; //나중에 id 형식 바꾸기!

    if (!idRegex.test(currentId)) {
      setIdMsg('숫자+영문자 조합으로 6자리 이상 입력해주세요');
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
    setIsEmailValid(false);
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

  const TeamList = ['댄서포트', 'Hooking', '바리바리', 'TherapEase', 'Repick'];
  const PartList = [
    { value: 'fe', name: 'FRONTEND' },
    { value: 'be', name: 'BACKEND' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.text}>Create Account</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.box}>
          <div className={styles.title}>이름</div>
          <input
            className={styles.input}
            placeholder="이름"
            type="text"
            value={name}
            onChange={handleChangeName}
          />
          <div className={styles.msgBox}>
            <div className={isNameChecked ? styles.checkMsg : styles.errorMsg}>
              {nameMsg}
            </div>
          </div>
          {/* 나중에, className={isNameChecked ? 'success' : 'error'} 작성해서, 색깔 토글해주기! */}
        </div>

        <div className={styles.box}>
          <div className={styles.title}>아이디</div>
          <div className={styles.idBox}>
            <input
              className={styles.input}
              placeholder="아이디"
              type="text"
              value={id}
              onChange={handleChangeId}
            />
            {!isIdValid ? (
              <button className={styles.checkBtn} onClick={checkDuplicatedId}>
                중복 확인
              </button>
            ) : (
              <button
                className={styles.availableBtn}
                onClick={checkDuplicatedId}
              >
                사용 가능
              </button>
            )}
          </div>
          <div className={styles.msgBox}>
            <div className={isIdChecked ? styles.checkMsg : styles.errorMsg}>
              {idMsg}
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>비밀번호</div>
          <input
            className={styles.input}
            placeholder="비밀번호"
            type="password"
            value={pwd}
            onChange={handleChangePwd}
          />
          <div className={styles.msgBox}>
            <div className={isPwdChecked ? styles.checkMsg : styles.errorMsg}>
              {pwdMsg}
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>비밀번호 확인</div>
          <input
            className={styles.input}
            placeholder="비밀번호 확인"
            type="password"
            value={pwdConfirm}
            onChange={handleChangePwdConfirm}
          />
          <div className={styles.msgBox}>
            <div
              className={
                isPwdConfirmChecked ? styles.checkMsg : styles.errorMsg
              }
            >
              {pwdConfirmMsg}
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>이메일</div>
          <div className={styles.emailBox}>
            <input
              className={styles.input}
              placeholder="ex) ceos@ceos.com"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />
            {!isEmailValid ? (
              <button
                className={styles.checkBtn}
                onClick={checkDuplicatedEmail}
              >
                중복 확인
              </button>
            ) : (
              <button
                className={styles.availableBtn}
                onClick={checkDuplicatedEmail}
              >
                사용 가능
              </button>
            )}
          </div>
          <div className={styles.msgBox}>
            <div className={isEmailChecked ? styles.checkMsg : styles.errorMsg}>
              {emailMsg}
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>팀명/파트</div>
          <select
            className={styles.select}
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
            className={styles.select}
            onChange={(e: any) => {
              setPart(e.target.value);
              console.log(part);
            }}
          >
            {PartList.map((item, idx) => (
              <option value={item.value} key={idx}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.registerBtnBox}>
          <button type="submit" className={styles.registerBtn}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
