import React, { ButtonHTMLAttributes } from 'react';

import { Container } from "@/styles/components/Button";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
};

export default function Button({ children, loading, ...rest }: ButtonProps) {

  return (
	<Container type="button" {...rest}>
		{loading ? 'Carregando...' : children}
	</Container>
  );
};
