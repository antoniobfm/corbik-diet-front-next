import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
	height: 100vh;
  display: flex;
  flex-direction: column;
	justify-content: center;
`;

export const LoginContainer = styled.main`
  height: auto;
  margin: 0 16px;
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
  margin: 24px 16px 0;

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
