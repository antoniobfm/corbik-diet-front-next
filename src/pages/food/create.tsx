import Input from "@/components/FormComponents/Input";
import api from "@/services/api";
import { Container, FormContainer, Icon, Menu, CreateButton } from "@/styles/pages/food/create";
import { Header } from "@/styles/pages/food/search";
import { Floating } from "@/styles/pages/food/search";
import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import getValidationErrors from "@/utils/getValidationErrors";
import * as Yup from 'yup';
import { useToast } from "@/hooks/toast";
import WholePageTransition from "@/components/WholePageTransition";

interface IFoodFormData {
  name: string;
  brand?: string;
  barcode?: string;
  carbohydrates: string;
  proteins: string;
  fats: string;
  calories: string;
  quantity_amount: string;
  quantity_type: string;
}

interface IFood {
  name: string;
  brand?: string;
  barcode?: string;
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
  quantity_amount: number;
  quantity_type: string;
}

export default function Create() {
  const router = useRouter();
	const { barcode } = router.query;

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IFoodFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Email is required'),
          brand: Yup.string().optional(),
          barcode: Yup.string().optional(),
          carbohydrates: Yup.string().required('Carbohydrates is required'),
          proteins: Yup.string().required('Proteins is required'),
          fats: Yup.string().required('Fats is required'),
          calories: Yup.string().required('Calories is required'),
          quantity_amount: Yup.string().required('Amount is required'),
          quantity_type: Yup.string(),
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
					console.log(errors);

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
		<WholePageTransition>
    <Container>
      <Header>
        <h1>Create Food</h1>
      </Header>
      <Form
        ref={formRef}
				onSubmit={handleSubmit}
				initialData={{ barcode: barcode }}
      >
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
          <div className="form__two__columns ">
            <Input
              name="quantity_amount"
              labelName="Amount"
              type="number"
              step="0.01"
            />
            <Input
              name="quantity_type"
              labelName="Unit"
              type="input"
              defaultValue="Grams"
            />
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
