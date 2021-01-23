import React, { ButtonHTMLAttributes } from 'react';

import { DisabledStyle, GreenStyle, RedStyle, YellowStyle, BlueStyle } from "@/styles/components/Button";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	disabled?: boolean;
	fullWidth: boolean;
	color?: 'green' | 'red' | 'yellow';
};

export default function Button({ children, loading, color = 'green', disabled = false, fullWidth = true, ...rest }: ButtonProps) {

	if (disabled) {
		return (
			<DisabledStyle type="button" {...rest} style={{width: `${fullWidth && `100%`}`}}>
				{loading ? 'Loading...' : children}
			</DisabledStyle>
		);
	}

	if (color === 'green') {
		return (
			<GreenStyle type="button" {...rest} style={{width: `${fullWidth && `100%`}`}}>
				{loading ? 'Loading...' : children}
			</GreenStyle>
		);
	}

	if (color === 'red') {
		return (
			<RedStyle type="button" {...rest} style={{width: `${fullWidth && `100%`}`}}>
				{loading ? 'Loading...' : children}
			</RedStyle>
		);
	}

	if (color === 'yellow') {
		return (
			<YellowStyle type="button" {...rest} style={{width: `${fullWidth && `100%`}`}}>
				{loading ? 'Loading...' : children}
			</YellowStyle>
		);
	}

	if (color === 'blue') {
		return (
			<BlueStyle type="button" {...rest} style={{width: `${fullWidth && `100%`}`}}>
				{loading ? 'Loading...' : children}
			</BlueStyle>
		);
	}
};
