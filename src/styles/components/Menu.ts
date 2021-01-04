import { motion } from 'framer-motion';
import styled from 'styled-components';

interface Props {
	isSelected: boolean;
}

export const Container = styled.div`
	position: fixed;
	bottom: 0;
	z-index: 4;

	width: 100vw;
	height:	48px;
	background: rgba(11, 11, 12, 0.6);
	border-top: 1px solid rgba(34, 36, 37, 0.6);
	backdrop-filter: blur(6px);

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	#add {
		height: 100%;
		background: linear-gradient(113.21deg, rgba(39, 174, 96, 0.5) 0%, rgba(39, 174, 96, 0.25) 96.25%);

		svg {
			color: #D5F6E3;
			opacity: 0.8;
		}
	}
`;

export const Button = styled.button<Props>`
	flex: 1;
	height: 100%;
	background: none;
	border: none;
	outline: none;
	transition: 0.3s all;
	padding-top: 4px;

	svg {
		transition: 0.3s all;
		color: ${props => props.isSelected ? '#f2f2f2' : '#808080'};
		font-size: 1rem;
	}
`;
