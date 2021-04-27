import { Container } from "@/styles/components/Logs/Body/VerticalScroll/VerticalScrollCard";
import { Log } from "@/styles/components/Ingredients/Food";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toFixedNumber from '@/utils/formatNumbers';

interface ILog {
	id: number;
	name: string;
	calories: string;
	carbohydrates: string;
	fats: string;
	proteins: string;
	amount: string;
	amount_type: string;

	hour: string | number;
	minute: string | number;

	food_id: string;
	user_id: string;
	when: Date;
	created_at: Date;
	updated_at: Date;
}

interface IProps {
	data: any;
	handleUpdateProjection: any;
	index: number;
}

export default function Food({ data, handleUpdateProjection, index }: IProps) {
	const {carbohydrates, proteins, fats, name, brand, calories} = data;
	const [projected, setProject] = useState({carbohydrates, proteins, fats, calories, amount: data.current_unit.amount, abbreviation: data.current_unit.abbreviation});

	const router = useRouter();

	const handleAmountChange = useCallback((value: string) => {
		const newProjection = projected;

		newProjection.amount = parseInt(value, 10);
		newProjection.carbohydrates = carbohydrates / data.current_unit.amount * parseInt(value, 10);
		newProjection.proteins = proteins / data.current_unit.amount * parseInt(value, 10);
		newProjection.fats = fats / data.current_unit.amount * parseInt(value, 10);
		newProjection.calories = calories / data.current_unit.amount * parseInt(value, 10);

		if(parseInt(value, 10) >= 1 || newProjection.amount === 0) {
			setProject({...newProjection, ...projected});
		} else {
			setProject({carbohydrates, proteins, fats, calories, amount: data.current_unit.amount, abbreviation: data.current_unit.abbreviation})
		}

		handleUpdateProjection(newProjection, index);
	}, [projected]);

	return (
		<Container
			onClick={() => {}}
		>
			<Log key={data.id}>
				<div className="name-brand-container">
					<div className="name-brand">
						<h5>{brand}</h5>
						<h4>{name}</h4>
					</div>
				</div>
				<div className="macros">
					<h5>{toFixedNumber(projected.calories, 2, 10)}kcal</h5>
					<h5>C{toFixedNumber(projected.carbohydrates, 2, 10)}   P{toFixedNumber(projected.proteins, 2, 10)}   F{toFixedNumber(projected.fats, 2, 10)}</h5>
				</div>
				<div className="quantity">
					<input type="number" placeholder={projected.amount + projected.abbreviation} onChange={(e) => handleAmountChange(e.target.value)} />
				</div>
			</Log>
		</Container>
  )
}
