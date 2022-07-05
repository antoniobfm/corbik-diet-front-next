import Input from "@/components/FormComponents/Input";
import WholePageTransition from "@/components/WholePageTransition";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import {api} from "@/services/apiClient";

import { Header } from "@/styles/pages/food/food";
import { Details } from "@/styles/pages/log/edit/slug/settings";
import { Container, Footer } from "@/styles/pages/log/edit/edit";
import toFixedNumber from "@/utils/formatNumbers";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import Button from "@/components/FormComponents/Button";
import SpecialDropdownModal from "@/components/Modals/SpecialDropdownModal";
import Head from "next/head";

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

export default function EditLogSettings(food: string) {
	const router = useRouter();

	const [showConfirmation, setShowConfirmation] = useState(false);

	const [logData, setLogData] = useState<any>();

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
		setFats(toFixedNumber(parseFloat(data.quantity_amount) * data.fats / data.quantity_amount, 2, 10));
		setCarbs(toFixedNumber(parseFloat(data.quantity_amount) * data.carbohydrates / data.quantity_amount, 2, 10));
		setProts(toFixedNumber(parseFloat(data.quantity_amount) * data.proteins / data.quantity_amount, 2, 10));
		setCalories(toFixedNumber(parseFloat(data.quantity_amount) * data.calories / data.quantity_amount, 2, 10));
		setDate(new Date(data.when));
		setAmount(`${data.quantity_amount}`);
	}, []);

	useEffect(() => {
		async function loadData() {
			if (logId) {
				const response = await api.get(`/food/log/specific/${logId}`);
				console.log(response.data);
				setLogData(response.data);
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
				<SpecialDropdownModal setState={setShowConfirmation} logData={logData} />
			}
			<Head>
				<title>Log Settings | Corbik</title>
				<meta name="robots" content="noindex" />
				<meta name="googlebot" content="noindex" />
			</Head>
			</AnimatePresence>
				<Container>
					<Header>
						<h1>Log Settings</h1>
					</Header>
					<Details>
						<div className="header">
							<h3>Source</h3>
							{/* <button onClick={() => {router.push('/food/create')}}>
								<FiSettings />
							</button> */}
						</div>
						<Form onSubmit={() => { }}>
							<div className="Special__Select" onClick={() => setShowConfirmation(true)}>
								<div>
									<h3>{logData ? logData.name : <Skeleton height={30} width={200} />}</h3>
									<h5>{logData ? logData.brand : <Skeleton height={20} width={90} />}</h5>
								</div>
								<div className="Special__Select__DropdownIndicator">
									<FiChevronDown />
								</div>
							</div>
							<div className="Special__Select">
								<div>
									<h3>Version {logData && logData.foodVersion && logData.foodVersion.version}</h3>
									<h5>{logData && logData.foodVersion && logData.foodVersion.id === logData.food.food_version_default ? 'Default' : ''}</h5>
								</div>
								<div className="Special__Select__DropdownIndicator">
									<FiChevronDown />
								</div>
							</div>
							<Button type="submit" disabled fullWidth>SAVE</Button>
						</Form>
					</Details>
					<Footer>
						<button type="button" onClick={() => {router.back()}}>
							<FiChevronLeft />
						</button>
					</Footer>
				</Container>
			</WholePageTransition>
		</>
	);
}
