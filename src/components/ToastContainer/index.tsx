import React from 'react';
import { AnimatePresence, motion } from "framer-motion"
import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from '@/styles/components/ToastContainer';

interface ToastContainerProps {
	messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }: ToastContainerProps) => {

	return (
		<Container>
    	<AnimatePresence>
				{messages.map((item) => (
					<Toast key={item.id} message={item} />
				))}
			</AnimatePresence>
		</Container>
	);
};

export default ToastContainer;
