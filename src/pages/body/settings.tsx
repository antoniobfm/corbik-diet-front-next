import { useAuth } from "@/hooks/auth";
import { api } from '@/services/apiClient';
import { WideCardContainer, CardContent, CardHeader, Header } from "@/styles/pages/Home";
import { Container } from "@/styles/pages/settings";
import { useCallback, useContext, useRef } from "react";
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from "@/components/FormComponents/Input";
import GoBack from "@/components/GoBack";
import Button from "@/components/FormComponents/Button";
import { useToast } from "@/hooks/toast";
import WholePageTransition from "@/components/WholePageTransition";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { AuthContext } from "@/contexts/AuthContext";

interface TargetsFormData {
	weight: string;
}

export default function BodySettings() {
	const { addToast } = useToast();

	const formTargetsRef = useRef<FormHandles>(null);

	const { update, user } = useContext(AuthContext);

	const handleSubmitTargets = useCallback(
		async (data: TargetsFormData) => {
			try {
				formTargetsRef.current?.setErrors({});

				const schema = Yup.object().shape({
					weight: Yup.string().required('Weight amount required'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const {
					weight,
				} = data;

				const formData = {
					weight: parseInt(weight, 10),
				};

				const response = await api.put('/profile/body-targets', formData);

				await update();

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

	return (
		<WholePageTransition>
			<GoBack />
			<Container>
				<Header>
					<h1>Body Settings</h1>
				</Header>
				<WideCardContainer>
					<CardHeader>
						<h2>Targets</h2>
					</CardHeader>
					<CardContent>
						<Form
							ref={formTargetsRef}
							initialData={{ weight: user && user.weight }}
							onSubmit={handleSubmitTargets}
						>
							<Input
								name="weight"
								labelName="Weight (kg)"
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

export const getServerSideProps = withSSRAuth(async ctx => {
	return {
		props: {}
	}
})
