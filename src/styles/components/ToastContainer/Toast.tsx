import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { shade, lighten } from 'polished';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: number;
}

const toastTypeVariations = {
  info: css`
		background: #2D9CDB99;
		color:  rgba(255, 255, 255, 0.95);
	`,

  success: css`
		background: #1C7D4599;
		color: rgba(255, 255, 255, 0.95);
	`,

  error: css`
		background: #EB575799;
		color: rgba(255, 255, 255, 0.95);
	`,
};

export const Container = styled(motion.div) <ContainerProps>`
	width: 100vw;
  backdrop-filter: blur(3px);
  text-align: center;
  box-sizing: border-box;
	position: relative;
	padding: 0;
	/* margin: 30px;
	border-radius: 10px; */
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

	display: flex;

  strong {
		font-size: 14px;
		line-height: 40px;
    margin: 0;
    padding: 0;
  }

	& + div {
		margin-top: 8px;
	}

	${props => toastTypeVariations[props.type || 'info']}
	> svg {
		margin: 4px 12px 0 0;
	}

	div {
		flex: 1;

		p {
			margin-top: 4px;
			font-size: 14px;
			opacity: 0.8;
			line-height: 20px;
		}
	}

	button {
		position: absolute;
		right: 16px;
		top: 19px;
		opacity: 0.6;
		border: 0;
		background: transparent;
		color: inherit;
	}

	${props =>
    !props.hasDescription &&
    css`
			align-items: center;

			svg {
				margin-top: 0;
			}
		`}
`;
