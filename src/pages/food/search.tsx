import BarcodeScannerComponent from "@/components/BarcodeScanner";
import WholePageTransition from "@/components/WholePageTransition";
import {api} from "@/services/apiClient";
import { Container, BarcodeButton, CreateButton, Floating, Food, Foods, Header, Icon, Menu, Floating2 } from "@/styles/pages/food/search";
import CardMessage from '@/components/Card/CardMessage';
import handleEnter from "@/utils/blurOnEnter";
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from "react";
import Menu2 from '@/components/Menu';
import { IoBarcodeOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import { useLog } from "@/hooks/logs";
import Head from "next/head";
import { withSSRAuth } from "@/utils/withSSRAuth";

interface ISearchResult {
	own_library: any[];
	public_library: any[];
}

export default function Search() {
	const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
	const [searchInput, setSearchInput] = useState<string | null>(null);
	const [isTyping, setIsTyping] = useState(false);
	const [maxPages, setMaxPages] = useState(0);

	const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

	const router = useRouter();
	const { search } = useLog();

	useEffect(() => {
		setShowBarcodeScanner(false);
	}, []);

	const searchFood = useCallback(async (value) => {
		if (value && value.length >= 3) {
			const { data } = await api.post(`/food-library/search`, { food_name: value });

			setSearchResult(data);
		}
	}, []);

	const handleClick = useCallback((e) => {
		e.preventDefault()
		router.push('/food/create');
	}, []);

	const handleBarcode = useCallback((e) => {
		e.preventDefault();
		setShowBarcodeScanner(true);
	}, []);

	// Auto Focus on search bar
	let inputRef = useRef<HTMLInputElement>();

	// useEffect(() => {
	// 	inputRef.current.focus();
	// }, [inputRef]);

	function loadMore() {
		if (window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight - 5) {
			const newPages = maxPages + 1;
			setMaxPages(newPages);
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', loadMore);

		return () => {
			window.removeEventListener('scroll', loadMore);
		};
	}, [maxPages]);

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

	return (
		<>
			<Head>
				<title>Search Food {'&'} Recipes | Corbik</title>
			</Head>
			{showBarcodeScanner &&
				<BarcodeScannerComponent setVisibility={setShowBarcodeScanner} />
			}
			<Menu2 currentRoute="Search" />
			<Container>
				<Header>
					<h1>Log Food</h1>
					<button onClick={() => { router.push('/food/create') }}>
						CREATE FOOD
					</button>
				</Header>
				<Floating2>
					<div>
						<Menu>
							<div className="search">
								<div className="icon">
									{isTyping ? <div className="lds-dual-ring"></div> : <Icon size={16} />}
								</div>
								<input
									ref={inputRef}
									type="search"
									placeholder="Search"
									onChange={e => setSearchInput(e.target.value)}
									onKeyDown={e => handleEnter(e)}
								/>
							</div>
							<BarcodeButton onClick={handleBarcode}><div><IoBarcodeOutline /></div><span>BARCODE</span></BarcodeButton>
						</Menu>
					</div>
				</Floating2>
				<Foods>
					<div className="header">
						<h3>My Library</h3>
					</div>
					{searchInput ? (searchResult && searchResult.own_library.length >= 1 ? searchResult.own_library.map((result, index) =>
						<Food key={result.id} onClick={() => router.push(`/food/${result.id}`)}>
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
							<Food key={result.id} onClick={() => router.push(`/food/${result.id}`)}>
								<div className="name-maker-and-quantity">
									<div className="name-maker">
										<h5>{result.brand && `${result.brand}, `} {result.current_unit.amount}{result.current_unit.abbreviation}</h5>
										<h4>{result.name}</h4>
									</div>
								</div>
								<div className="macros">
									<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
								</div>
							</Food>)
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
				</Foods>
				<Foods>
					<div className="header">
						<h3>Public Library</h3>
					</div>
					{searchInput ? (searchResult && searchResult.public_library.length >= 1 ? searchResult.public_library.map(result =>
						<Food key={result.id} onClick={() => router.push(`/food/${result.id}`)}>
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
				</Foods>
			</Container>
		</>
	)
}

export const getServerSideProps = withSSRAuth(async ctx => {
	return {
		props: {}
	}
})
