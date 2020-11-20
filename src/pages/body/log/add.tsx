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
import addZeroBefore from "@/utils/addZeroBefore";

interface IBodyFormData {
	weight: number;
	muscle: number;
	fat: number;
	water: number;
	bones: number;
	when: string;
}

export default function Create() {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();

  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = useCallback(
    async (data: IBodyFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          weight: Yup.number().required('Weight is required'),
          muscle: Yup.number(),
          fat: Yup.number(),
          water: Yup.number(),
          bones: Yup.number()
        });

        await schema.validate(data, {
          abortEarly: false,
				});

        const body = {
          weight: data.weight,
          muscle: data.muscle,
          water: data.water,
          fat: data.fat,
					bones: data.bones,
					when: date
        };

        await api.post(`/body`, body);

        addToast({
          type: 'success',
          title: `Logged your body data with success`,
        });

        router.push(`/body`);

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
    [date],
  );

  return (
    <Container>
      <Header>
        <h1>Log Body</h1>
      </Header>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <FormContainer>
          <Input
            name="weight"
						labelName="Weight"
						placeholder="Kilos"
            type="number"
            step="0.01"
          />
          <div className="form__macros">
            <div className="macro">
              <Input
                name="muscle"
								labelName="Muscle"
								placeholder="%"
                type="number"
                step="0.01"
              />
            </div>
            <div className="macro">
              <Input
                name="water"
								labelName="Water"
								placeholder="%"
                type="number"
                step="0.01"
              />
            </div>
            <div className="macro">
              <Input
                name="fat"
								labelName="Fat"
								placeholder="%"
                type="number"
                step="0.01"
              />
            </div>
            <div className="macro">
              <Input
                name="bones"
								labelName="Bones"
								placeholder="%"
                type="number"
                step="0.01"
              />
            </div>
          </div>

					<input
          type="datetime-local"
          value={`${new Date(date).getFullYear()}-${addZeroBefore(new Date(date).getMonth() + 1)}-${addZeroBefore(new Date(date).getDate())}T${addZeroBefore(new Date(date).getHours())}:${addZeroBefore(new Date(date).getMinutes())}`}
          onChange={e => setDate(new Date(e.target.value))} />
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
            <CreateButton type="submit">LOG</CreateButton>
          </Menu>
        </Floating>
      </Form>
    </Container>
  )
}
