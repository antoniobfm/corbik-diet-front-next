import Input from "@/components/Input";
import api from "@/services/api";
import { Container, FormContainer, Header, Icon, Menu, CreateButton } from "@/styles/pages/food/create";
import { Floating } from "@/styles/pages/food/search";
import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import getValidationErrors from "@/utils/getValidationErrors";
import * as Yup from 'yup';
import { useToast } from "@/hooks/toast";

interface IFoodFormData {
  name: string;
  brand: string;
  carbohydrates: string;
  proteins: string;
  fats: string;
  calories: string;
  quantity_amount: string;
  quantity_type: string;
}

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
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IFoodFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Email is required'),
          brand: Yup.string().required('Password is required'),
          carbohydrates: Yup.string().required('Password is required'),
          proteins: Yup.string().required('Password is required'),
          fats: Yup.string().required('Password is required'),
          calories: Yup.string().required('Password is required'),
          quantity_amount: Yup.string().required('Password is required'),
          quantity_type: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const food: IFood = {
          name: data.name,
          brand: data.brand,
          carbohydrates: parseFloat(data.carbohydrates),
          proteins: parseFloat(data.proteins),
          fats: parseFloat(data.fats),
          calories: parseFloat(data.calories),
          quantity_amount: parseFloat(data.quantity_amount),
          quantity_type: `grams`,
        };

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
        <h1>Create Food</h1>
      </Header>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <FormContainer>
          <Input
            name="name"
            labelName="Name"
            type="input"
          />
          <Input
            name="brand"
            labelName="Brand"
            type="input"
          />


          <div className="form__macros">
            <div className="macro">
              <Input
                name="carbohydrates"
                labelName="Carbohydrates"
                type="number"
              />
            </div>
            <div className="macro">
              <Input
                name="proteins"
                labelName="Proteins"
                type="number"
              />
            </div>
            <div className="macro">
              <Input
                name="fats"
                labelName="Fats"
                type="number"
              />
            </div>
          </div>

          <Input
            name="calories"
            labelName="Calories"
            type="number"
          />
          <div className="form__quantity">
            <Input
              name="quantity_amount"
              labelName="Amount"
              type="number"
            />
            <Input
              name="quantity_type"
              labelName="Unit"
              type="input"
              defaultValue="Grams"
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
  )
}