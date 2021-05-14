import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const Container = styled.div`
	margin: auto;
	max-width: 900px;
	height: 100vh;
  display: flex;
  flex-direction: column;
	/* background-image: url('/icons/screens.png');
	background-repeat: no-repeat;
	background-size: contain;
	background-position-y: 60vh; */
	/* justify-content: center; */
`;

export const ContainerPopup = styled(motion.div)`
	max-width: 900px;
	width: calc(100% - 32px);
	margin: auto;
	height: 100vh;
  display: flex;
  flex-direction: column;
	justify-content: center;
`;

export const LoginContainerPopup = styled.main`
	min-width: 90%;
  height: auto;
  padding: 0 16px 24px;

  display: flex;
  flex-direction: column;

  background: #181A1B;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: 1px solid #222425;

  h3 {
    padding: 17px 0 0;
  }

  h5 {
    padding-top: 12px;
    align-self: flex-end;
    opacity: 0.5;
		font-size: 12px;
  }

  > div {
    position: relative;
    padding-top: 24px;
  }
`;

export const Header = styled.header`
	padding: 21px 16px;

	display: flex;
	justify-content: space-between;
	flex-direction: row;

	#logo {
		transform: scale(0.9);
		max-width: 101px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		#logo-blue-block {
			position: absolute;
			height: 44px;
			left: 0;
		}
		#logo-type {
			position: relative;
			height: 44px;
			padding-left: 14px;
		}
	}

	button {
		transform: scale(0.9);
		height: 48px;
		padding: 0 40px;
		border: 1px solid #222425;
		background: none;
		outline: none;
		box-sizing: border-box;
		filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
		border-radius: 6px;
		color: var(--high-emphasis);

		font-family: Poppins;
		font-style: normal;
		font-weight: 600;
		font-size: 12px;
		line-height: 18px;
		display: flex;
		align-items: center;
		text-align: center;

		:hover {
			filter: brightness(1.5);
			cursor: pointer;
		}
	}
`;

export const MiddleContent = styled.div`
	max-width: 80%;

	padding-left: 10%;
	padding-top: 50px;

	h1 {
		font-family: Poppins;
		font-style: normal;
		font-weight: normal;
		font-size: 34px;
		line-height: 62px;
		/* identical to box height, or 119% */

		text-align: center;
		letter-spacing: 0.2px;
	}

	h2 {
		font-family: Poppins;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 30px;
		/* or 150% */

		text-align: center;
		letter-spacing: 0.2px;
	}
`;

export const Footer = styled.footer`
	flex: 1;
	min-width: 100%;

	background-image: url('/icons/screens.png');
	background-repeat: no-repeat;
	background-size: cover;

	/* justify-content: center; */
	img {
		width: 100%;
	}
`;

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
}

export const GetNotifiedContainer = styled.div<ContainerProps>`
	max-width: 80%;
	padding-left: 10%;
	padding-top: 40px;

	h3 {
		font-family: Poppins;
		font-style: normal;
		font-weight: 500;
		font-size: 19px;
		line-height: 30px;
		/* identical to box height, or 125% */

		text-align: center;
		letter-spacing: 0.2px;
	}

	#get-notification-container {
		background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%);
		border: 1.5px solid #222425;
		box-sizing: border-box;
		filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
		border-radius: 6px;
		padding-left: 16px;
		margin-top: 8px;
		margin-bottom: 16px;

		display: flex;
		justify-content: space-between;
		align-items: center;

		transition: 0.3s all;

		svg {
			min-width: 20px;
			color: rgba(255, 255, 255, 0.4);
			font-size: 14px;
		}

		input {
			flex: 1;
			padding: 16px 16px 16px 8px;
			background: none;
			border: none;
			outline: none;

			font-family: Poppins;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 19px;
			text-align: left;

			color: var(--high-emphasis);
		}

		${props =>
			props.isFocused &&
			css`
				color: rgba(255, 255, 255, 0.95);
				border-color: rgba(255, 255, 255, 0.95);
				background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.06) 0%, rgba(24, 26, 27, 0.03) 62.45%);
				svg {
					color: rgba(255, 255, 255, 0.95);
				}
			`}

		${props =>
			props.isFilled &&
			css`
				color: rgba(255, 255, 255, 0.5);
				border-color: rgba(255, 255, 255, 0.4);
				svg {
					color: rgba(255, 255, 255, 0.95);
				}
			`}

		${props =>
			props.isFocused && props.isFilled &&
			css`
				color: rgba(255, 255, 255, 0.95);
				border-color: rgba(255, 255, 255, 0.95);
				background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.06) 0%, rgba(24, 26, 27, 0.03) 62.45%);
				svg {
					color: rgba(255, 255, 255, 0.95);
				}
			`}
	}

	#get-notified-button {
		width: 100%;
		background: linear-gradient(111.07deg, #4452FE 0%, rgba(68, 82, 254, 0.5) 100%), #181A1B;
		border: 1px solid #1E4085;
		border-radius: 6px;
		padding: 16px 0;

		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;

		span {
			font-family: Poppins;
			font-style: normal;
			font-weight: 600;
			font-size: 12px;
			line-height: 15px;

			color: #D5E0F6;
		}
	}
`

export const LoginContainer = styled.main`
  height: auto;
  padding: 0 16px 24px;

  display: flex;
  flex-direction: column;

  background: #181A1B;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: 1px solid #222425;

  h3 {
    padding: 17px 0 0;
  }

  h5 {
    padding-top: 12px;
    align-self: flex-end;
    opacity: 0.5;
		font-size: 12px;
  }

  > div {
    position: relative;
    padding-top: 24px;
  }
`;

export const CreateAccount = styled.aside`
  margin: 24px 0px 0;

  box-shadow: 0px 4px 24px rgba(39, 174, 96, 0.25);
`;

interface IProps {
	isDisabled: boolean;
}

export const ButtonLogin = styled(motion.button)<IProps>`
	width: 82%;
	height: 56px;

	background: ${props => props.isDisabled ? 'linear-gradient(111.07deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 100%), #181A1B': 'linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B'};
	border: 1px solid ${props => props.isDisabled ? '#222425' : '#1E854A'};
	border-radius: 6px;

	font-size: 12px;
	font-weight: 600;
	color: ${props => props.isDisabled ? '#8C8D8E' : '#D5F6E3'};
	opacity: ${props => props.isDisabled ? 0.5 : 1};
	transition: 1s opacity;

	&:hover {
		/* background: ${shade(0.2, '#8C8D8E')}; */
	}
`;

export const GreenStyle = styled(motion.button)`
	width: 82%;
	height: 56px;

	background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
	border: 1px solid #1E854A;
	border-radius: 6px;

	font-size: 12px;
	font-weight: 600;
	color: #D5F6E3;

	&:hover {
		/* background: ${shade(0.2, '#D5F6E3')}; */
	}
`;
