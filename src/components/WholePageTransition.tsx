import { Container } from '@/styles/components/WholePageTransition';
import { AnimatePresence } from 'framer-motion';

export default function WholePageTransition({children}: any) {
	return (
		<AnimatePresence>
			<Container
			transition={{ duration: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
			>
				{children}
			</Container>
		</AnimatePresence>
	)
}
