import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
	height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: center;

	#back {
		width: 100%;
		padding-top: 16px;

		font-size: 14px;
		font-weight: 600;
		font-family: "Poppins";
		color: var(--low-emphasis);


		background: none;
		border: none;
		outline: none;
		box-shadow: none;
	}
`;

export const Success = styled(motion.div)`
	width: 100%;
	height: 100%;

	border-radius: 6px;

	position: absolute;
	z-index: 2;
	left: 0;

	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(8px);

	overflow: hidden;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.is-done {
		width: 55px;
		height: 55px;

		position: relative;

		border-radius: 28px;
		background-color: var(--corbik-green);

		animation-name: breath-animation;
		animation-duration: 8s;
		animation-iteration-count: infinite;

		box-shadow: 0px 4px 24px rgba(24, 26, 27, 0.5), 0px 0px 18.2857px var(--corbik-green), 0px 0px 55px var(--corbik-green), inset 0px 4px 12px rgba(0, 0, 0, 0.25);

		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			position: absolute;
			font-size: 27px;
			filter: drop-shadow(0px 2px 5px #fff);
			stroke-width: 4px;
		}
	}

	h3 {
		color: var(--high-emphasis);
		padding-top: 16px;
		font-size: 18px;
	}

	p {
		text-align: center;
		color: var(--medium-emphasis);
	}
`;

export const RecoverContainer = styled.main`
	height: auto;
	margin: 0 16px;
	padding: 0 16px 24px;

	position: relative;
	background: #181A1B;
	box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	border: 1px solid #222425;

	#content {
		display: flex;
		flex-direction: column;

		h3 {
			padding: 17px 0 0;
		}

		h5 {
			padding-top: 12px;
			align-self: flex-end;
			opacity: 0.5;
		}

		> div {
			position: relative;
			padding-top: 24px;
		}
	}
`;
