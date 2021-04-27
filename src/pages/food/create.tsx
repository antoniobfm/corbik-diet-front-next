import Input from "@/components/FormComponents/Input";
import api from "@/services/api";
import { Container, FormContainer, Icon, Menu, CreateButton, CreateFoodType } from "@/styles/pages/food/create";
import { Header } from "@/styles/pages/food/search";
import { Floating } from "@/styles/pages/food/search";
import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import getValidationErrors from "@/utils/getValidationErrors";
import * as Yup from 'yup';
import { useToast } from "@/hooks/toast";
import WholePageTransition from "@/components/WholePageTransition";
import SelectIngredientModal from '@/components/Modals/SelectIngredientModal';
import SelectUnitModal from '@/components/Modals/SelectUnitModal';
import Food from "@/components/Ingredients/Food";
import Unit from '@/components/FormComponents/Unit';
import { AnimatePresence } from "framer-motion";

interface IFoodFormData {
	name: string;
	brand?: string;
	barcode?: string;
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
	amount: string;
	quantity_type: string;
}

export interface IUnit {
	id: string;
	name: string;
	abbreviation: string;
	factor: string;
	property: string;
	unit_system: string;
}

interface IIngredient {
	food_version_source: string;
	food_unit: string;
	amount: number;
}

interface IFood {
	name: string;
	brand?: string;
	barcode?: string;
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	is_recipe: boolean;
	units: Array<IUnit & {amount: number}>;
	ingredients?: IIngredient[];
}

