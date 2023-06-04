export default function RegisterPage() {
  return (
    <form>
      {/* onSubmit={handleSubmit} */}
      <input placeholder="이름" type="text" /> {/* value,onChange 추가 */}
      <input placeholder="아이디" type="text" /> <button>중복 인증</button>
      <input placeholder="비밀번호" type="password" />
      <input placeholder="비밀번호 확인" type="password" />
      <input placeholder="이메일" type="email" /> <button>중복 인증</button>
      <h3>팀명/파트</h3>
      <select>
        <option value="dansupport">DANSUPPORT</option>
        <option value="hooking">HOOKING</option>
        <option value="baribari">BARIBARI</option>
        <option value="therapese">THERAPESE</option>
        <option value="repick">REPICK</option>
      </select>
      <select>
        <option value="frontend">FRONTEND</option>
        <option value="backend">BACKEND</option>
      </select>
      <button>회원가입</button>
    </form>
  );
}
