import { motion } from "framer-motion";
import styled from "styled-components";


export const Container = styled(motion.div)`
	min-height: 100vh;

	::-webkit-scrollbar {
		display: none;
	}
`;
