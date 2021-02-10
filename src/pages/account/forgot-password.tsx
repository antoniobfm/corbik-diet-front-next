import Button from '@/components/FormComponents/Button'
import { useAuth } from '@/hooks/auth'
import {
	Container,
	RecoverContainer,
	Success
} from '@/styles/pages/account/forgot-password'
import { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Input from '@/components/FormComponents/Input'
import * as Yup from 'yup'
import getValidationErrors from '@/utils/getValidationErrors'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/toast'
import { FiCheck } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

interface ForgotPasswordFormData {
	email: string
}

export default function Login() {
	const [emailSent, setEmailSent] = useState(false)
	const { forgotPassword, loadingAction } = useAuth()
	const { addToast } = useToast()
	const formRef = useRef<FormHandles>(null)

	const router = useRouter()

	const handleRecover = useCallback(
		async (data: ForgotPasswordFormData) => {
			try {
				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email is required')
						.email('Email is invalid')
				})

				await schema.validate(data, {
					abortEarly: false
				})

				const { email } = data

				await forgotPassword(email)

				setEmailSent(true)
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)
					console.log(errors)
					formRef.current?.setErrors(errors)

					addToast({
						title: 'Something went wrong',
						type: 'error'
					});
				}
			}
		}, [])

	return (
		<Container>
			<RecoverContainer>
				{emailSent && (
					<AnimatePresence>
						<Success
							initial={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							animate={{ opacity: 1 }}
						>
							<motion.div
								className="is-done"
								initial={{ opacity: 0, bottom: '-50%', rotate: '360deg' }}
								transition={{
									delay: 0.3,
									type: 'spring',
									duration: 0.3,
									stiffness: 150
								}}
								animate={{ opacity: 1, bottom: '0%', rotate: '0deg' }}
								drag
								dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
								dragElastic={0.5}
							>
								<FiCheck />
							</motion.div>
							<h3>EMAIL SENT</h3>
							<p>
								If account exists, an email
								<br /> will be sent with further instructions
							</p>
						</Success>
					</AnimatePresence>
				)}
				<div id="content">
					<h3>Password Recovery</h3>
					<div>
						<Form
							ref={formRef}
							onSubmit={handleRecover}
						>
							<Input
								name="email"
								labelName="Your email"
								type="input"
							/>
							<Button
								type="submit"
								style={{ width: '100%' }}
								fullWidth
								loadingAction={loadingAction}
							>
								EMAIL ME A RECOVERY LINK
							</Button>
						</Form>
					</div>
				</div>
			</RecoverContainer>
			<button
				type="button"
				onClick={() => {
					router.push('/account/login')
				}}
				id="back"
			>
				SIGN IN
			</button>
		</Container>
	)
}
