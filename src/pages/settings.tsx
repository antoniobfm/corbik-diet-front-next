import { useAuth } from "@/hooks/auth";
import api from "@/services/api";
import { CardContent, CardHeader, Header, WideCardContainer } from "@/styles/pages/Home";
import { Container } from "@/styles/pages/settings";
import { useCallback, useRef } from "react";
import getValidationErrors from '../utils/getValidationErrors';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from "@/components/FormComponents/Input";
import GoBack from "@/components/GoBack";
import Button from "@/components/FormComponents/Button";
import { useToast } from "@/hooks/toast";
import WholePageTransition from "@/components/WholePageTransition";
import { Footer } from "@/styles/pages/log/edit/edit";

interface ProfileFormData {
	name: string;
	email: string;
	old_password: string;
	password: string;
	password_confirmation: string;
}

interface TargetsFormData {
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
}

export default function Settings() {
	const { addToast } = useToast();

	const formRef = useRef<FormHandles>(null);
	const formTargetsRef = useRef<FormHandles>(null);

	const { updateUser, user, signOut } = useAuth();

	const handleSubmit = useCallback(
		async (data: ProfileFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatorio'),
					email: Yup.string()
						.required('E-mail obrigatorio')
						.email('Digite um e-mail valido'),
					old_password: Yup.string(),
					password: Yup.string().when('old_password', {
						is: (val) => !!val.length,
						then: Yup.string().required('Campo obrigatorio'),
						otherwise: Yup.string(),
					}),
					password_confirmation: Yup.string()
						.when('old_password', {
							is: (val) => !!val.length,
							then: Yup.string().required('Campo obrigatorio'),
							otherwise: Yup.string(),
						})
						.oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const {
					name,
					email,
					old_password,
					password,
					password_confirmation,
				} = data;

				const formData = {
					name,
					email,
					...(old_password
						? {
							old_password,
							password,
							password_confirmation,
						}
						: {}),
				};

				const response = await api.put('/profile', formData);

				updateUser(response.data);

				addToast({
					type: 'success',
					title: `Modified your profile with success`
				});

			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formRef.current?.setErrors(errors);

					addToast({
						type: 'error',
						title: `Something went wrong`
					});

					return;
				}
			}
		},
		[],
	);

	return (
		<WholePageTransition>
			<GoBack />
			<Container>
				<Header>
					<h1>User Settings</h1>
				</Header>
				<WideCardContainer>
					<CardHeader>
						<h2>Your account</h2>
					</CardHeader>
					<CardContent>
						<Form
							ref={formRef}
							initialData={{ name: user.name, email: user.email }}
							onSubmit={handleSubmit}
						>
							<Input
								name="name"
								labelName="Name"
								type="input"
							/>
							<Input
								name="email"
								labelName="Email"
								type="input"
							/>

							<Input
								containerStyle={{ marginTop: 24 }}
								name="old_password"
								labelName="Old password"
								type="password"
							/>

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
							<Button fullWidth type="submit">SAVE</Button>
						</Form>
					</CardContent>
				</WideCardContainer>
				<Footer>
					<button type="button" onClick={signOut}>
						Logout
      		</button>
				</Footer>
			</Container>
		</WholePageTransition>
	)
}
