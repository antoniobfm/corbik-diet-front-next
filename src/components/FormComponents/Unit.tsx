import {
	InputHTMLAttributes,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';

import { Container } from '@/styles/components/FormComponents/Unit';
import Input from './Input';
import { IUnit } from '@/hooks/auth';
import { capitalize } from '@/utils/capitalize';


interface IProps {
	data: IUnit;
	setSelectedUnit: any;
	setShowUnitSelector: any;
	index: number;
	handleChange: any;
	inputPlaceholder?: string;
}

export default function Unit({data, setSelectedUnit, setShowUnitSelector, index, handleChange, inputPlaceholder = "Amount"}: IProps) {
	const handleSelectUnit = useCallback(() => {
		setSelectedUnit({...data, index});
		setShowUnitSelector(true);
	}, [data, index]);

	return (
		<Container>
		<div className="form__two__columns ">
			<Input
				name="quantity_amount"
				labelName={inputPlaceholder}
				type="number"
				value={`${data.amount}`}
				onChange={e => handleChange({value: e.target.value, index})}
				step="0.01"
			/>
			<div
				className="unit"
				onClick={handleSelectUnit}
			>
				<h3>
				{capitalize(data.name)}s
				</h3>
			</div>
		</div>
		</Container>
	);
};
