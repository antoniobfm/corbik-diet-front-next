/* eslint-disable camelcase */
import { useLog } from "@/hooks/logs";
import api from "@/services/api";
import { ModalContainer, ModalContent, SpecificUnit } from "@/styles/components/Modals/QuickEditModal";
import { capitalize } from "@/utils/capitalize";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

interface ILogData {
	id: string;
	name: string;
	brand: string;
	//
	amount: number;
	unit_name: string;
	//
	day: string;
	month: string;
	year: string;
	hour: string;
	minute: string;
	when: string;
}

interface IProps {
	setState: any;
	handleChangeUnit: any;
	logData: ILogData;
}

const QuickEditModal: React.FC<IProps> = ({
	setState,
	handleChangeUnit,
	logData
}: IProps) => {
	const [unitData, setUnitData] = useState([]);

	//: Unit Manamgent
  useEffect(() => {
    async function initialLoad() {
      const {data} = await api.get(`/units`);

			setUnitData(data);
    }

		initialLoad();
	}, []);

	//: Modal Management
  const node = useRef<HTMLDivElement>();

  const [open, setOpen] = useState(true);
	const { search } = useLog();

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      console.log("clicking inside");
      return;
    }
    // outside click
    setState(false);
  };

	let inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		setTimeout(() => {
			inputRef.current.focus();
		}, 200);
	}, [inputRef]);

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
			initial={{ opacity: 0, background: 'transparent' }}
			transition={{ ease: "linear", duration: 0.2 }}
			animate={{ opacity: 1, background: 'rgba(10, 10, 11, 0.9)' }}
			exit={{ opacity: 0 }}
			>
				<motion.div
				initial={{ translateY: '100%', opacity: 0, transform: 'scale(1)' }}
				transition={{ ease: "easeOut", duration: 0.2 }}
				animate={{ translateY: '0%', opacity: 1, transform: 'scale(1)' }}
				exit={{ opacity: 0 }}
				id="settings"
				ref={node}
				>
					<ModalContent>
					{/* <Floating>
						<FiPackage />
						<input
							type="text"
							ref={inputRef}
							placeholder="Add custom unit"
							onFocus={() => setInputFocused(true)}
							onBlur={() => setInputFocused(false)}
							onChange={e => setSearchInput(e.target.value)}
							onKeyDown={e => handleEnter(e)} />
							<button type="button">
								<FiPlus />
							</button>
					</Floating> */}
						<motion.div
						className="scroll"
						id="scroll"
						// drag="y"
						// dragConstraints={{bottom: 0}}
						>
							<div className="header">
								<h4>{logData.brand}</h4>
								<h3>{logData.name}</h3>
							</div>
							<div className="mini-form">
								<div className="mini-form-section">
									<h5>Amount</h5>
									<div className="mini-form-section-inputs">
										<input type="number" ref={inputRef} defaultValue={logData.amount} placeholder={`${logData.amount}`} style={{ gridColumn: 'col / span 4' }} />
										<input type="text" value="Grams" style={{ gridColumn: 'col 5 / span 4' }} />
									</div>
								</div>
								<div className="mini-form-section">
									<h5>When</h5>
									<div className="mini-form-section-inputs">
										<input type="date" defaultValue={`${logData.year}-${logData.month}-${logData.day}`} style={{ gridColumn: 'col / span 3' }} />
										<input type="time" defaultValue={`${logData.hour}:${logData.minute}`} style={{ gridColumn: 'col 4 / span 3' }} />
										<button type="button" style={{ gridColumn: 'col 7 / span 2' }}>NOW</button>
									</div>
								</div>
							</div>
							{/* {unitData && unitData.map((item) =>
								<SpecificUnit onClick={() => handleChangeUnit({data: item})} key={item.name}>
									<span>{capitalize(item.name)}s</span>
								</SpecificUnit>
							)} */}
						</motion.div>
					</ModalContent>
				</motion.div>
			</ModalContainer>
		</AnimateSharedLayout>
	);
};

export default QuickEditModal;
