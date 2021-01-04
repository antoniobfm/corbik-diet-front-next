/* eslint-disable camelcase */
import { ModalContainer, ModalContent } from "@/styles/components/ConfirmActionModal";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, {
	useEffect,
	useRef,
	useState,
} from "react";

interface IModalWrapper {
	title: string;
	setState: any;
	handleConfirmation: any;
	buttonTextConfirmation?: string;
	buttonColorConfirmation?: string;
	buttonTextCancel?: string;
	children?: React.ReactNode | undefined;
}

const ConfirmActionModal: React.FC<IModalWrapper> = ({
	title,
	setState,
	handleConfirmation,
	buttonTextConfirmation,
	buttonColorConfirmation = 'green',
	buttonTextCancel,
	children,
}: IModalWrapper) => {
  const node = useRef<HTMLDivElement>();

  const [open, setOpen] = useState(true);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      console.log("clicking inside");
      return;
    }
    // outside click
    setState(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

	return (
    <AnimateSharedLayout>
			<ModalContainer
			initial={{ opacity: 0, background: 'transparent', backdropFilter: 'none' }}
			transition={{ ease: "linear", duration: 0.2 }}
			animate={{ opacity: 1, background: 'rgba(10, 10, 11, 0.2)', backdropFilter: 'blur(8px)' }}
			exit={{ opacity: 0 }}
			>
				<motion.div
				initial={{ marginTop: '100%', opacity: 0, transform: 'scale(0.8)' }}
				transition={{ ease: "easeOut", duration: 0.2 }}
				animate={{ marginTop: '0%', opacity: 1, transform: 'scale(1)' }}
				exit={{ opacity: 0 }}
				id="settings"
				ref={node}
				>
					<ModalContent color={buttonColorConfirmation}>
						<h3>{title}</h3>
						{children}
						<div>
							{buttonTextCancel &&
							<button
								type="button"
								className="back"
								onClick={() => setState(false)}
							>
								{buttonTextCancel}
							</button>
							}
							{buttonTextConfirmation &&
							<button
								type="button"
								className="confirm"
								onClick={(e) => handleConfirmation(e)}
							>
								{buttonTextConfirmation}
							</button>
							}
						</div>
					</ModalContent>
				</motion.div>
			</ModalContainer>
		</AnimateSharedLayout>
	);
};

export default ConfirmActionModal;
