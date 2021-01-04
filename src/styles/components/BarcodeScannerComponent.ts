import { FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`
	width: 90vw;
	display: flex;
	align-items: center;

	video {
		max-height: 85vh;
		width: calc(100%);
		background: #222425;
		border-radius: 6px;
	}

	#interactive {
		width: 90vw;
	}

	.drawingBuffer {
		background: red;
		display: none;
		position: fixed;
		width: calc(100%) !important;
	}
`;

export const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(10, 10, 11, 0.2);
  backdrop-filter: blur(8px);

  padding: 0rem 0;

  overflow-y: scroll;

  display: flex;
	flex-direction: column;
  justify-content: center;
  align-items: center;

	::-webkit-scrollbar {
		display: none;
	}
`;

export const BackButton = styled.button`
	width: 90vw;
	margin-top: 8px;
	height: 56px;
	border-radius: 6px;
	background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;

	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
`;


export const Icon = styled(FiChevronLeft)`
  width: 18px;
  height: 18px;

  opacity: 0.5;
	color: #f2f2f2;
`;
