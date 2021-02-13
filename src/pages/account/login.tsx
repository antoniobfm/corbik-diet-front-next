import Button from '@/components/FormComponents/Button'
import { useAuth } from '@/hooks/auth'
import {
	ButtonLogin,
	Container,
	CreateAccount,
	LoginContainer
} from '@/styles/pages/account/login'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Input from '@/components/FormComponents/Input'
import * as Yup from 'yup'
import getValidationErrors from '@/utils/getValidationErrors'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'

interface LoginFormData {
	email: string
	password: string
}

export default function Login() {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [isEmpty, setIsEmpty] = useState<boolean>(true);
	const { signIn, loadingAction } = useAuth()
	const formRef = useRef<FormHandles>(null)

  const router = useRouter()

  const handleSignIn = useCallback(async (data: LoginFormData) => {
    try {
      formRef.current?.setErrors({})

			const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
					.email('Email is invalid'),
        password: Yup.string().required('Password is required')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const { email, password } = data

      signIn({ email, password })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        console.log(errors)
        formRef.current?.setErrors(errors)
      }
    }
  }, [])

	useEffect(() => {
		if (emailInput.length >= 1 && passwordInput.length >= 1) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}
	}, [emailInput, passwordInput]);

  return (
		<Container>
			<LoginContainer>
				<h3>Login</h3>
				<div>
					<Form ref={formRef} onSubmit={handleSignIn}>
						<Input
							name="email"
							autoCapitalize="no"
							labelName="Email"
							type="email"
							onChange={(e) => setEmailInput(e.target.value)}
						/>
						<Input
							name="password"
							labelName="Password"
							type="password"
							onChange={(e) => setPasswordInput(e.target.value)}
						/>
						<ButtonLogin
							type="submit"
							style={{ width: '100%' }}
							isDisabled={isEmpty}
							disabled={isEmpty}
						>
							{loadingAction ? 'Loading...' : 'SIGN IN'}
						</ButtonLogin>
					</Form>
				</div>
				<h5 onClick={() => router.push('/account/forgot-password')}>
					Forgot password
				</h5>
			</LoginContainer>
			<CreateAccount>
				<Button
					type="button"
					style={{ width: '100%' }}
					fullWidth
					onClick={() => {}}
				>
					CREATE ACCOUNT
				</Button>
			</CreateAccount>
		</Container>
	)
}
