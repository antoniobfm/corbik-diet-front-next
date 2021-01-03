import { motion } from 'framer-motion';
import { linearGradient } from 'polished';
import styled, { css } from 'styled-components';

export const ModalContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(10, 10, 11, 0.2);
  backdrop-filter: blur(8px);

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
		background: #181a1b;
		backdrop-filter: blur(10px);
		border-radius: 6px;
    box-sizing: border-box;
		border: 1px solid rgba(34, 36, 37, 1);

		box-shadow: 0 0.25rem 0.5rem rgba(10, 10, 10, 0.2);

		padding: 1.5rem;

		> div > div {
		}

		button {
			margin-top: 1.5rem;
		}
	}
`;

interface ModalContentProps {
	color: string;
}

export const ModalContent = styled.div<ModalContentProps>`
	flex: 1;

	h1 {
		/* text-align: center; */
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
