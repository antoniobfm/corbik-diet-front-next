import { useAuth } from "@/hooks/auth";
import { api } from "@/services/apiClient";
import { Header } from "@/styles/pages/Home";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dispatch } from "d3";
import { updateDietTargets } from "@/redux/Authentication/authentication.actions";
import { WideCardContainer, CardHeader, CardContent } from "@/modules/diet/home/Onboarding/styles";

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

	const { updateUser } = useAuth();

	const user = useSelector((state: RootState) => state.user.targets);
	const dispatch = useDispatch();

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

				dispatch(updateDietTargets({...formData}))

			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formTargetsRef.current?.setErrors(errors);

					return;
				}
			}
		},
		[],
	);

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
							initialData={{ carbohydrates: user && user.carbohydrates, proteins: user && user.proteins, fats: user && user.fats, calories: user && user.calories }}
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
}
