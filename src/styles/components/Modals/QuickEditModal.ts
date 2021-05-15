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
    width: 80vw;
    height: auto;

		padding: 1.5rem;

		> div > div {
		}

		> button {
			margin-top: 1.5rem;
		}
	}
`;

export const ModalContent = styled.div`
	position: relative;

	background: #181A1B;
	backdrop-filter: blur(10px);
	border-radius: 6px;
	box-sizing: border-box;
	/* border: 1px solid rgba(34, 36, 37, 1); */

	max-height: 60vh;
	/* overflow: hidden; */

	box-shadow: 0 0.25rem 0.5rem rgba(10, 10, 10, 0.2);
	flex: 1;
	padding: 16px;

	.scroll {
		/* min-height: 80vh; */
		max-height: 80vh;
		/* overflow: scroll; */
	}

	::-webkit-scrollbar {
		display: none;
	}

	h3 {
		font-family: Poppins;
		font-style: normal;
		font-weight: 600;
		font-size: 19.8px;
		line-height: 30px;
		/* identical to box height */

		display: flex;
		align-items: center;
		text-align: left;
	}

	h4 {
		font-family: Poppins;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 18px;
		margin-bottom: -4px;
		/* identical to box height */

		display: flex;
		align-items: center;

		color: #FFFFFF;

		mix-blend-mode: screen;
		opacity: 0.4;
	}

	.mini-form {
		width: 100%;
		position: relative;
		padding-top: 8px;

		.mini-form-section {
			width: 100%;
			position: relative;

			padding-bottom: 16px;

			h5 {
				font-family: Poppins;
				font-style: normal;
				font-weight: 600;
				font-size: 14px;
				line-height: 21px;

				padding-bottom: 4px;
			}

			.mini-form-section-inputs {
				width: 100%;
				position: relative;
				height: 50px;

				display: grid;
				grid-template-columns: [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8) [col] calc((100% - 56px) / 8);
				grid-template-rows: [row] auto;
				grid-column-gap: 8px;

				box-sizing: border-box;

				input {
					max-width: 100%;
					box-sizing: border-box;
					padding: 0;
					margin: 0;
					width: auto;
					outline: none;
					border: none;
					background: #323238;
					border-radius: 6px;

					grid-row: row;

					color: #EFEFEF;

					font-family: Poppins;
					font-style: normal;
					font-weight: normal;
					font-size: 16px;
					line-height: 24px;
					padding-left: 16px;
				}

				button {
					outline: none;
					border: none;

					background: #4452FE;
					border-radius: 6px;

					color: #F0F1FF;

					font-family: Poppins;
					font-style: normal;
					font-weight: 600;
					font-size: 12px;
					line-height: 18px;
					/* display: flex; */
					/* align-items: center; */
					/* text-align: center; */
				}

				input[type="time"], input[type="date"] {
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					padding-right: 0px;
				}
			}
		}
	}

	> div {
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
	height: 48px;
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
		flex: 1;
		width: 100%;
		height: 100%;
		color: #f2f2f2;
		background: none;
		border: none;
		outline: none;
		padding: 0;
		padding-left: 16px;
		font-family: "Poppins";
		font-size: 14px;
	}

	> svg {
		font-size: 14px;
		opacity: 0.4;
		stroke-width: 1.9px;
	}

	> button {
		flex: 1;
		max-width: 80px;
		min-height: calc(100%);
		background: linear-gradient(113.21deg, rgba(39, 174, 96, 0.5) 0%, rgba(39, 174, 96, 0.25) 96.25%);
		border-radius: 0px 0px 6px 0px;
		outline: none;
		border: none;
		padding-top: 4px;

		svg {
			color: #D5F6E3;
			font-size: 16px;
		}
	}
`;

export const SpecificUnit = styled.div`
	flex: 1;
	height: 48px;
	/* background: var(--zero-level-black); */
	border-bottom: 1px solid var(--stroke-color);

	display: flex;
	align-items: center;
	justify-content: left;

	padding-left: 16px;
	margin: 0px 0px 0px;

	span {
		font-family: Poppins;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 21px;
	}
`;

export const BackButton = styled.button`
	width: 70vw;
	height: 56px;
	border-radius: 6px;
	background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;

	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
`;
