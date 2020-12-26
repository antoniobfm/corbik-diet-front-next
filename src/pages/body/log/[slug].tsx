import Button from "@/components/FormComponents/Button";
import Input from "@/components/FormComponents/Input";
import WholePageTransition from "@/components/WholePageTransition";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import api from "@/services/api";
import { Details, Header } from "@/styles/pages/food/food";
import { Calories, Macro, Macros } from "@/styles/pages/Home";
import { Container, Icon, ConfirmDeletion } from "@/styles/pages/log/edit/edit";
import addZeroBefore from "@/utils/addZeroBefore";
import getValidationErrors from "@/utils/getValidationErrors";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import useSWR from "swr";
import * as Yup from 'yup';

interface ILog {
	id: string;
	user_id: string;
	weight: string;
	muscle: string;
	fat: string;
	water: string;
	bones: string;
	when: string;
	created_at: Date;
	updated_at: Date;
}

interface IBodyFormData {
	weight: string;
	muscle: string;
	fat: string;
	water: string;
	bones: string;
}

export default function Edit(body: string) {
	const router = useRouter();
	const formRef = useRef<FormHandles>(null);

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [muscle, setMuscle] = useState<string | null>();
	const [water, setWater] = useState<string | null>();
	const [fat, setFat] = useState<string | null>();
	const [weight, setWeight] = useState<string | null>();
	const [bones, setBones] = useState<string | null>();

	const [date, setDate] = useState<Date>(new Date());

	const { user, loading } = useAuth();

	const logId = router.query.slug;

	const handleConfirmation = useCallback((e) => {
		e.preventDefault();

		setShowConfirmation(!showConfirmation);
	}, [showConfirmation]);

	const handleData = useCallback((data: ILog) => {
		data = data.data;
		setFat(data.fat);
		setMuscle(data.muscle);
		setWater(data.water);
		setWeight(data.weight);
		setBones(data.bones);
		setDate(new Date(data.when));
	}, []);

	const { data: { data: logData } = {}, isValidating } = useSWR(
		`/body/log/specific/${logId}`,
		api.get, {
		onSuccess: (data, key, config) => {
			handleData(data);
		}
	});


	useEffect(() => {
		if (logData) {
			setFat(logData.fat);
			setMuscle(logData.muscle);
			setWater(logData.water);
			setWeight(logData.weight);
		}
	}, [logData]);

	const showSkeleton = isValidating || loading;
	const { addToast } = useToast();

	const handleDelete = useCallback((e) => {
		e.preventDefault()
		async function editFood() {
			await api.delete(`/food/log/specific/${logData.id}`);

			addToast({
				type: 'success',
				title: 'Deleted log with success',
			});

			router.push(`/`);
		}

		editFood();
	}, [logData]);

	const handleEdit = useCallback(async (data: IBodyFormData) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				weight: Yup.string().required('Password is required'),
				muscle: Yup.string().required('Password is required'),
				water: Yup.string().required('Password is required'),
				fat: Yup.string().required('Password is required'),
				bones: Yup.string().required('Password is required'),
				when: Yup.string().required('Password is required'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const body = {
				log_id: logData.id,
				weight: parseFloat(data.weight),
				muscle: parseFloat(data.muscle),
				water: parseFloat(data.water),
				fat: parseFloat(data.fat),
				bones: parseFloat(data.bones),
				when: date,
			};

		await api.put(`/body`, body);

		addToast({
			type: 'success',
			title: 'Modified your log with success',
		});

		router.push(`/body`);
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
	}, [logData, muscle, water, fat, weight, bones, date]);

	return (
		<>
		<WholePageTransition>
			<Container>
				<Header>
					<div>
						<h1>{logData ? logData.when : <Skeleton height={30} width={200} />}</h1>
					</div>
				</Header>
				<Macros>
					<Macro macro="carb">
						<h3>Muscle</h3>
						<span>{muscle && muscle}</span>
						<progress id="muscle" value={muscle && muscle} max={user && user.muscle}>30%</progress>
					</Macro>
					<Macro macro="protein">
						<h3>Protein</h3>
						<span>{water && water}</span>
						<progress id="water" value={water && water} max={user && user.water}>30%</progress>
					</Macro>
					<Macro macro="fat">
						<h3>Fat</h3>
						<span>{fat && fat}</span>
						<progress id="fat" value={fat && fat} max={user && user.fat}>30%</progress>
					</Macro>
				</Macros>
				<Calories>
					<div>
						<h3>Weight</h3>
						<span>{weight && weight}</span>
					</div>
					<progress id="weight" value={weight && weight} max={user && user.weight}>30%</progress>
				</Calories>
				<Details>
					<Form
						ref={formRef}
						onSubmit={handleEdit}
						initialData={{weight, muscle, water, fat, bones}}>
							<Input
								name="when"
								labelName="When"
								type="datetime-local"
								value={`${new Date(date).getFullYear()}-${addZeroBefore(new Date(date).getMonth() + 1)}-${addZeroBefore(new Date(date).getDate())}T${addZeroBefore(new Date(date).getHours())}:${addZeroBefore(new Date(date).getMinutes())}`}
								onChange={e => setDate(new Date(e.target.value))} />
							<Input
								name="weight"
								labelName="Weight"
								placeholder="Kilos"
								type="number"
								step="0.01"
							/>
							<div className="form__four__columns">
								<Input
									name="muscle"
									labelName="Muscle"
									placeholder="%"
									type="number"
									step="0.01"
								/>
								<Input
									name="water"
									labelName="Water"
									placeholder="%"
									type="number"
									step="0.01"
								/>
								<Input
									name="fat"
									labelName="Fat"
									placeholder="%"
									type="number"
									step="0.01"
								/>
								<Input
									name="bones"
									labelName="Bones"
									placeholder="%"
									type="number"
									step="0.01"
								/>
							</div>
						<Button type="submit" style={{width: '100%'}}>EDIT</Button>
					</Form>
				</Details>
				<div className="delete">
					<button type="button" onClick={handleConfirmation}>
						<Icon />
					</button>
				</div>
			</Container>
		</WholePageTransition>
			{showConfirmation &&
				<ConfirmDeletion>
					<button type="button" onClick={handleConfirmation} />
					<div>
						<h2>Confirm deletion</h2>
						<div>
							<button type="button" onClick={handleConfirmation} className="button--cancel">CANCEL</button>
							<button type="button" onClick={handleDelete} className="button--confirm--deletion">CONFIRM</button>
						</div>
					</div>
					<button type="button" onClick={handleConfirmation} />
				</ConfirmDeletion>
			}
		</>
	);
}
