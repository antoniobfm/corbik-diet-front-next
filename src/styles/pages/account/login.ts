import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const Container = styled.div`
	margin: auto;
	max-width: 900px;
	/* min-height: 100vh; */
  /* display: flex;
  flex-direction: column; */
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
	width: 100vw;
	height: 50vh;

	background-image: url('/icons/screens.png');
	background-repeat: no-repeat;
	background-size: cover;

	/* justify-content: center; */
	img {
		width: 100%;
	}
`;

export const GetNotifiedContainer = styled.div`
	max-width: 80%;
	padding-left: 10%;
	padding-top: 40px;

	position: relative;

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

	#all-set {
		z-index: 3;

		width: 100vw;
		height: 105%;
		margin-left: 0%;
		margin-top: 0%;

		left: 0;
		top: 0;

		position: absolute;

		background: rgba(10, 10, 11, 0.9);
		backdrop-filter: blur(6px);
		/* Note: backdrop-filter has minimal browser support */


		/* overflow: hidden; */

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h4 {
			font-family: Poppins;
			font-style: normal;
			font-weight: 600;
			font-size: 16px;
			line-height: 18px;
			/* identical to box height */

			display: flex;
			align-items: center;
			text-align: center;
			/* text-transform: uppercase; */

			color: #FFFFFF;

			padding-top: 32px;
		}

		p {
			font-family: Poppins;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.002em;
			/* identical to box height */

			display: flex;
			align-items: center;
			text-align: center;

			color: #FFFFFF;

			padding-top: 4px;
		}

		.is-done {
			width: 48px;
			height: 48px;

			position: relative;

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
