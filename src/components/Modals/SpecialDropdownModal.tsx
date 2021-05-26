/* eslint-disable camelcase */
import {api} from "@/services/apiClient";

import { BackButton } from "@/styles/components/BarcodeScannerComponent";
import { ModalContainer, ModalContent, Floating } from "@/styles/components/Modals/SpecialDropdownModal";
import { Food } from "@/styles/pages/food/search";
import handleEnter from "@/utils/blurOnEnter";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, {
	useEffect,
	useRef,
	useState,
} from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

interface IModalWrapper {
	setState: any;
	logData: any;
}

const SpecialDropdownModal: React.FC<IModalWrapper> = ({
	setState,
	logData
}: IModalWrapper) => {
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [initialLoad, setInitialLoad] = useState<any[]>([]);
	const [searchInput, setSearchInput] = useState('');
	const [selected, setSelected] = useState(logData);

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

  useEffect(() => {
    async function initialLoad() {
      const {data} = await api.get(`/food-library/`);
			console.log(data);
			setTimeout(function(){
				setInitialLoad(data);
		}, 500);
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
				<div className="Special__Select">
					<div>
						<h3>{selected ? selected.name : <Skeleton height={30} width={200} />}</h3>
						<h5>{selected ? selected.brand : <Skeleton height={20} width={90} />}</h5>
					</div>
					<div className="Special__Select__DropdownIndicator">
						<h5>CURRENT</h5>
					</div>
				</div>
					<ModalContent>
					<Floating>
						<FiSearch />
						<input type="text" placeholder="Search" onKeyDown={(event) => handleEnter(event)} />
					</Floating>
						<div className="scroll">
							{searchInput ? (searchResult && searchResult.map(result =>
								<Food onClick={() => {setSelected(result)}}>
									<div className="name-maker-and-quantity">
										<div className="name-maker">
											<h5>{result.brand}</h5>
											<h4>{result.name}</h4>
										</div>
										<h5>{result.quantity_amount}g</h5>
									</div>
									<div className="macros">
										<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
									</div>
								</Food>
							)) : (initialLoad && initialLoad.map(result =>
								<Food onClick={() => {setSelected(result)}}>
									<div className="name-maker-and-quantity">
										<div className="name-maker">
											<h5>{result.brand}</h5>
											<h4>{result.name}</h4>
										</div>
										<h5>{result.quantity_amount}g</h5>
									</div>
									<div className="macros">
										<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
									</div>
								</Food>
							))}
						</div>
					</ModalContent>
					<BackButton onClick={() => {setState(false)}} type="button"><FiChevronDown style={{color: "#f2f2f2" }} /></BackButton>
				</motion.div>
			</ModalContainer>
		</AnimateSharedLayout>
	);
};

export default SpecialDropdownModal;
