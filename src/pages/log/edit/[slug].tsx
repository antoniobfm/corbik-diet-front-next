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
import CardMessage from "@/components/Card/CardMessage";
import { useLog } from "@/hooks/logs";

export default function Edit(food: string) {
	const router = useRouter();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [logData, setLogData] = useState<any>();
	const [foodHistory, setFoodHistory] = useState<any>([]);

	const [amountTemp, setAmount] = useState('');
	const [carbs, setCarbs] = useState<number | null>(0);
	const [prots, setProts] = useState<number | null>(0);
	const [fats, setFats] = useState<number | null>(0);
	const [calories, setCalories] = useState<number | null>(0);
	const [ingredients, setIngredients] = useState<any[] | null>([]);

	const [date, setDate] = useState<Date>(new Date());

	const { user, loading } = useAuth();

	const { updateLog } = useLog();

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
				amount: log.amount
			});
		});

		setFoodHistory(tempFoodLogs);
		console.log(data.food.foodLogs);
		const { amount } = data;

		setIngredients(data.ingredients);
		setFats(toFixedNumber(parseFloat(amount) * data.fats / amount, 2, 10));
		setCarbs(toFixedNumber(parseFloat(amount) * data.carbohydrates / amount, 2, 10));
		setProts(toFixedNumber(parseFloat(amount) * data.proteins / amount, 2, 10));
		setCalories(toFixedNumber(parseFloat(amount) * data.calories / amount, 2, 10));
		setDate(new Date(data.when));
		setAmount(amount % 1 === 0 ? `${parseInt(amount, 10)}` : `${amount}`);
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
			setFats(toFixedNumber(parseFloat(amountTemp) * logData.fats / logData.amount, 2, 10));
			setCarbs(toFixedNumber(parseFloat(amountTemp) * logData.carbohydrates / logData.amount, 2, 10));
			setProts(toFixedNumber(parseFloat(amountTemp) * logData.proteins / logData.amount, 2, 10));
			setCalories(toFixedNumber(parseFloat(amountTemp) * logData.calories / logData.amount, 2, 10));

			if(ingredients && logData.ingredients && logData.ingredients.length >= 1) {
				const newIngredients = logData.ingredients.map((item, index) => {
					return {
						...item,
						amount: toFixedNumber(parseFloat(amountTemp) * logData.ingredients[index].amount / logData.amount, 2, 10)
					}
				})

				setIngredients(newIngredients);
			}

		}
	}, [logData, amountTemp]);

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
		updateLog({id: logData.id, amount: amountTemp, when: date})
	}, [logData, carbs, prots, fats, calories, date, amountTemp]);

	// function getSelectedUnit() {
  //   var d = document.getElementById("select_amount").value;
	// 	setSelectedUnitType(d);
	// }

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
										defaultValue={amountTemp}
										onChange={e => setAmount(e.target.value)}
										step="0.01"
									/>
								</div>
								<div className="unit">
									{/* <select name="select" id="select_amount" onChange={getSelectedUnit}>
										{logData && logData.units.length >= 1 && logData.units.map(item => <option value={item.id}>{item.name[0].toUpperCase() + item.name.slice(1)}s</option>)}
									</select>									 */}
									<select name="select" id="select_amount">
										{logData && <option value={logData.current_unit.id}>{logData.current_unit.name[0].toUpperCase() + logData.current_unit.name.slice(1)}s</option>}
									</select>
								</div>
								<EditButton onClick={handleEdit}>EDIT</EditButton>
							</div>
						</StaticMenu>
					</Details>
					<Details>
						<div className="header">
							<h3>Ingredients</h3>
						</div>
						<div className="history__container">
							{ingredients && ingredients.length >= 1 ? ingredients.map(ingredient =>
								<div className="history__item">
									<div className="history__item__title">
										{ingredient.name}
									</div>
									<div className="history__item__subtitle">
										{ingredient.amount}
									</div>
								</div>
							) :
							(
								<CardMessage borderBottom={false}>
									<h4>Doesn't have ingredients</h4>
								</CardMessage>
							)
							}
						</div>
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