export default function Create() {
	const [showUnitSelector, setShowUnitSelector] = useState(false);
	const [showAddUnit, setShowAddUnit] = useState(false);
	const [selectedUnit, setSelectedUnit] = useState({ index: 0, id: '', name: '', amount: 0 });
	const [units, setUnits] = useState<Array<IUnit & {amount: number}>>([{ id: "b57322d7-18ef-402d-830b-86ed92bac556", name: "gram", abbreviation: "g", factor: "0.00",  property: "mass", unit_system: "metric", amount: 30 }]);

	const [showIngredientSelector, setShowIngredientSelector] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [ingredientsProjection, setIngredientsProjection] = useState<any[]>([]);
	const [projection, setProjection] = useState({ carbohydrates: 0, proteins: 0, fats: 0, calories: 0 });

	const [type, setType] = useState('recipe');
	const router = useRouter();
	const { barcode } = router.query;

	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: IFoodFormData) => {
			try {
				formRef.current?.setErrors({});

				const ingredientsFormmated = ingredientsProjection.map(item => {
					return { food_version_source: item.food_version_source, amount: item.amount, food_unit: item.food_unit, id: item.id }
				})

				const schema = Yup.object().shape({
					name: Yup.string().required('Email is required'),
					brand: Yup.string().optional(),
					barcode: Yup.string().optional(),
					carbohydrates: Yup.string().required('Carbohydrates is required'),
					proteins: Yup.string().required('Proteins is required'),
					fats: Yup.string().required('Fats is required'),
					calories: Yup.string().required('Calories is required')
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const food: IFood = {
					name: data.name,
					brand: data?.brand,
					barcode: data?.barcode,
					carbohydrates: parseFloat(data.carbohydrates),
					proteins: parseFloat(data.proteins),
					fats: parseFloat(data.fats),
					calories: parseFloat(data.calories),
					units: units,
					is_recipe: type === 'recipe',
					ingredients: ingredientsFormmated,
				};

				console.log(food);

				const response = await api.post(`/food-library`, food);

				addToast({
					type: 'success',
					title: `Added ${data.name} to your library`,
				});

				router.push(`/food/${response.data.id}`);

			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formRef.current?.setErrors(errors);
					console.log(errors);

					addToast({
						type: 'error',
						title: `Something went wrong`
					});

					return;
				}
			}
		},
		[units, ingredientsProjection, type],
	);

	useEffect(() => {
		let carbohydrates = 0;
		let proteins = 0;
		let fats = 0;
		let calories = 0;

		ingredientsProjection.map(item => {
			carbohydrates = carbohydrates + parseInt(item.carbohydrates, 10);
			proteins = proteins + parseInt(item.proteins, 10);
			fats = fats + parseInt(item.fats, 10);
			calories = calories + parseInt(item.calories, 10);
		});

		setProjection({ carbohydrates, proteins, fats, calories })
		console.log(ingredients);
	}, [ingredientsProjection]);

	const handleChangeUnit = useCallback(({data, index}) => {
		setShowUnitSelector(false);
		const oloco = units;

		oloco[selectedUnit.index] = {...data, amount: selectedUnit.amount};

		setUnits(oloco);
	}, [units, selectedUnit]);

	const handleAddUnit = useCallback(({data, index}) => {
		setShowAddUnit(false);
		const newUnit = units;
		newUnit.push({...data, amount: 0});

		setUnits(newUnit);
	}, [units]);

	const handleChange = useCallback(({value, index}) => {
		const oloco = [...units];

		oloco[index] = {...oloco[index], amount: value};

		setUnits(oloco);
	}, [units])

	const handleUpdateProjection = useCallback((value, index) => {
		const newProjection = ingredientsProjection;
		const ingredient = ingredients[index];

		console.log(typeof value.amount, value.amount.length, value.amount.length >= 1);

		if (value.amount >= 1 || value.amount === 0) {
			newProjection[index].amount = value.amount;
			newProjection[index].carbohydrates = ingredient.carbohydrates / ingredient.current_unit.amount * value.amount;
			newProjection[index].proteins = ingredient.proteins / ingredient.current_unit.amount * value.amount;
			newProjection[index].fats = ingredient.fats / ingredient.current_unit.amount * value.amount;
			newProjection[index].calories = ingredient.calories / ingredient.current_unit.amount * value.amount;

			setIngredientsProjection([...newProjection]);
		} else {
			newProjection[index].carbohydrates = ingredient.carbohydrates;
			newProjection[index].proteins = ingredient.proteins;
			newProjection[index].fats = ingredient.fats;
			newProjection[index].calories = ingredient.calories;

			setIngredientsProjection([...newProjection]);
		}
		console.log(ingredientsProjection);
		console.log('okokoko')
		// console.log(ingredients);
	}, [ingredientsProjection, ingredients]);

	const handleAddIngredient = useCallback((food) => {
		const { carbohydrates, proteins, fats, calories } = food;
		const { amount } = food.current_unit;
		const food_version_id = food.foodVersionDefault.id;
		const food_unit_id = food.foodVersionDefault.units[0].id;
		const newIngredients = ingredients;
		const newProjection = { carbohydrates, proteins, fats, calories, amount, food_version_source: food_version_id, food_unit: food_unit_id, id: food.id };

		newIngredients.push(food);

		setIngredientsProjection([...ingredientsProjection, newProjection]);

		setShowIngredientSelector(false);
	}, [ingredients, ingredientsProjection]);

	return (
		<WholePageTransition>
			<AnimatePresence>
			{showIngredientSelector &&
				<SelectIngredientModal setState={setShowIngredientSelector} handleAddIngredient={handleAddIngredient} />
			}
			</AnimatePresence>
			<AnimatePresence>
			{showUnitSelector &&
				<SelectUnitModal setState={setShowUnitSelector} handleChangeUnit={handleChangeUnit} />
			}
			</AnimatePresence>
			<AnimatePresence>
			{showAddUnit &&
				<SelectUnitModal setState={setShowAddUnit} handleChangeUnit={handleAddUnit} />
			}
			</AnimatePresence>
			<Container>
				<Header>
					<h1>Create Food</h1>
				</Header>
				<Form
					ref={formRef}
					onSubmit={handleSubmit}
					initialData={{ barcode: barcode }}
				>
					<FormContainer className="type">
						{/* <div className="header">
						<h3>Type</h3>
						<button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button>
					</div> */}
						<div className="type-container">
							<CreateFoodType type="button" selected={type === 'food'} onClick={() => setType('food')}>
								FOOD
						</CreateFoodType>
							<CreateFoodType type="button" selected={type === 'recipe'} onClick={() => setType('recipe')}>
								RECIPE
						</CreateFoodType>
						</div>
					</FormContainer>
					{type === 'recipe' &&
						<>
							<FormContainer>
								<div className="header">
									<h3>Summary</h3>
									{/* <button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button> */}
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

								<div className="form__three__columns">
									<Input
										name="carbohydrates"
										labelName="Carbohydrates"
										type="number"
										step="0.01"
										value={type === 'recipe' && projection.carbohydrates}
									/>
									<Input
										name="proteins"
										labelName="Proteins"
										type="number"
										step="0.01"
										value={type === 'recipe' && projection.proteins}
									/>
									<Input
										name="fats"
										labelName="Fats"
										type="number"
										step="0.01"
										value={type === 'recipe' && projection.fats}
									/>
								</div>

								<Input
									name="calories"
									labelName="Calories"
									type="number"
									step="0.01"
									value={type === 'recipe' && projection.calories}
								/>

								<Unit data={units[0]} inputPlaceholder="Amount (when done)" handleChange={handleChange} setSelectedUnit={setSelectedUnit} setShowUnitSelector={setShowUnitSelector} index={0} />
							</FormContainer>

							<FormContainer>
								<div className="header">
									<h3>Ingredients</h3>
									{/* <button onClick={() => {router.push('/food/create')}}>
								<FiSettings />
							</button> */}
								</div>
								<div className="ingredients-container">
									{ingredients.length >= 1 && ingredients.map((item, index) =>
										<Food key={`${item.id}${index}`} index={index} data={item} handleUpdateProjection={handleUpdateProjection} />
									)}
								</div>
								<div className="add-ingredient">
									<button type="button" onClick={() => setShowIngredientSelector(true)}>ADD INGREDIENT</button>
								</div>
							</ FormContainer>
						</>
					}
					{type === 'food' &&
					<>
						<FormContainer>
							<div className="header">
								<h3>Summary</h3>
								{/* <button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button> */}
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


							<div className="form__three__columns">
								<Input
									name="carbohydrates"
									labelName="Carbohydrates"
									type="number"
									step="0.01"
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

							<Unit data={units[0]} handleChange={handleChange} setSelectedUnit={setSelectedUnit} setShowUnitSelector={setShowUnitSelector} index={0} />
						</FormContainer>
						<FormContainer>
							<div className="header">
								<h3>Ingredients</h3>
								{/* <button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button> */}
							</div>
							<div className="ingredients-container">
								{ingredients.length >= 1 && ingredients.map((item, index) =>
									<Food key={`${item.id}${index}`} index={index} data={item} handleUpdateProjection={handleUpdateProjection} />
								)}
							</div>
							<div className="add-ingredient">
								<button type="button" onClick={() => setShowIngredientSelector(true)}>ADD INGREDIENT</button>
							</div>
						</ FormContainer>
					</>
					}
					<FormContainer>
						<div className="header">
							<h3>Units<span>ADVANCED</span></h3>
							{/* <button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button> */}
						</div>
						{units.length >= 1 && units.map((item, index) =>
							<Unit data={item} handleChange={handleChange} setSelectedUnit={setSelectedUnit} setShowUnitSelector={setShowUnitSelector} index={index} key={index} />
						)}
						<div className="add-ingredient">
							<button type="button" onClick={() => setShowAddUnit(true)}>ADD UNIT</button>
						</div>
					</FormContainer>

					<FormContainer>
						<div className="header">
							<h3>Vitamins<span>COMING SOON</span></h3>
							{/* <button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button> */}
						</div>
						<div className="form__three__columns">
							<Input
								name="vitaminA"
								labelName="A"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminB1"
								labelName="B1"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminB2"
								labelName="B2"
								type="number"
								step="0.01"
							/>
						</div>
						<div className="form__three__columns">
							<Input
								name="vitaminB3"
								labelName="B3"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminB5"
								labelName="B5"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminB6"
								labelName="B6"
								type="number"
								step="0.01"
							/>
						</div>
						<div className="form__three__columns">
							<Input
								name="vitaminB9"
								labelName="B9"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminB12"
								labelName="B12"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminC"
								labelName="C"
								type="number"
								step="0.01"
							/>
						</div>
						<div className="form__three__columns">
							<Input
								name="vitaminD"
								labelName="D"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminE"
								labelName="E"
								type="number"
								step="0.01"
							/>
							<Input
								name="vitaminK"
								labelName="K"
								type="number"
								step="0.01"
							/>
						</div>
					</FormContainer>
					<FormContainer>
						<div className="header">
							<h3>Minerals<span>COMING SOON</span></h3>
							{/* <button onClick={() => {router.push('/food/create')}}>
							<FiSettings />
						</button> */}
						</div>
						<div className="form__three__columns">
							<Input
								name="calcium"
								labelName="Calcium"
								type="number"
								step="0.01"
							/>
							<Input
								name="copper"
								labelName="Copper"
								type="number"
								step="0.01"
							/>
							<Input
								name="chrome"
								labelName="Chrome"
								type="number"
								step="0.01"
							/>
						</div>
						<div className="form__three__columns">
							<Input
								name="iron"
								labelName="Iron"
								type="number"
								step="0.01"
							/>
							<Input
								name="phosphorus"
								labelName="Phosphorus"
								type="number"
								step="0.01"
							/>
							<Input
								name="iodo"
								labelName="Iodo"
								type="number"
								step="0.01"
							/>
						</div>
						<div className="form__three__columns">
							<Input
								name="magnesium"
								labelName="Magnesium"
								type="number"
								step="0.01"
							/>
							<Input
								name="maganese"
								labelName="Maganese"
								type="number"
								step="0.01"
							/>
							<Input
								name="potassium"
								labelName="Potassium"
								type="number"
								step="0.01"
							/>
						</div>
						<div className="form__two__columns">
							<Input
								name="sodium"
								labelName="Sodium"
								type="number"
								step="0.01"
							/>
							<Input
								name="zinc"
								labelName="Zinc"
								type="number"
								step="0.01"
							/>
						</div>
					</FormContainer>

					<Floating>
						<Menu>
							<div className="back">
								<span onClick={() => router.back()}>
									<div className="icon">
										<Icon size={16} />
									</div>
								</span>
							</div>
							<CreateButton type="submit">CREATE</CreateButton>
						</Menu>
					</Floating>
				</Form>
			</Container>
		</WholePageTransition>
	)
}
