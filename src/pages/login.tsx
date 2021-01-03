import Button from "@/components/FormComponents/Button";
import { useAuth } from "@/hooks/auth";
import { Container, CreateAccount, LoginContainer } from "@/styles/pages/login";
import { useCallback, useRef } from "react";
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from "@/components/FormComponents/Input";
import * as Yup from 'yup';
import getValidationErrors from "@/utils/getValidationErrors";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {signIn, loading} = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
						.email('Email is invalid'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          email,
          password,
				} = data;

        signIn({email, password});

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);
          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [],
	);

  return (
    <Container>
      <LoginContainer>
        <h2>Login</h2>
        <div>
          <Form
            ref={formRef}
            onSubmit={handleSignIn}
          >
            <Input
              name="email"
              labelName="Email"
              type="input"
            />
            <Input
              name="password"
              labelName="Password"
              type="password"
            />
          <Button type="submit" style={{width: '100%'}} loading={loading}>SIGN IN</Button>
          </Form>
        </div>
        <h5>Forgot password</h5>
      </LoginContainer>
      <CreateAccount>
        <Button type="button" style={{width: '100%'}} onClick={() => {}}>CREATE ACCOUNT</Button>
      </CreateAccount>
    </Container>
  )
}
