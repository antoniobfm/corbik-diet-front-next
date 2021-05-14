import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const Container = styled(motion.div)`
	.unit {
		flex: 1;
		height: 56px;
		padding-left: 16px;

		display: flex;
		align-items: center;
		justify-content: flex-start;
		border: 1px solid var(--stroke-color);
		border-radius: 6px;

		h3 {
			font-size: 16px;
			font-weight: 400;
			text-align: left;
		}
	}
`
