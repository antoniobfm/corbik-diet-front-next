import Input from "@/components/FormComponents/Input";
import WholePageTransition from "@/components/WholePageTransition";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import {api} from "@/services/apiClient";
import { Container, Header, CreateButton, Menu } from "@/styles/pages/food/food";
import { Details, SettingsIcon, Footer } from "@/styles/pages/log/edit/edit";
import { Floating } from "@/styles/pages/food/search";
import { Calories, Macro, Macros } from "@/styles/pages/Home";
import addZeroBefore from "@/utils/addZeroBefore";
import toFixedNumber from "@/utils/formatNumbers";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import * as Yup from 'yup';
import Button from "@/components/FormComponents/Button";
import Head from "next/head";
import { withSSRAuth } from "@/utils/withSSRAuth";

interface IUpdateFood {
	food_id: string;
	name: string;
	brand: string;
	barcode: string;
}

interface IUpdateFoodForm {
	name: string;
	brand: string;
	barcode: string;
}

export default function Food() {
	const formRef = useRef<FormHandles>(null);

	const [foodData, setFoodData] = useState<any>([]);
	const [foodHistory, setFoodHistory] = useState<any>([]);
	const [amount, setAmount] = useState('');
	const [carbs, setCarbs] = useState(0);
	const [prots, setProts] = useState(0);
	const [fats, setFats] = useState(0);
	const [calories, setCalories] = useState(0);

	const [date, setDate] = useState<Date>(new Date());

	const router = useRouter();

	const foodId = router.query.slug;

	const { addToast } = useToast();

	const handleData = useCallback((data: any) => {
		setFoodData(data);

		const tempFoodLogs = [];
		data.foodLogs.map(log => {
			tempFoodLogs.push({
				when: format(new Date(log.when), 'dd/MM'),
				amount: log.amount
			});
		});

		setFoodHistory(tempFoodLogs);

		setAmount(data.amount);
		setFats(toFixedNumber(parseFloat(data.amount) * data.fats / data.amount, 2, 10));
		setCarbs(toFixedNumber(parseFloat(data.amount) * data.carbohydrates / data.amount, 2, 10));
		setProts(toFixedNumber(parseFloat(data.amount) * data.proteins / data.amount, 2, 10));
		setCalories(toFixedNumber(parseFloat(data.amount) * data.calories / data.amount, 2, 10));
	}, []);

	useEffect(() => {
		async function loadData() {
			if (foodId) {
				const response = await api.get(`/food-library/food/${foodId}`);
				console.log(response.data);
				handleData(response.data);
			}
		}
		loadData();
	}, [foodId]);

	const handleSubmit = useCallback(async (data: IUpdateFoodForm) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				name: Yup.string().required('Name is required'),
				brand: Yup.string().optional(),
				barcode: Yup.string().optional(),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const food: IUpdateFood = {
				food_id: foodData.id,
				name: data.name,
				brand: data.brand,
				barcode: data.barcode
			};

			console.log(food);

			await api.put(`/food-library`, food);

			addToast({
				type: 'success',
				title: 'Food updated with success',
			});

			router.back();
		} catch (err) {
			console.log(err);

			addToast({
				type: 'error',
				title: 'Something went wrong',
			});
		}
	}, [foodData, carbs, prots, fats, calories, date, amount]);

	useEffect(() => {
		setFats(toFixedNumber(parseFloat(amount) * foodData.fats / foodData.amount, 2, 10));
		setCarbs(toFixedNumber(parseFloat(amount) * foodData.carbohydrates / foodData.amount, 2, 10));
		setProts(toFixedNumber(parseFloat(amount) * foodData.proteins / foodData.amount, 2, 10));
		setCalories(toFixedNumber(parseFloat(amount) * foodData.calories / foodData.amount, 2, 10));
	}, [foodData, amount]);

	if (foodId) {
		return (
			<WholePageTransition>
				<Head>
					<title>{foodData.name} Settings | Corbik</title>
					<meta name="robots" content="noindex" />
					<meta name="googlebot" content="noindex" />
				</Head>
				<Container>
				<Header>
					<h1>Edit Food</h1>
				</Header>
				<Details>
					<Form
						ref={formRef}
						onSubmit={handleSubmit}
						initialData={{ name: foodData.name, brand: foodData.brand, barcode: foodData.barcode }}>
						<div className="header">
							<h3>Summary</h3>
						</div>
						<Input
							name="name"
							labelName="Name"
							type="input"
						/>
						<div className="form__two__columns ">
							<Input
								name="brand"
								labelName="Brand"
								type="input"
							/>
							<Input
								name="barcode"
								labelName="Barcode"
								type="input"
							/>
						</div>
						<Button type="submit" color="yellow" fullWidth>UPDATE</Button>
					</Form>
				</Details>
				<Details>
					<div className="header">
						<h3>Default Version</h3>
					</div>
					<div className="Special__Select">
						<div>
							<h3>{foodData.foodVersionDefault ? `Version ${foodData.foodVersionDefault.version}` : 'No version'}</h3>
							<h5>Default</h5>
						</div>
						<div className="Special__Select__DropdownIndicator">
							<FiChevronDown />
						</div>
					</div>
					<Button disabled onClick={() => {/* router.push(`/food/edit/new-version/${foodData.id}`)*/}} fullWidth>CREATE NEW VERSION</Button>
				</Details>
				<Footer>
					<button type="button" onClick={() => {router.back()}}>
						<FiChevronLeft />
					</button>
				</Footer>
				</Container>
			</WholePageTransition>
		);
	} else {
		return <p>Loading...</p>;
	}
}

export const getServerSideProps = withSSRAuth(async ctx => {
	return {
		props: {}
	}
})
