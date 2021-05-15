import { Container } from '@/styles/components/FormComponents/InputWithIcon';
import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';

// import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	// labelName: string;
	// containerStyle?: object;
}

const InputWithIcon: React.FC<InputProps> = ({name}: InputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const { fieldName, defaultValue, error, registerField } = useField(name);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);

		console.log(inputRef.current?.value);

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
	isErrored={!!error}
	isFilled={isFilled}
	isFocused={isFocused}>
		<FiMail />
		<input
			onFocus={handleInputFocus}
			onBlur={handleInputBlur}
			name="leadEmail"
			ref={inputRef}
			type="email"
			autoCapitalize="none"
			autoComplete="off"
			placeholder="Your best email" />
	</Container>
	);
}

export default InputWithIcon;
