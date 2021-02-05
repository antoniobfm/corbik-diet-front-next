import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
	.scrolly2 {
		width: calc(100vw);
		height: 80px;

		display: flex;
		flex-direction: row;

		overflow-x: scroll;

		::-webkit-scrollbar {
			display: none;
		}
	}

	.scrolly-container {
		width: auto;
		height: 80px;
		padding: 0 12px;

		display: flex;
		flex-direction: row;
	}
`;
