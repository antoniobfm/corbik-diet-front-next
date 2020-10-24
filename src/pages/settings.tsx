import { useAuth } from "@/hooks/auth";
import api from "@/services/api";
import { Header } from "@/styles/pages/Home";
import { Container } from "@/styles/pages/settings";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import getValidationErrors from '../utils/getValidationErrors';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useToast } from "@/hooks/toast";

interface ProfileFormData {
	name: string;
	email: string;
	old_password: string;
	password: string;
	password_confirmation: string;
}

interface TargetsFormData {
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
}

export default function Settings() {
  const router = useRouter();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const formTargetsRef = useRef<FormHandles>(null);

  const { updateUser, user, signOut } = useAuth();

  const handleSubmitTargets = useCallback(
    async (data: TargetsFormData) => {
      try {
        formTargetsRef.current?.setErrors({});
  
        const schema = Yup.object().shape({
          carbohydrates: Yup.string().required('Carbohydrates amount required'),
          proteins: Yup.string().required('Proteins amount required'),
          fats: Yup.string().required('Fats amount required'),
          calories: Yup.string().required('Calories amount required'),
        });
  
        await schema.validate(data, {
          abortEarly: false,
        });
  
        const {
          carbohydrates,
          proteins,
          fats,
          calories
        } = data;
  
        const formData = {
          carbohydrates: parseInt(carbohydrates, 10),
          proteins:  parseInt(proteins, 10),
          fats:  parseInt(fats, 10),
          calories:  parseInt(calories, 10)
        };
  
        const response = await api.put('/profile/targets', formData);
  
        updateUser(response.data);

        addToast({
          type: 'success',
          title: `Modified your targets with success`
        });
  
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
  
          formTargetsRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: `Something went wrong`
          });
  
          return;
        }
      }
    },
    [history],
  );

const handleSubmit = useCallback(
  async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val) => !!val.length,
          then: Yup.string().required('Campo obrigatorio'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatorio'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? {
              old_password,
              password,
              password_confirmation,
            }
          : {}),
      };

      const response = await api.put('/profile', formData);

      updateUser(response.data);

      addToast({
        type: 'success',
        title: `Modified your profile with success`
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        
        addToast({
          type: 'error',
          title: `Something went wrong`
        });

        return;
      }
    }
  },
  [],
);

  return (
    <Container>
      <Header>
        <h1>Settings</h1>
      </Header>
      <div>
				<Form
					ref={formTargetsRef}
					initialData={{ carbohydrates: user.carbohydrates, proteins: user.proteins, fats: user.fats, calories: user.calories }}
					onSubmit={handleSubmitTargets}
				>
        <h3>Targets</h3>
        <div className="form__macros">
          <div className="macro">
            <Input
              name="carbohydrates"
              labelName="Carbohydrates"
              type="input"
            />
          </div>
          
          <div className="macro">
            <Input
              name="proteins"
              labelName="Proteins"
              type="input"
            />
          </div>

          <div className="macro">
            <Input
              name="fats"
              labelName="Fats"
              type="input"
            />
          </div>
        </div>
        <Input
          name="calories"
          labelName="Calories"
          type="input"
        />
        <Button type="submit" style={{width: '100%'}}>SAVE</Button>
        </Form>
      </div>

      <div>
				<Form
					ref={formRef}
					initialData={{ name: user.name, email: user.email }}
					onSubmit={handleSubmit}
				>
          <h3>User</h3>
					<Input
            name="name"
            labelName="Name"
						type="input"
					/>
					<Input
            name="email"
            labelName="Email"
						type="input"
					/>

					<Input
						containerStyle={{ marginTop: 24 }}
						name="old_password"
            labelName="Old password"
						type="password"
					/>

					<Input
						name="password"
            labelName="New password"
						type="password"
					/>

					<Input
						name="password_confirmation"
            labelName="Confirm new password"
						type="password"
					/>
          <Button style={{width: '100%'}} type="submit">SAVE</Button>
        </Form> 
      </div>
      <button type="button" onClick={signOut}>
        Logout
      </button>
    </Container>
  )
}