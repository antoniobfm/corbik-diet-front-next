import WholePageTransition from "@/components/WholePageTransition";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import {api} from "@/services/apiClient";
import { Container, Header, CreateButton, Menu } from "@/styles/pages/food/food";
import { SettingsIcon, Footer } from "@/styles/pages/log/edit/edit";
import { Floating } from "@/styles/pages/food/search";
import addZeroBefore from "@/utils/addZeroBefore";
import toFixedNumber from "@/utils/formatNumbers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import CardMessage from "@/components/Card/CardMessage";
import Head from "next/head";
import { useLog } from "@/hooks/logs";
import { Details } from "@/components/Card/Details";
import { useDispatch } from "react-redux";
import { logFood } from "@/redux/Food/diet.actiont";
import MacrosAndMicros from "@/modules/food/food/MacrosAndMicros";
import Summary from "@/modules/food/food/Summary";

interface ICreateFoodLog {
	food_id: string;
	//
	name: string;
	unit_type: string;
	amount: number;
	//
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	//
	when: string;
}

interface IUnit {
	id: string;
	abbreviation: string;
	amount: number;
	name: string;
	property: string;
	unit_system: string;
}

interface IFood {
	food_id: string;
	name: string;
	amount: number;
	//
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	//
	units: IUnit[];
	when: Date;
}

export default function Food() {
	const [foodData, setFoodData] = useState<any>([]);
	const [foodHistory, setFoodHistory] = useState<any>([]);

	const [selectedUnitType, setSelectedUnitType] = useState<IUnit & { amount: number }>();

	const [amount, setAmount] = useState('');
	const [carbs, setCarbs] = useState(0);
	const [prots, setProts] = useState(0);
	const [fats, setFats] = useState(0);
	const [calories, setCalories] = useState(0);
	const [ingredients, setIngredients] = useState<any[] | null>([]);

	const [date, setDate] = useState<Date>(new Date());

	const router = useRouter();

	const foodId = router.query.slug;

	const dispatch = useDispatch();

	const handleData = useCallback((data: any) => {
		setFoodData(data);
		setSelectedUnitType(data.units[0]);
		setAmount(data.units[0].amount);

		const tempFoodLogs = [];

		data.foodLogs.map(log => {
			tempFoodLogs.push({
				when: format(new Date(log.when), 'dd/MM'),
				amount: log.amount,
			});
		});

		console.log(tempFoodLogs);

		setFoodHistory(tempFoodLogs);

		setIngredients(data.ingredients);
		setFats(toFixedNumber(parseFloat(data.units[0].amount) * data.fats / data.units[0].amount, 2, 10));
		setCarbs(toFixedNumber(parseFloat(data.units[0].amount) * data.carbohydrates / data.units[0].amount, 2, 10));
		setProts(toFixedNumber(parseFloat(data.units[0].amount) * data.proteins / data.units[0].amount, 2, 10));
		setCalories(toFixedNumber(parseFloat(data.units[0].amount) * data.calories / data.units[0].amount, 2, 10));
	}, []);

	useEffect(() => {
		async function loadData() {
			if (foodId) {
				const response = await api.get(`/food-library/food/${foodId}`);
				console.log('aAAAAAAAAAA');
				console.log(response.data);
				handleData(response.data);
			}
		}
		loadData();
	}, [foodId]);

	const handleSubmit = useCallback((e) => {
		e.preventDefault()
		const food: ICreateFoodLog = {
			food_id: foodData.id,
			name: foodData.name,
			unit_type: selectedUnitType.id,
			amount: parseFloat(amount),
			carbohydrates: carbs,
			proteins: prots,
			fats: fats,
			calories: calories,
			when: date,
		};

		dispatch(logFood(food));

		router.push(`/diet`);
	}, [foodData, carbs, prots, fats, calories, date, amount]);

	useEffect(() => {
		if (selectedUnitType) {
			setFats(toFixedNumber(parseFloat(amount) * foodData.fats / selectedUnitType.amount, 2, 10));
			setCarbs(toFixedNumber(parseFloat(amount) * foodData.carbohydrates / selectedUnitType.amount, 2, 10));
			setProts(toFixedNumber(parseFloat(amount) * foodData.proteins / selectedUnitType.amount, 2, 10));
			setCalories(toFixedNumber(parseFloat(amount) * foodData.calories / selectedUnitType.amount, 2, 10));

			if (ingredients && foodData.ingredients && foodData.ingredients.length >= 1) {
				const newIngredients = foodData.ingredients.map((item, index) => {
					return {
						...item,
						amount: toFixedNumber(parseFloat(amount) * item.amount / selectedUnitType.amount, 2, 10)
					}
				})

				setIngredients(newIngredients);
			}
		}
	}, [foodData, amount, selectedUnitType]);

	// Auto Focus on search bar
	let inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	function getSelectedUnit() {
		var d = document.getElementById("select_amount").value;
		setSelectedUnitType(foodData.units[d]);
		setAmount(foodData.units[d].amount);
	}

	if (foodId) {
		return (
			<>
				<Head>
					<meta name="description" key="description" content={`${foodData.name} | Nutrition Facts: Carbs: ${carbs ? carbs : '0'}, Prot: ${prots ? prots : '0'}, Fats: ${fats ? fats : '0'}, Calories: ${calories ? calories : '0'}${!!ingredients && ingredients.length >= 1 ? ` | Ingredients:${ingredients.map(item => ` ${item.name}`)}` : ''} | Micronutri...`}/>
					<title>{foodData.name} - {foodData.brand} | Nutrition Facts | Corbik</title>
				</Head>
				<Container>
					<Header>
						<h3>{foodData.brand}</h3>
						<h1>{foodData.name}</h1>
					</Header>
					<MacrosAndMicros
						carbs={carbs}
						prots={prots}
						fats={fats}
						calories={calories}
					/>
					<Summary setDate={setDate} date={date} />
					<Details hasContent={!!ingredients} data={ingredients} name="Ingredients" dataName="name" />
					<Details hasContent={!!foodHistory} data={foodHistory} name="History" dataName="when" />
					<Floating>
						<div>
							<Menu>
								<div className="amount">
									<input
										type="number"
										ref={inputRef}
										placeholder="Amount"
										defaultValue={amount}
										value={amount}
										onChange={e => setAmount(e.target.value)}
										step="0.01"
									/>
								</div>
								<div className="unit">
									<select name="select" id="select_amount" onChange={getSelectedUnit}>
										{foodData && foodData.units && foodData.units.length >= 1 && foodData.units.map((item, index) => <option value={index}>{item.name[0].toUpperCase() + item.name.slice(1)}s</option>)}
									</select>
								</div>
								<CreateButton onClick={handleSubmit}>LOG IT</CreateButton>
							</Menu>
						</div>
					</Floating>
					<Footer>
						{foodData.isOwner &&
							<button type="button" onClick={() => { router.push(`/food/edit/${foodData.id}`) }}>
								<SettingsIcon />
							</button>
						}
					</Footer>
				</Container>
			</>
		);
	} else {
		return <p>Loading...</p>;
	}
}
