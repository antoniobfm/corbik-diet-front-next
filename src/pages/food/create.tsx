import api from "@/services/api";
import { Container, FormContainer, Header, Icon, Menu, CreateButton } from "@/styles/pages/food/create";
import { Floating } from "@/styles/pages/food/search";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";

interface IFood {
  name: string;
  brand: string;
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
  quantity_amount: number;
  quantity_type: string;
}

export default function Create() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [carbs, setCarbs] = useState('');
  const [prots, setProts] = useState('');
  const [fats, setFats] = useState('');
  const [calories, setCalories] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  
  const router = useRouter();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function createFood() {
        const food: IFood = {
          name: name,
          brand: brand,
          carbohydrates: parseFloat(carbs),
          proteins: parseFloat(prots),
          fats: parseFloat(fats),
          calories: parseFloat(calories),
          quantity_amount: parseFloat(amount),
          quantity_type: `grams`,
        };

        const {data} = await api.post(`/food-library`, food);

        router.push(`/food/${data.id}`);
      }

    createFood();
  }, [name, carbs, prots, fats, calories, amount, unit]);

  return (
    <Container>
      <Header>
        <h1>Create Food</h1>
      </Header>
      <FormContainer>
        <div className="form__field__container">
          <input onChange={e => setName(e.target.value)} type="input" className="form__field" placeholder=" " name="name" id='name' required />
          <label htmlFor="name" className="form__label">Name</label>
        </div>
        
        <div className="form__field__container">
          <input onChange={e => setBrand(e.target.value)} type="input" className="form__field" placeholder=" " name="name" id='name' required />
          <label htmlFor="name" className="form__label">Brand</label>
        </div>
        
        <div className="form__macros">
          <div className="form__field__container macro">
            <input onChange={e => setCarbs(e.target.value)} type="number" className="form__field" placeholder=" " name="name" id='name' required />
            <label htmlFor="name" className="form__label">Carbohydrates</label>
          </div>
          
          <div className="form__field__container macro">
            <input onChange={e => setProts(e.target.value)} type="number" className="form__field" placeholder=" " name="name" id='name' required />
            <label htmlFor="name" className="form__label">Proteins</label>
          </div>
          
          <div className="form__field__container macro">
            <input onChange={e => setFats(e.target.value)} type="number" className="form__field" placeholder=" " name="name" id='name' required />
            <label htmlFor="name" className="form__label">Fats</label>
          </div>
        </div>
        
        <div className="form__field__container">
          <input onChange={e => setCalories(e.target.value)} type="number" className="form__field" placeholder=" " name="name" id='name' required />
          <label htmlFor="name" className="form__label">Calories</label>
        </div>
        
        <div className="form__quantity">
          <div className="form__field__container">
            <input onChange={e => setAmount(e.target.value)} type="number" className="form__field" placeholder=" " name="name" id='name' required />
            <label htmlFor="name" className="form__label">Amount</label>
          </div>
          
          <div className="form__field__container">
            <input type="input" className="form__field" placeholder=" " name="name" id='name' required />
            <label htmlFor="name" className="form__label">Unit</label>
          </div>
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
          <CreateButton onClick={handleSubmit}>CREATE</CreateButton>
        </Menu>
      </Floating>
    </Container>
  )
}