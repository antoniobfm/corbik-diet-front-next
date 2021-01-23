import { motion } from 'framer-motion';
import { linearGradient } from 'polished';
import styled, { css } from 'styled-components';

export const ModalContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
  /* background: rgba(10, 10, 11, 0.6); */
  /* backdrop-filter: blur(8px); */

  overflow-y: scroll;

	display: flex;
	justify-content: center;
	align-items: center;

	::-webkit-scrollbar {
		display: none;
	}

	#settings {
    padding: 14px 16px;
    width: 90vw;
    height: auto;

		padding: 1.5rem;

		> div > div {
		}

		button {
			margin-top: 1.5rem;
		}
	.Special__Select {
		padding: 0 0 0 16px;
		border: 1px solid #222425;
		background: linear-gradient(92.97deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%), #181a1b;
		height: 68px;

		border-radius: 6px;

		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 8px;

		.Special__Select__DropdownIndicator {
			height: 100%;
			width: 20%;
			color: #828282;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		h3 {
			font-size: 14px;
		}

		h5 {
			font-size: 9.9px;
			font-weight: 400;
			color: #828282;
		}
	}
	}
`;

export const ModalContent = styled.div`
	position: relative;

	background: #181a1b;
	backdrop-filter: blur(10px);
	border-radius: 6px;
	box-sizing: border-box;
	border: 1px solid rgba(34, 36, 37, 1);

	min-height: 70vh;
	max-height: 70vh;
	overflow: hidden;

	.scroll {
		min-height: 70vh;
		max-height: 70vh;
		overflow: scroll;
	}

	::-webkit-scrollbar {
		display: none;
	}

	box-shadow: 0 0.25rem 0.5rem rgba(10, 10, 10, 0.2);
	flex: 1;

	h3 {
		text-align: center;
		padding-bottom: 1rem;
	}

	> div {
		button {
			width: 50%;
			height: 3rem;
			outline: none;
			font-size: 0.75rem;
			font-weight: 600;
			border-radius: 0.375rem;

			transition: 0.2s all;
		}

		.back {
			border: none;
			color: #939b9f;
			background: none;

			&:hover {
				color: #f2f2f2;
			}
		}

		.confirm {
			background: ${props => props.color === 'green' ? 'linear-gradient(111.07deg, #27ae60 0%, rgba(39, 174, 96, 0.5) 100%), #181a1b' : 'linear-gradient(111.07deg, #EB5757 0%, rgba(235, 87, 87, 0.5) 100%), #0A0A0B'};
			border: 1px solid ${props => props.color === 'green' ? '#1e854a' : '#EB5757'};
			color: ${props => props.color === 'green' ? '#d5f6e3' : '#FAD1D1'};

			&:hover {
				filter: brightness(1.1);
			}
		}
	}
`;

export const Floating = styled.div`
	width: 100%;
	height: 56px;
	padding-left: 16px;

	position: absolute;

	z-index: 2;
	bottom: 0;

	background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), rgba(11, 11, 12, 0.9);
	border-top: 1px solid rgba(34, 36, 37, 0.5);
	box-sizing: border-box;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	border-radius: 0px 0px 6px 6px;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	input {
		color: #f2f2f2;
		background: none;
		border: none;
		outline: none;
		height: 100%;
		width: 100%;
		padding: 0 16px;
		font-family: "Poppins";
		font-size: 16px;
	}

	svg {
		font-size: 18px;
		opacity: 0.4;
	}
`;
