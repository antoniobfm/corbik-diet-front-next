import { AnimatePresence, motion } from 'framer-motion';

export default function WholePageTransition({children}: any) {
	return (
		<AnimatePresence>
			<motion.div
			transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
