import Input from "@/components/FormComponents/Input";
import WholePageTransition from "@/components/WholePageTransition";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import api from "@/services/api";
import { Header } from "@/styles/pages/food/food";
import { Calories, Macro, Macros } from "@/styles/pages/Home";
import { Container, EditButton, StaticMenu, Details, Footer, DeleteIcon, SettingsIcon } from "@/styles/pages/log/edit/edit";
import addZeroBefore from "@/utils/addZeroBefore";
import toFixedNumber from "@/utils/formatNumbers";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { AnimatePresence } from "framer-motion";
import History from '@/components/Card/History';
import { format } from "date-fns";

interface ILog {
	id: number;
	name: string;
	calories: number;
	carbohydrates: number;
	fats: number;
	proteins: number;
	quantity_amount: number;
	quantity_type: string;
	when: Date;
	food_id: string;
	created_at: Date;
	updated_at: Date;
	user_id: string;
}

export default function Edit(food: string) {
	const router = useRouter();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [logData, setLogData] = useState<any>();
	const [foodHistory, setFoodHistory] = useState<any>([]);

	const [amount, setAmount] = useState('');
	const [carbs, setCarbs] = useState<number | null>(0);
	const [prots, setProts] = useState<number | null>(0);
	const [fats, setFats] = useState<number | null>(0);
	const [calories, setCalories] = useState<number | null>(0);

	const [date, setDate] = useState<Date>(new Date());

	const { user, loading } = useAuth();

	const logId = router.query.slug;

	const handleConfirmation = useCallback((e) => {
		e.preventDefault();

		setShowConfirmation(!showConfirmation);
	}, [showConfirmation]);

	const handleData = useCallback((data: any) => {

		const tempFoodLogs = [];
		data.food.foodLogs.map(log => {
			tempFoodLogs.push({
				when: format(new Date(log.when), 'dd/MM'),
				amount: log.quantity_amount
			});
		});

		setFoodHistory(tempFoodLogs);
		console.log(data.food.foodLogs);
		const { quantity_amount } = data;

		setFats(toFixedNumber(parseFloat(quantity_amount) * data.fats / quantity_amount, 2, 10));
		setCarbs(toFixedNumber(parseFloat(quantity_amount) * data.carbohydrates / quantity_amount, 2, 10));
		setProts(toFixedNumber(parseFloat(quantity_amount) * data.proteins / quantity_amount, 2, 10));
		setCalories(toFixedNumber(parseFloat(quantity_amount) * data.calories / quantity_amount, 2, 10));
		setDate(new Date(data.when));
		setAmount(quantity_amount % 1 === 0 ? `${parseInt(quantity_amount, 10)}` : `${quantity_amount}`);
	}, []);

	useEffect(() => {
		async function loadData() {
			if (logId) {
				const response = await api.get(`/food/log/specific/${logId}`);
				setLogData(response.data);
				console.log(response.data);
				handleData(response.data);
			}
		}
		loadData();
	}, [logId]);

	useEffect(() => {
		if (logData) {
			setFats(toFixedNumber(parseFloat(amount) * logData.fats / logData.quantity_amount, 2, 10));
			setCarbs(toFixedNumber(parseFloat(amount) * logData.carbohydrates / logData.quantity_amount, 2, 10));
			setProts(toFixedNumber(parseFloat(amount) * logData.proteins / logData.quantity_amount, 2, 10));
			setCalories(toFixedNumber(parseFloat(amount) * logData.calories / logData.quantity_amount, 2, 10));
		}
	}, [logData, amount]);

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

	const handleEdit = useCallback((e) => {
		e.preventDefault()
		async function editFood() {
			const log = {
				id: logData.id,
				brand: logData.brand,
				quantity_amount: parseFloat(amount),
				carbohydrates: carbs,
				proteins: prots,
				fats: fats,
				calories: calories,
				when: date,
			};
			console.log(date);

			await api.put(`/food/log`, log);

			addToast({
				type: 'success',
				title: 'Modified your log with success',
			});

			router.push(`/`);
		}

		editFood();
	}, [logData, carbs, prots, fats, calories, date, amount]);

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
						<h3>{logData ? logData.food?.brand : <Skeleton height={12} width={90} style={{marginTop: -30}} />}</h3>
						<h1>{logData ? logData.name : <Skeleton height={36} width={200} />}</h1>
					</Header>
					<Macros>
						<Macro macro="carb">
							<div>
								<h4>Carbs</h4>
								<span>{carbs ? carbs : '0'}</span>
							</div>
							<progress id="carbs" value={carbs ? carbs : '0'} max={user ? user.carbohydrates : '0'}>30%</progress>
						</Macro>
						<Macro macro="protein">
							<div>
								<h4>Protein</h4>
								<span>{prots ? prots : '0'}</span>
							</div>
							<progress id="prots" value={prots ? prots : '0'} max={user ? user.proteins : '0'}>30%</progress>
						</Macro>
						<Macro macro="fat">
							<div>
								<h4>Fat</h4>
								<span>{fats ? fats : '0'}</span>
							</div>
							<progress id="fats" value={fats ? fats : '0'} max={user ? user.fats : '0'}>30%</progress>
						</Macro>
					</Macros>
					<Calories>
						<div>
							<h4>Calories</h4>
							<span>{calories ? calories : '0'}</span>
						</div>
						<progress id="calories" value={calories ? calories : '0'} max={user ? user.calories : '0'}>30%</progress>
					</Calories>
					<Details>
						<div className="header">
							<h3>Summary</h3>
							{/* <button onClick={() => {router.push('/food/create')}}>
								<FiSettings />
							</button> */}
						</div>
						<Form onSubmit={() => { }}>
							<Input
								name="when"
								labelName="Date"
								type="datetime-local"
								value={`${date && new Date(date).getFullYear()}-${addZeroBefore(new Date(date).getMonth() + 1)}-${addZeroBefore(new Date(date).getDate())}T${addZeroBefore(new Date(date).getHours())}:${addZeroBefore(new Date(date).getMinutes())}`}
								onChange={e => setDate(new Date(e.target.value))} />
						</Form>

						<StaticMenu>
							<div>
								<div className="amount">
									<input
										type="number"
										placeholder="Amount"
										defaultValue={amount}
										onChange={e => setAmount(e.target.value)}
										step="0.01"
									/>
								</div>
								<div className="unit">
									<select name="select">
										<option value="gram">Grams</option>
									</select>
								</div>
								<EditButton onClick={handleEdit}>EDIT</EditButton>
							</div>
						</StaticMenu>
					</Details>
					<History foodHistory={foodHistory} />
					<Footer>
						<button type="button" onClick={handleConfirmation}>
							<DeleteIcon />
						</button>
						<button type="button" onClick={() => {router.push(`/log/edit/${logId}/settings`)}}>
							<SettingsIcon />
						</button>
					</Footer>
				</Container>
			</WholePageTransition>
		</>
	);
}
