/* eslint-disable camelcase */
import { useLog } from "@/hooks/logs";
import api from "@/services/api";
import { ModalContainer, ModalContent, Floating, SpecificUnit, BackButton } from "@/styles/components/Modals/SelectUnitModal";
import { Food } from "@/styles/pages/food/search";
import handleEnter from "@/utils/blurOnEnter";
import { capitalize } from "@/utils/capitalize";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { FiChevronDown, FiPackage, FiPlus, FiSearch } from "react-icons/fi";
import { RiAddLine } from "react-icons/ri";
import CardMessage from "../Card/CardMessage";

interface IModalWrapper {
	setState: any;
	handleChangeUnit: any;
	selectedUnit?: any;
}

interface ISearchResult {
	own_library: any[];
	public_library: any[];
}

const SelectUnitModal: React.FC<IModalWrapper> = ({
	setState,
	handleChangeUnit,
	index
}: IModalWrapper) => {
	const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
	const [initialLoad, setInitialLoad] = useState<any[]>([]);
	const [searchInput, setSearchInput] = useState('');
	const [inputFocused, setInputFocused] = useState(false);

  const node = useRef<HTMLDivElement>();

  const [open, setOpen] = useState(true);
	const { search } = useLog();

	{/* const searchFood = useCallback(async (value) => {
		if (value && value.length >= 3) {
			const { data } = await api.post(`/food-library/search`, { food_name: value });

			setSearchResult(data);
		}
	}, []);

	// Auto Focus on search bar
	let inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		// inputRef.current.focus();
	}, [inputRef]);

	useEffect(() => {
		setIsTyping(true);
		const timeoutId = setTimeout(() => {
			setIsTyping(false);
			console.log(`I can see you're not typing. I can use "${searchInput}" now!`);
			// if (value.length <= 3 && value.length !== 0) {
			//   setIsError(true);
			// } else {
			//   setIsError(false);
			// }
			searchFood(searchInput);
		}, 700);
		return () => clearTimeout(timeoutId);
	}, [searchInput]); */}

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

  useEffect(() => {
    async function initialLoad() {
      const {data} = await api.get(`/units`);
			console.log(data);
			setInitialLoad(data);
    }

		initialLoad();
	}, []);

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
								<h3>Units</h3>
							</div>
							{initialLoad && initialLoad.map((item) =>
								<SpecificUnit onClick={() => handleChangeUnit({data: item, index})} key={item.name}>
									<span>{capitalize(item.name)}s</span>
								</SpecificUnit>
							)}
						</motion.div>
					</ModalContent>
				</motion.div>
			</ModalContainer>
		</AnimateSharedLayout>
	);
};

export default SelectUnitModal;
