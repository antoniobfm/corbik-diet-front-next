import { useAuth } from "@/hooks/auth";
import {api} from "@/services/apiClient";
import { CardContent, CardHeader, Header, WideCardContainer } from "@/styles/pages/Home";
import { Container } from "@/styles/pages/settings";
import { useCallback, useRef } from "react";
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from "@/components/FormComponents/Input";
import GoBack from "@/components/GoBack";
import Button from "@/components/FormComponents/Button";
import { useToast } from "@/hooks/toast";
import WholePageTransition from "@/components/WholePageTransition";
import Head from "next/head";

interface TargetsFormData {
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
}

export default function DietSettings() {
	const { addToast } = useToast();

	const formRef = useRef<FormHandles>(null);
	const formTargetsRef = useRef<FormHandles>(null);

	const { updateUser, user, signOut } = useAuth();

	const handleSubmitTargets = useCallback(
		async (data: TargetsFormData) => {
			try {
				formTargetsRef.current?.setErrors({});

				const schema = Yup.object().shape({
					carbohydrates: Yup.string().required('Carbohydrates amount required'),
					proteins: Yup.string().required('Proteins amount required'),
					fats: Yup.string().required('Fats amount required'),
					calories: Yup.string().required('Calories amount required'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const {
					carbohydrates,
					proteins,
					fats,
					calories
				} = data;

				const formData = {
					carbohydrates: parseInt(carbohydrates, 10),
					proteins: parseInt(proteins, 10),
					fats: parseInt(fats, 10),
					calories: parseInt(calories, 10)
				};

				const response = await api.put('/profile/diet-targets', formData);

				updateUser(response.data);

				addToast({
					type: 'success',
					title: `Modified your targets with success`
				});

			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formTargetsRef.current?.setErrors(errors);

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

	if (user) {
		return (
			<WholePageTransition>
				<Head>
					<title>Corbik</title>
					<meta name="robots" content="noindex" />
					<meta name="googlebot" content="noindex" />
				</Head>
				<GoBack />
				<Container>
					<Header>
						<h1>Diet Settings</h1>
					</Header>
					<WideCardContainer>
						<CardHeader>
							<h2>Targets</h2>
						</CardHeader>
						<CardContent>
							<Form
								ref={formTargetsRef}
								initialData={{ carbohydrates: user.carbohydrates, proteins: user.proteins, fats: user.fats, calories: user.calories }}
								onSubmit={handleSubmitTargets}
							>
								<div className="form__three__columns">
									<Input
										name="carbohydrates"
										labelName="Carbohydrates"
										type="number"
										step="0.01"
										required={true}
									/>
									<Input
										name="proteins"
										labelName="Proteins"
										type="number"
										step="0.01"
									/>
									<Input
										name="fats"
										labelName="Fats"
										type="number"
										step="0.01"
									/>
								</div>
								<Input
									name="calories"
									labelName="Calories"
									type="number"
									step="0.01"
								/>
								<Button type="submit" style={{ width: '100%' }} fullWidth>SAVE</Button>
							</Form>
						</CardContent>
					</WideCardContainer>
				</Container>
			</WholePageTransition>
		)
	} else {
		return (<h1>Loading</h1>);
	}
}
