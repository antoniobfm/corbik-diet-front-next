import Button from '@/components/FormComponents/Button'
import { useAuth } from '@/hooks/auth'
import {
	ButtonLogin,
	Container,
	CreateAccount,
	Footer,
	GetNotifiedContainer,
	Header,
	LoginContainer,
	MiddleContent
} from '@/styles/pages/account/login'
import { useCallback, useEffect, useRef, useState } from 'react'
import Input from '@/components/FormComponents/Input'
import getValidationErrors from '@/utils/getValidationErrors'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { FiCheck, FiMail } from 'react-icons/fi'
import LoginModal from '@/components/LoginModal'
import Loading from '@/components/Loading'
import { api } from '@/services/apiClient';
import InputWithIcon from '@/components/FormComponents/InputWithIcon'
import * as Yup from 'yup';
import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import { useToast } from '@/hooks/toast'
import Head from 'next/head'
import { setupAPIClient } from '@/services/api'
import { LogoSvg } from '@/components/LogoSvg'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface LoginFormData {
	email: string
	password: string
}

interface WaitlistFormData {
	email: string;
}

export default function Login() {
	const [showLogin, setShowLogin] = useState(false);
	const [waitlisted, setWaitlisted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { addToast } = useToast();

	const formRef = useRef<FormHandles>(null);

	const user = useSelector((state: RootState) => state.user.info)
	const router = useRouter();

	useEffect(() => {
		if (user.id) {
			router.push('/diet')
		}
	}, [user])

	const handleEnterWaitlist = useCallback(async (data: WaitlistFormData) => {
		setLoading(true);
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				email: Yup.string().email().required('Email is required'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const response = await api.post('/waitlist', {email: data.email});

			setWaitlisted(true)
		} catch (err) {
			// const errors = getValidationErrors(err);

			// formRef.current?.setErrors(errors);

			addToast({
				type: 'error',
				title: `You need to insert a valid email`
			});

			setLoading(false);
		}
		setLoading(false);
	}, []);

	return (
		<>
		<Head>
			<title>Corbik</title>
		</Head>
		<AnimatePresence>
		{showLogin && <LoginModal setState={setShowLogin} />}
		</AnimatePresence>
		<Container>
			<Header>
				<LogoSvg />
				<button type="button" onClick={() => setShowLogin(true)} data-test="login-button">LOGIN</button>
			</Header>
			<MiddleContent>
				<h1>Own your body.</h1>
				<h2>Lose weight without cutting the fast food, understand what is going on with your body and why so you can act uppon hard data.</h2>
			</MiddleContent>
			<GetNotifiedContainer>
				{waitlisted &&
				<motion.div id="all-set"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					animate={{ opacity: 1 }}>
					<motion.div
						className="is-done"
						initial={{ opacity: 0, bottom: '-50%', rotate: '360deg', borderRadius: 30 }}
						transition={{
							delay: 0.3,
							type: 'spring',
							duration: 0.6,
							stiffness: 150
						}}
						animate={{ opacity: 1, bottom: '0%', rotate: '0deg' }}
						drag
						dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
						dragElastic={0.5}
					>
						<FiCheck />
					</motion.div>
					<h4>You’re all set!</h4>
					<p>We’ll send you an email when your time comes</p>
				</motion.div>
				}
				<h3>Get invited to our beta</h3>
				<Form
					ref={formRef}
					onSubmit={handleEnterWaitlist}
				>
				<div id="get-notification-container">
					<InputWithIcon name="email" />
				</div>
				<button id="get-notified-button" type="submit" disabled={loading}><span>{loading ? <Loading /> : 'ENTER WAITLIST'}</span></button>
					</Form>
			</GetNotifiedContainer>
			<Footer>
				{/* <img src={'/icons/screens.png'} /> */}
			</Footer>
			{/* <LoginContainer>
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
			</CreateAccount> */}
		</Container>
		</>
	)
}
