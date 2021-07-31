import ConfirmActionModal from "@/components/ConfirmActionModal";
import Button from "@/components/FormComponents/Button";
import Input from "@/components/FormComponents/Input";
import WholePageTransition from "@/components/WholePageTransition";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import { api } from '@/services/apiClient';
import { Details, Header } from "@/styles/pages/food/food";
import { Calories, Macro, Macros } from "@/styles/pages/Home";
import { Container, DeleteIcon, ConfirmDeletion, Footer } from "@/styles/pages/log/edit/edit";
import addZeroBefore from "@/utils/addZeroBefore";
import getValidationErrors from "@/utils/getValidationErrors";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
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

	const [logData, setLogData] = useState<any>();

	const [muscle, setMuscle] = useState<string | null>();
	const [water, setWater] = useState<string | null>();
	const [fat, setFat] = useState<string | null>();
	const [weight, setWeight] = useState<string | null>();
	const [bones, setBones] = useState<string | null>();

	const [date, setDate] = useState<Date>(new Date());
	const [headerDate, setHeaderDate] = useState<string>('');

	const { user, loading } = useAuth();

	const logId = router.query.slug;

	const handleConfirmation = useCallback((e) => {
		e.preventDefault();

		setShowConfirmation(!showConfirmation);
	}, [showConfirmation]);

	const handleData = useCallback((data: ILog) => {
		setFat(data.fat);
		setMuscle(data.muscle);
		setWater(data.water);
		setWeight(data.weight);
		setBones(data.bones);
		setHeaderDate(`${new Date(data.when).getMonth() + 1}.${new Date(data.when).getDate()}.${new Date(data.when).getFullYear()}`);
		setDate(new Date(data.when));
	}, []);

	useEffect(() => {
		async function loadData() {
			if (logId) {
				const response = await api.get(`/body/log/specific/${logId}`);
				setLogData(response.data);
				handleData(response.data);
			}
		}
		loadData();
	}, [logId]);

	const { addToast } = useToast();

	const handleDelete = useCallback((e) => {
		e.preventDefault()
		async function editFood() {
			await api.delete(`/body/log/specific/${logData.id}`);

			addToast({
				type: 'success',
				title: 'Deleted log with success',
			});

			router.push(`/body`);
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
    	<AnimatePresence>
			{showConfirmation &&
				<ConfirmActionModal
				title="Confirm deletion"
				buttonTextConfirmation={'DELETE'}
				buttonColorConfirmation={'red'}
				buttonTextCancel={'CANCEL'}
				setState={setShowConfirmation}
				handleConfirmation={handleDelete} />
			}
			</AnimatePresence>
			<Container>
				<Header>
					<div>
						<h1>{headerDate ? headerDate : <Skeleton height={30} width={200} />}</h1>
					</div>
				</Header>
				<Macros>
					<Macro macro="carb">
						<div>
							<h4>Muscle</h4>
							<span>{muscle ? muscle : '0'}</span>
						</div>
						<progress id="muscle" value={muscle ? muscle : '0'} max={user ? user.muscle : '0'}>30%</progress>
					</Macro>
					<Macro macro="protein">
						<div>
							<h4>Protein</h4>
							<span>{water ? water : '0'}</span>
						</div>
						<progress id="water" value={water ? water : '0'} max={user ? user.water : '0'}>30%</progress>
					</Macro>
					<Macro macro="fat">
						<div>
							<h4>Fat</h4>
							<span>{fat ? fat : '0'}</span>
						</div>
						<progress id="fat" value={fat ? fat : '0'} max={user ? user.fat : '0'}>30%</progress>
					</Macro>
				</Macros>
				<Calories>
					<div>
						<h4>Weight</h4>
						<span>{weight ? weight : '0'}</span>
					</div>
					<progress id="weight" value={weight ? weight : '0'} max={user ? user.weight : '0'}>30%</progress>
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
						<Button fullWidth type="submit" color="yellow">EDIT</Button>
					</Form>
				</Details>
				<Footer>
					<button type="button" onClick={handleConfirmation}>
						<DeleteIcon />
					</button>
				</Footer>
			</Container>
		</WholePageTransition>
		</>
	);
}

export const getServerSideProps = withSSRAuth(async ctx => {
	return {
		props: {}
	}
})
