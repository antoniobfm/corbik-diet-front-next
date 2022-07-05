import { useAuth } from "@/hooks/auth";
import { CreateButton } from "@/styles/pages/food/create";
import Button from '@/components/FormComponents/Button'
import { ContainerPopup } from "@/styles/pages/account/login";
import {
	ButtonLogin,
	CreateAccount,
	Footer,
	GetNotifiedContainer,
	Header,
	LoginContainer,
	MiddleContent,
	LoginContainerPopup
} from '@/styles/pages/account/login'
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Input from "./FormComponents/Input";
import { Form } from "@unform/web";
import getValidationErrors from "@/utils/getValidationErrors";
import { FormHandles } from "@unform/core";
import * as Yup from 'yup'
import { motion } from "framer-motion";
import { AuthContext } from "@/contexts/AuthContext";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/Authentication/authentication.actions";

interface LoginFormData {
	email: string
	password: string
}

interface IProps {
	setState: any;
}

const LoginModal: React.FC<IProps> = ({
	setState,
}: IProps) => {
	const [emailInput, setEmailInput] = useState('');
	const [isEmpty, setIsEmpty] = useState<boolean>(true);
	const [loadingAction, setLoadingAction] = useState<boolean>(false);
	const [passwordInput, setPasswordInput] = useState('');
	// const { signIn } = useContext(AuthContext)
	const router = useRouter();

	const formRef = useRef<FormHandles>(null);
	const email = useRef<HTMLInputElement>();
	const password = useRef<HTMLInputElement>();

  const node = useRef<HTMLDivElement>();

  const [open, setOpen] = useState(true);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      console.log("clicking inside");
      return;
    }
		console.log("clicking outside");
    // outside click
    setState(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
	}, [open]);

	const dispatch = useDispatch();

	const handleSignIn = useCallback(async (data: LoginFormData) => {
		setLoadingAction(true)
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

			dispatch(signIn({	email, password }))
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)
				console.log(errors)
				formRef.current?.setErrors(errors)
			}
		}
		setLoadingAction(false)
	}, [])

	useEffect(() => {
		if (emailInput.length >= 1 && passwordInput.length >= 1) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}
	}, [emailInput, passwordInput]);

	return (
		<motion.div className="blurred__background"
		initial={{ opacity: 0 }}
		transition={{ ease: "easeOut", duration: 0.3 }}
		animate={{ opacity: 1}}
		exit={{ opacity: 0 }}>
			<ContainerPopup>
				<LoginContainerPopup ref={node}>
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
							isDisabled={isEmpty || loadingAction}
							disabled={isEmpty || loadingAction}
						>
							{loadingAction ? <Loading /> : 'SIGN IN'}
						</ButtonLogin>
					</Form>
				</div>
				<h5 onClick={() => router.push('/account/forgot-password')}>
					Forgot password
				</h5>
			</LoginContainerPopup>
				{/* <CreateAccount>
					<Button
						type="button"
						style={{ width: '100%' }}
						fullWidth
						onClick={() => { }}
					>
						CREATE ACCOUNT
				</Button>
				</CreateAccount> */}
			</ContainerPopup>
		</motion.div>
	)
}

export default LoginModal;
