/* eslint-disable camelcase */
import { useLog } from "@/hooks/logs";
import { useToast } from "@/hooks/toast";
import { api } from '@/services/apiClient';
import { ModalContainer, ModalContent, SpecificUnit } from "@/styles/components/Modals/QuickEditModal";
import { capitalize } from "@/utils/capitalize";
import { isoFormat, isoParse } from "d3-time-format";
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
	const [timeTemp, setTimeTemp] = useState(`${logData.hour}:${logData.minute}`);
	const [amountTemp, setAmountTemp] = useState(`${logData.amount}`);
	const [dateTemp, setDateTemp] = useState(`${logData.year}-${logData.month}-${logData.day}`);

	const { updateLog } = useLog();

	//: Unit Manamgent
  useEffect(() => {
    async function initialLoad() {
      const {data} = await api.get(`/units`);

			setUnitData(data);
    }

		initialLoad();
	}, []);
	const { addToast } = useToast();

	const handleEdit = useCallback(async () => {
	}, [logData, timeTemp, dateTemp, amountTemp]);

	//: Modal Management
  const node = useRef<HTMLDivElement>();

  const [open, setOpen] = useState(true);

  const handleClickOutside = useCallback(async (e) => {
    if (node.current.contains(e.target)) {
      console.log("clicking inside");
      return;
    }
		if (amountTemp !== inputRef.current.value || `${isoFormat(new Date(`${inputDateRef.current.value}T${inputTimeRef.current.value}`))}` !== `${isoFormat(new Date(`${dateTemp}T${timeTemp}`))}`) {
			updateLog({id: logData.id, when: `${isoFormat(new Date(`${inputDateRef.current.value}T${inputTimeRef.current.value}`))}`, amount: inputRef.current.value});
		}
    // outside click
    setState(false);
  }, [dateTemp, timeTemp, amountTemp]);

	let inputRef = useRef<HTMLInputElement>();
	let inputDateRef = useRef<HTMLInputElement>();
	let inputTimeRef = useRef<HTMLInputElement>();

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

	const handleChangeAmount = useCallback((e) => {
		console.log(e.target.value)
		setAmountTemp(e.target.value)
	}, [amountTemp])

	if (logData && timeTemp && dateTemp)
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
						<motion.div
						className="scroll"
						id="scroll"
						>
							<div className="header">
								<h4>{logData.brand}</h4>
								<h3>{logData.name}</h3>
							</div>
							<div className="mini-form">
								<div className="mini-form-section">
									<h5>Amount</h5>
									<div className="mini-form-section-inputs">
										<input type="number" ref={inputRef} value={amountTemp} onChange={handleChangeAmount} placeholder={`${logData.amount}`} style={{ gridColumn: 'col / span 4' }} />
										<input type="text" value="Grams" style={{ gridColumn: 'col 5 / span 4' }} />
									</div>
								</div>
								<div className="mini-form-section">
									<h5>When</h5>
									<div className="mini-form-section-inputs">
										<input type="date" ref={inputDateRef} defaultValue={dateTemp && dateTemp} style={{ gridColumn: 'col / span 3' }} />
										<input type="time" ref={inputTimeRef} defaultValue={timeTemp && timeTemp} style={{ gridColumn: 'col 4 / span 3' }} />
										<button type="button" style={{ gridColumn: 'col 7 / span 2' }}>NOW</button>
									</div>
								</div>
							</div>
						</motion.div>
					</ModalContent>
				</motion.div>
			</ModalContainer>
		</AnimateSharedLayout>
	);
};

export default QuickEditModal;
