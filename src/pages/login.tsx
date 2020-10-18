import { useAuth } from "@/hooks/auth";
import { CreateButton } from "@/styles/pages/food/create";
import { Container, CreateAccount, LoginContainer } from "@/styles/pages/login";
import { useCallback, useRef } from "react";

export default function Login() {
  const {signIn} = useAuth();

  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();

  const handleSignIn = useCallback(() => {
    signIn({email: email.current.value, password: password.current.value});
  }, [])

  return (
    <Container>
      <LoginContainer>
        <h2>Login</h2>
        <div>
          <div className="form__field__container">
            <input ref={email} type="email" className="form__field" placeholder=" " name="email" id='email' required />
            <label htmlFor="email" className="form__label">E-mail</label>
          </div>

          <div className="form__field__container">
            <input ref={password} type="password" className="form__field" placeholder=" " name="password" id='password' required />
            <label htmlFor="password" className="form__label">Password</label>
          </div>
        </div>
        <CreateButton style={{width: '100%'}} onClick={handleSignIn}>LOGIN</CreateButton>
        <h5>Forgot password</h5>
      </LoginContainer>
      <CreateAccount>
        <CreateButton style={{width: '100%'}} onClick={() => {}}>CREATE ACCOUNT</CreateButton>
      </CreateAccount>
    </Container>
  )
}