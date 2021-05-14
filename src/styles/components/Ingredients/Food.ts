import { motion } from "framer-motion";
import styled from "styled-components";


export const Log = styled(motion.div)`
	width: 100vw;
	height: 56px;
	margin-left: -16px;
	box-sizing: border-box;
	/* border-bottom: 1px solid #222425; */
	background: #181A1B;
	padding: 4px 8px 0 0;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	/* transition: 0.3s all; */

	:active {
		filter: brightness(1.6);
	}

	h4 {
		padding-right: 8px;
		font-weight: 400;
	}

	h5 {
		font-weight: 400;
		opacity: 0.5;
	}

	.when {
		width: 68px;
		text-align: center;
	}

	.name-brand-container {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.name-brand {
		position: relative;
		padding-left: 16px;

		h5 {
			width: 20rem;
			position: absolute;
			word-break: break-all;
			margin-top: -0.8rem;
			font-size: 0.707rem;
		}
	}

	.macros {
		flex: 1;
		max-width: 20%;
		padding-right: 16px;
		text-align: right;
	}

	.quantity {
		flex: 1;
		max-width: 24%;
		input {
			background: #111213;
			border-radius: 6px;
			border: none;
			outline: none;
			color: var(--high-emphasis);
			width: 100%;
			padding: 9px 0;
			text-align: center;
			font-family: Poppins;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 21px;
		}
	}
`;
