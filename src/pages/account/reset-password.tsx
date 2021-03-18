import Button from "@/components/FormComponents/Button";
import { useAuth } from "@/hooks/auth";
import { CreateAccount, LoginContainer } from "@/styles/pages/account/login";
import { Container, RecoverContainer, Success } from "@/styles/pages/account/forgot-password";
import { useCallback, useRef, useState } from "react";
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from "@/components/FormComponents/Input";
import * as Yup from 'yup';
import getValidationErrors from "@/utils/getValidationErrors";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useToast } from "@/hooks/toast";

interface ResetPasswordFormData {
	password: string;
	password_confirmation: string;
}

export default function ResetPassword() {
	const [passwordReseted, setPasswordReseted] = useState(false);
	const { resetPassword, loadingAction } = useAuth();
	const { addToast } = useToast()
	const formRef = useRef<FormHandles>(null);

	const router = useRouter();

	const { token } = router.query;

	const handleReset = useCallback(
		async (data: ResetPasswordFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					password: Yup.string().required('Password is required'),
					password_confirmation: Yup.string()
						.oneOf([Yup.ref('password'), null], 'Passwords must match')
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const {
					password,
					password_confirmation
				} = data;

				if (typeof token === 'string') {
					await resetPassword({ token, password, password_confirmation, setState: setPasswordReseted });
				}

			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					console.log(errors);
					formRef.current?.setErrors(errors);

					addToast({
						title: 'Something went wrong',
						type: 'error'
					})
				}
			}
		},
		[token],
	);

	return (
		<Container>
			<RecoverContainer>
				{passwordReseted &&
					(
						<AnimatePresence>
							<Success
								initial={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								animate={{ opacity: 1 }}>
								<motion.div
									className="is-done"
									initial={{ opacity: 0, bottom: '-50%', rotate: '360deg' }}
									transition={{ delay: 0.3, type: "spring", duration: 0.3, stiffness: 150 }}
									animate={{ opacity: 1, bottom: '0%', rotate: '0deg' }}
									drag
									dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
									dragElastic={0.5}
								>
									<FiCheck />
								</motion.div>
								<h3>PASSWORD CHANGED</h3>
								<p>You will be redirected to the login page<br /><div onClick={() => router.push('/account/login')}><b>or go now</b></div></p>
							</Success>
						</AnimatePresence>
					)
				}
				<div id="content">
					<h3>Change Password</h3>
					<div>
						<Form
							ref={formRef}
							onSubmit={handleReset}
						>
							<Input
								name="password"
								labelName="New password"
								type="password"
							/>
							<Input
								name="password_confirmation"
								labelName="Confirm new password"
								type="password"
							/>
							<Button
								type="submit"
								style={{ width: '100%' }}
								fullWidth
								loadingAction={loadingAction}
							>
								SET NEW PASSWORD
							</Button>
						</Form>
					</div>
				</div>
			</RecoverContainer>
		</Container>
	)
}
