import Input from "@/components/FormComponents/Input";
import WholePageTransition from "@/components/WholePageTransition";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import api from "@/services/api";
import { Container, Details, Header, Menu, CreateButton } from "@/styles/pages/food/food";
import { Floating } from "@/styles/pages/food/search";
import { Calories, Macro, Macros } from "@/styles/pages/Home";
import addZeroBefore from "@/utils/addZeroBefore";
import toFixedNumber from "@/utils/formatNumbers";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface IFood {
  food_id: string;
  name: string;
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
  quantity_amount: number;
  quantity_type: string;
  when: Date;
}

export default function Food() {
  const [foodData, setFoodData] = useState<any>([]);
  const [amount, setAmount] = useState('');
  const [carbs, setCarbs] = useState(0);
  const [prots, setProts] = useState(0);
  const [fats, setFats] = useState(0);
  const [calories, setCalories] = useState(0);

  const [date, setDate] = useState<Date>(new Date());

  const router = useRouter();

  const { user } = useAuth();

  const foodId = router.query.slug;

  const { addToast } = useToast();

  const handleData = useCallback((data: any) => {
    setFoodData(data);
    console.log(data);
    setAmount(data.quantity_amount);
    setFats(toFixedNumber(parseFloat(data.quantity_amount) * data.fats / data.quantity_amount, 2, 10));
    setCarbs(toFixedNumber(parseFloat(data.quantity_amount) * data.carbohydrates / data.quantity_amount, 2, 10));
    setProts(toFixedNumber(parseFloat(data.quantity_amount) * data.proteins / data.quantity_amount, 2, 10));
    setCalories(toFixedNumber(parseFloat(data.quantity_amount) * data.calories / data.quantity_amount, 2, 10));
	}, []);

	useEffect(() => {
		async function loadData() {
			if (foodId) {
				const response = await api.get(`/food-library/food/${foodId}`);

				handleData(response.data);
			}
		}
		loadData();
	}, [foodId]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    async function createFood() {
        const food: IFood = {
          food_id: foodData.id,
          name: foodData.name,
          quantity_type: `grams`,
          quantity_amount: parseFloat(amount),
          carbohydrates: carbs,
          proteins: prots,
          fats: fats,
          calories: calories,
          when: date,
        };

        console.log(food);

        await api.post(`/food/log`, food);

				addToast({
					type: 'success',
					title: 'Logged with success',
				});

        router.push(`/`);
      }

    createFood();
  }, [foodData, carbs, prots, fats, calories, date, amount]);

  useEffect(() => {
    setFats(toFixedNumber(parseFloat(amount) * foodData.fats / foodData.quantity_amount, 2, 10));
    setCarbs(toFixedNumber(parseFloat(amount) * foodData.carbohydrates / foodData.quantity_amount, 2, 10));
    setProts(toFixedNumber(parseFloat(amount) * foodData.proteins / foodData.quantity_amount, 2, 10));
    setCalories(toFixedNumber(parseFloat(amount) * foodData.calories / foodData.quantity_amount, 2, 10));
  }, [foodData, amount]);

  if (foodId) {
  return (
		<WholePageTransition>
    <Container>
      <Header>
        <h1>{foodData.name}</h1>
        <h3>{foodData.brand}</h3>
      </Header>
      <Macros>
        <Macro macro="carb">
          <h3>Carbs</h3>
          <span>{carbs ? carbs : '0'}</span>
          <progress id="carbs" value={carbs ? carbs : '0'} max={user ? user.carbohydrates : '0'}>30%</progress>
        </Macro>
        <Macro macro="protein">
          <h3>Protein</h3>
          <span>{prots ? prots : '0'}</span>
          <progress id="prots" value={prots ? prots : '0'} max={user ? user.proteins : '0'}>30%</progress>
        </Macro>
        <Macro macro="fat">
          <h3>Fat</h3>
          <span>{fats ? fats : '0'}</span>
          <progress id="fats" value={fats ? fats : '0'} max={user ? user.fats : '0'}>30%</progress>
        </Macro>
      </Macros>
      <Calories>
        <div>
          <h3>Calories</h3>
          <span>{calories ? calories : '0'}</span>
        </div>
        <progress id="calories" value={calories ? calories : '0'} max={user ? user.calories : '0'}>30%</progress>
      </Calories>
      <Details>
				<Form onSubmit={() => {}}>
					<Input
						name="when"
						labelName="Date"
						type="datetime-local"
						value={`${date && new Date(date).getFullYear()}-${addZeroBefore(new Date(date).getMonth() + 1)}-${addZeroBefore(new Date(date).getDate())}T${addZeroBefore(new Date(date).getHours())}:${addZeroBefore(new Date(date).getMinutes())}`}
						onChange={e => setDate(new Date(e.target.value))} />
				</Form>
      </Details>

      <Floating>
        <Menu>
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
          <CreateButton onClick={handleSubmit}>LOG IT</CreateButton>
        </Menu>
      </Floating>
    </Container>
		</WholePageTransition>
  );
  } else {
    return <p>Loading...</p>;
  }
}
