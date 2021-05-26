/* eslint-disable camelcase */
import { useLog } from "@/hooks/logs";
import {api} from "@/services/apiClient";

import { BackButton } from "@/styles/components/BarcodeScannerComponent";
import { ModalContainer, ModalContent, Floating } from "@/styles/components/Modals/SelectIngredientModal";
import { Food } from "@/styles/pages/food/search";
import handleEnter from "@/utils/blurOnEnter";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { RiAddLine } from "react-icons/ri";
import CardMessage from "../Card/CardMessage";

interface IModalWrapper {
	setState: any;
	handleAddIngredient: any;
}

interface ISearchResult {
	own_library: any[];
	public_library: any[];
}

const SelectIngredientModal: React.FC<IModalWrapper> = ({
	setState,
	handleAddIngredient
}: IModalWrapper) => {
	const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
	const [initialLoad, setInitialLoad] = useState<any[]>([]);
	const [searchInput, setSearchInput] = useState('');
	const [maxPages, setMaxPages] = useState(0);
	const [isTyping, setIsTyping] = useState(false);
	const [inputFocused, setInputFocused] = useState(false);

  const node = useRef<HTMLDivElement>();

  const [open, setOpen] = useState(true);
	const { search } = useLog();

	const searchFood = useCallback(async (value) => {
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
	}, [searchInput]);

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

	function loadMore() {
		const element = document.getElementById('scroll');

		if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 5) {
			const newPages = maxPages + 1;
			setMaxPages(newPages);
		}
	}

	useEffect(() => {
		const element = document.getElementById('scroll');

		element.addEventListener('scroll', loadMore);

		return () => {
			element.removeEventListener('scroll', loadMore);
		};
	}, [maxPages]);


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
					<Floating>
						<FiSearch />
						<input
							type="text"
							ref={inputRef}
							placeholder="Search"
							onFocus={() => setInputFocused(true)}
							onBlur={() => setInputFocused(false)}
							onChange={e => setSearchInput(e.target.value)}
							onKeyDown={e => handleEnter(e)} />
					</Floating>
						<motion.div
						className="scroll"
						id="scroll"
						// drag="y"
						// dragConstraints={{bottom: 0}}
						>
							<div className="header">
								<h3>My Library</h3>
							</div>
							{searchInput ? (searchResult && searchResult.own_library.length >= 1 ? searchResult.own_library.map((result, index) =>
								<Food key={result.id} onClick={() => {handleAddIngredient(result)}}>
									<div className="name-maker-and-quantity">
										<div className="name-maker">
											<h5>{result.brand && `${result.brand}, `} {result.current_unit.amount}{result.current_unit.abbreviation}</h5>
											<h4>{result.name}</h4>
										</div>
									</div>
									<div className="macros">
										<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
									</div>
								</Food>
							) : (
								<CardMessage>
									<h4>We didn't find it here 👀<br />Check out the Public Library below</h4>
								</CardMessage>
							)
							) : (search && search.length >= 1 ? (search.map((page, indexPage) => {
								if (indexPage <= maxPages) {
								return page.map((result, index) =>
									<Food key={result.id} onClick={() => {handleAddIngredient(result)}}>
										<div className="name-maker-and-quantity">
											<div className="name-maker">
												<h5>{result.brand && `${result.brand}, `} {result.current_unit.amount}{result.current_unit.abbreviation}</h5>
												<h4>{result.name}</h4>
											</div>
										</div>
										<div className="macros">
											<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
										</div>
									</Food>
									)
									}
							}
							))
								:
								(
									<CardMessage>
										<h4>You don't have any food! (yet)<br />Get a food from the Public Library or <b onClick={() => router.push('/food/create')}>Create your own</b></h4>
									</CardMessage>
								)
							)}
					<div className="header">
						<h3>Public Library</h3>
					</div>
					{searchInput ? (searchResult && searchResult.public_library.length >= 1 ? searchResult.public_library.map(result =>
						<Food key={result.id} onClick={() => {handleAddIngredient(result)}}>
							<div className="name-maker-and-quantity">
								<div className="name-maker">
									<h5>{result.brand && `${result.brand}, `} {result.current_unit.amount}{result.current_unit.abbreviation}</h5>
									<h4>{result.name}</h4>
								</div>
							</div>
							<div className="macros">
								<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
							</div>
						</Food>
					) : (
						<CardMessage>
							<h4>We didn't find anything 😖<br />Help us out by adding it here<br /><button><div><RiAddLine size={16} /></div><span>CREATE FOOD</span></button></h4>
						</CardMessage>
					)
					) : (
						<CardMessage>
							<h4>Search something 😁</h4>
						</CardMessage>
					)}
						</motion.div>
					</ModalContent>
					{!inputFocused &&
					<BackButton onClick={() => {setState(false)}} type="button"><FiChevronDown style={{color: "#f2f2f2" }} /></BackButton>}
				</motion.div>
			</ModalContainer>
		</AnimateSharedLayout>
	);
};

export default SelectIngredientModal;
