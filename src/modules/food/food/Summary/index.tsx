import React, { Dispatch, SetStateAction } from 'react';

import { Container } from './styles';
import { Form } from "@unform/web";
import Input from "@/components/FormComponents/Input";
import addZeroBefore from '@/utils/addZeroBefore';

interface ISummaryProps {
	setDate: Dispatch<SetStateAction<Date>>
	date: Date
}

const Summary: React.FC<ISummaryProps> = ({setDate, date}: ISummaryProps) => {
	return (
		<Container>
			<div className="header">
				<h3>Summary</h3>
			</div>
			<Form onSubmit={() => { }}>
				<Input
					name="when"
					labelName="Date"
					type="datetime-local"
					value={`${date && new Date(date).getFullYear()}-${addZeroBefore(new Date(date).getMonth() + 1)}-${addZeroBefore(new Date(date).getDate())}T${addZeroBefore(new Date(date).getHours())}:${addZeroBefore(new Date(date).getMinutes())}`}
					onChange={e => setDate(new Date(e.target.value))} />
			</Form>
		</Container>
	)
}

export default Summary;
