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
	/* border-top: 1px solid rgba(34, 36, 37, 0.6); */
	backdrop-filter: blur(6px);

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Button = styled(motion.button)<Props>`
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

export const FloatingButton = styled(motion.button)<Props>`
	flex: 1;
	height: 100%;
	background: none;
	border: none;
	outline: none;
	transition: 0.3s all;
	padding-top: 4px;

	position: absolute;
	right: 0;
	@supports (-webkit-touch-callout: none) {
  	/* CSS specific to iOS devices */
		margin-bottom: 280px;
	}
	margin-bottom: 140px;
	margin-right: 16px;
	width: 48px;
	height: 48px;
	border-radius: 24px;
	background: #27AE60;
	/* box-shadow: 0px 0px 4px #27AE60, 0px 0px 36px #27AE60; */
	animation-name: breath-animation;
	animation-duration: 8s;
	animation-iteration-count: infinite;

	svg {
		color: #D5F6E3;
		opacity: 0.8;
		font-size: 16px;
		filter: drop-shadow(0px 2px 1.75px #D5F6E3);
	}
`;
// , boxShadow: '0px 0px 2px #27AE60, 0px 0px 18px #27AE60'
