import { motion } from 'framer-motion';
import { FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`
	background: linear-gradient(346.65deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 100%), #0A0A0B;
	min-height: 100vh;
	padding-bottom: 56px;

	.type {
		padding-bottom: 16px;
	}
`;

export const FormContainer = styled.div`
	margin-bottom: 16px;
  padding: 16px 16px 24px;
  background: #181A1B;
	border-top: 1px solid #222425;
	border-bottom: 1px solid #222425;

  display: flex;
  flex-direction: column;

	.header {
		padding-bottom: 16px;
		height: 32px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		h3 {
			span {
				padding-left: 8px;
				font-size: 10px;
				color: #7E7E7E;
			}
		}

		button {
			outline: none;
			border: none;
			background: none;
			color: #7E7E7F;

			font-family: "Poppins";
			font-weight: 600;
			font-size: 10px;
			height: 100%;

			svg {
				font-size: 16px;
			}
		}
	}

	.type-container {
		width: 100%;

		background: var(--stroke-color);
		border-radius: 6px;

		display: flex;
		flex-direction: row;
	}

	.ingredients-container {
		display: flex;
		flex-direction: column;

		::-webkit-scrollbar {
			display: none;
		}
	}

	.add-ingredient {
		button {
			background: transparent;
			border: none;
			outline: none;
			color: white;
			width: 100%;
			height: 56px;
		}
	}
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 6px;

  background: linear-gradient(91.23deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 100%), #181A1B;

  .back {
    width: 18%;

    .icon {
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Icon = styled(FiChevronLeft)`
  width: 18px;
  height: 18px;

  opacity: 0.5;
`;

export const CreateButton = styled.button`
  width: 82%;
  height: 56px;

  background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
  border: 1px solid #1E854A;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5F6E3;
`;

interface ICreateFoodType {
	selected: boolean;
}

export const CreateFoodType = styled.button<ICreateFoodType>`
	flex: 1;
	height: 32px;

	outline: none;
	background: ${props => props.selected ? '#2D5EDB' : 'transparent'};
	border: none;

	border-radius: 6px;

	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 18px;
	color: ${props => props.selected ? '#E1E9F4' : '#5B5C5D'};
`;
