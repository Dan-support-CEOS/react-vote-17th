export default function LoginPage() {
  return (
    <form>
      {/* onSubmit={handleSubmit} */}
      <input placeholder="아이디" type="text" /> {/* value,onChange 추가 */}
      <input placeholder="비밀번호" type="password" />
      <button>로그인</button>
    </form>
  );
}
