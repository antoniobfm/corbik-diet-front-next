import { useAuth } from "@/hooks/auth";
import api from "@/services/api";
import { CreateButton } from "@/styles/pages/food/create";
import { Header } from "@/styles/pages/Home";
import { Container } from "@/styles/pages/settings";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function Settings() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [carbs, setCarbs] = useState('');
  const [prots, setProts] = useState('');
  const [fats, setFats] = useState('');
  const [calories, setCalories] = useState('');

  const { updateUser, user,signOut } = useAuth();

  const handleUpdateTargets = useCallback(async () => {
    const {data} = await api.put(`/profile/targets`, {
      carbohydrates: parseFloat(carbs),
      proteins: parseFloat(prots),
      fats: parseFloat(fats),
      calories: parseFloat(calories),
    });

    updateUser(data);

    router.push('/');
  }, [carbs, prots, fats, calories]);

  return (
    <Container>
      <Header>
        <h1>Settings</h1>
      </Header>
      <div>
        <h3>Targets</h3>
        <div className="form__macros">
          <div className="form__field__container macro">
            <input onChange={e => setCarbs(e.target.value)} type="number" className="form__field" placeholder={`${user && parseInt(user.carbohydrates)}`} name="name" id='name' required autoComplete="off"/>
            <label htmlFor="name" className="form__label">Carbohydrates</label>
          </div>
          
          <div className="form__field__container macro">
            <input onChange={e => setProts(e.target.value)} type="number" className="form__field" placeholder={`${user && parseInt(user.proteins)}`} name="name" id='name' required autoComplete="off"/>
            <label htmlFor="name" className="form__label">Proteins</label>
          </div>
          
          <div className="form__field__container macro">
            <input onChange={e => setFats(e.target.value)} type="number" className="form__field" placeholder={`${user && parseInt(user.fats)}`} name="name" id='name' required autoComplete="off"/>
            <label htmlFor="name" className="form__label">Fats</label>
          </div>
        </div>
        
        <div className="form__field__container">
          <input onChange={e => setCalories(e.target.value)} type="number" className="form__field" placeholder={`${user && parseInt(user.calories)}`} name="name" id='name' required autoComplete="off"/>
          <label htmlFor="name" className="form__label">Calories</label>
        </div>
        <CreateButton style={{width: '100%'}} onClick={handleUpdateTargets}>SAVE</CreateButton>
      </div>

      <div>
        <h3>User</h3>
        <div className="form__field__container">
          <input onChange={e => setName(e.target.value)} type="input" className="form__field" placeholder=" " name="name" id='name' required />
          <label htmlFor="name" className="form__label">Name</label>
        </div>
        
        <div className="form__field__container">
          <input onChange={e => setEmail(e.target.value)} type="email" className="form__field" placeholder=" " name="email" id='email' required />
          <label htmlFor="email" className="form__label">E-mail</label>
        </div>

        <div className="form__field__container">
          <input onChange={e => setPassword(e.target.value)} type="password" className="form__field" placeholder=" " name="password" id='password' required />
          <label htmlFor="password" className="form__label">Password</label>
          </div>

        <div className="form__field__container">
          <input onChange={e => setPassword(e.target.value)} type="password" className="form__field" placeholder=" " name="password" id='password' required />
          <label htmlFor="password" className="form__label">New password</label>
          </div>

        <div className="form__field__container">
          <input onChange={e => setPassword(e.target.value)} type="password" className="form__field" placeholder=" " name="password" id='password' required />
          <label htmlFor="password" className="form__label">New password confirmation</label>
        </div>
        <CreateButton style={{width: '100%'}} onClick={() => {}}>SAVE</CreateButton>
      </div>
      <button type="button" onClick={signOut}>
        Logout
      </button>
    </Container>
  )
}