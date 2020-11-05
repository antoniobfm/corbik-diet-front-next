import {
	InputHTMLAttributes,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

// import Tooltip from '../Tooltip';

import { Container } from '@/styles/components/Input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	labelName: string;
	containerStyle?: object;
}

export default function Input({
	name,
	labelName,
	containerStyle = {},
	...rest
}: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const { fieldName, defaultValue, error, registerField } = useField(name);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);

		setIsFilled(!!inputRef.current?.value);
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container
			style={containerStyle}
			isErrored={!!error}
			isFilled={isFilled}
			isFocused={isFocused}
		>
			<input
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				defaultValue={defaultValue}
				ref={inputRef}
				{...rest}
			/>
			<label htmlFor={name} className="form__label">{labelName}</label>
		</Container>
	);
};
