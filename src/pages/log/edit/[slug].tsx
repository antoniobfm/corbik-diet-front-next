import { useAuth } from "@/hooks/auth";
import api from "@/services/api";
import { Details, Header, Menu } from "@/styles/pages/food/food";
import { CreateButton, Floating } from "@/styles/pages/food/search";
import { Calories, Macro, Macros } from "@/styles/pages/Home";
import { Container, EditButton, Icon, StaticMenu } from "@/styles/pages/log/edit/edit";
import addZeroBefore from "@/utils/addZeroBefore";
import toFixedNumber from "@/utils/formatNumbers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from "swr";

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

  const [amount, setAmount] = useState('');
  const [carbs, setCarbs] = useState<number | null>(0);
  const [prots, setProts] = useState<number | null>(0);
  const [fats, setFats] = useState<number | null>(0);
  const [calories, setCalories] = useState<number | null>(0);

  const [date, setDate] = useState<Date>(new Date());
  
  const { user, loading } = useAuth();

  const logId = router.query.slug;
  
  const handleData = useCallback((data: any) => {
    data = data.data;
    setFats(toFixedNumber(parseFloat(data.quantity_amount) * data.fats / data.quantity_amount, 2, 10));
    setCarbs(toFixedNumber(parseFloat(data.quantity_amount) * data.carbohydrates / data.quantity_amount, 2, 10));
    setProts(toFixedNumber(parseFloat(data.quantity_amount) * data.proteins / data.quantity_amount, 2, 10));
    setCalories(toFixedNumber(parseFloat(data.quantity_amount) * data.calories / data.quantity_amount, 2, 10));
    setDate(new Date(data.when));
    setAmount(`${data.quantity_amount}`);
  }, []);

  const { data: { data: logData } = {}, isValidating } = useSWR(
    `/food/log/specific/${logId}`, 
    api.get, {
      onSuccess: (data, key, config) => {
        handleData(data);
      }
   });

   
  useEffect(() => {
    if (logData) {
      setFats(toFixedNumber(parseFloat(logData.quantity_amount) * logData.fats / logData.quantity_amount, 2, 10));
      setCarbs(toFixedNumber(parseFloat(logData.quantity_amount) * logData.carbohydrates / logData.quantity_amount, 2, 10));
      setProts(toFixedNumber(parseFloat(logData.quantity_amount) * logData.proteins / logData.quantity_amount, 2, 10));
      setCalories(toFixedNumber(parseFloat(logData.quantity_amount) * logData.calories / logData.quantity_amount, 2, 10));
    }
  }, [logData, amount]);

  const showSkeleton = isValidating || loading;

  const handleDelete = useCallback((e) => {
    e.preventDefault()
    async function editFood() {
      await api.delete(`/food/log/specific/${logData.id}`);
      router.push(`/`);
    }

    editFood();
  }, [logData]);

  const handleEdit = useCallback((e) => {
    e.preventDefault()
    async function editFood() {
        const log = {
          id: logData.id,
          quantity_amount: parseFloat(amount),
          carbohydrates: carbs,
          proteins: prots,
          fats: fats,
          calories: calories,
          when: date,
        };
        
        await api.put(`/food/log`, log);
        
        router.push(`/`);
      }

    editFood();
  }, [logData, carbs, prots, fats, calories, date, amount]);

  return (
    <Container>
      <Header>
        <div>
          <h1>{logData ? logData.name : <Skeleton height={30} width={200} />}</h1>
        </div>
        <h3>{logData ? logData.brand : <Skeleton height={20} width={90} />}</h3>
      </Header>
      <Macros>
        <Macro macro="carb">
          <h3>Carbs</h3>
          <span>{carbs && carbs}</span>
          <progress id="carbs" value={carbs && carbs} max={user && user.carbohydrates}>30%</progress>
        </Macro>
        <Macro macro="protein">
          <h3>Protein</h3>
          <span>{prots && prots}</span>
          <progress id="prots" value={prots && prots} max={user && user.proteins}>30%</progress>
        </Macro>
        <Macro macro="fat">
          <h3>Fat</h3>
          <span>{fats && fats}</span>
          <progress id="fats" value={fats && fats} max={user && user.fats}>30%</progress>
        </Macro>
      </Macros>
      <Calories>
        <div>
          <h3>Calories</h3>
          <span>{calories && calories}</span>
        </div>
        <progress id="calories" value={calories && calories} max={user && user.calories}>30%</progress>
      </Calories>
      <Details>
        <input 
          type="datetime-local" 
          value={`${new Date(date).getFullYear()}-${addZeroBefore(new Date(date).getMonth() + 1)}-${addZeroBefore(new Date(date).getDate())}T${addZeroBefore(new Date(date).getHours())}:${addZeroBefore(new Date(date).getMinutes())}`} 
          onChange={e => setDate(new Date(e.target.value))} />
      
          <StaticMenu>
            <div>
              <div className="amount">
                <input type="number" placeholder="Amount" defaultValue={amount} onChange={e => setAmount(e.target.value)} />
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
      <div className="delete">
        <button type="button" onClick={handleDelete}>
            <Icon />
        </button>
      </div>
    </Container>
  );
}