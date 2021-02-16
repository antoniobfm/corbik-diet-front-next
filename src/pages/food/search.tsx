import BarcodeScannerComponent from "@/components/BarcodeScanner";
import Button from "@/components/FormComponents/Button";
import GoBack from "@/components/GoBack";
import WholePageTransition from "@/components/WholePageTransition";
import api from "@/services/api";
import { Container, BarcodeButton, CreateButton, Floating, Food, Foods, Header, Icon, Menu } from "@/styles/pages/food/search";
import CardMessage from '@/components/Card/CardMessage';
import handleEnter from "@/utils/blurOnEnter";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from "react";
import { IoBarcodeOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import IndexedDb from '../../utils/Indexed'
import { useLog } from "@/hooks/logs";

interface ISearchResult {
	own_library: any[];
	public_library: any[];
}

export default function Search() {
	const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
	const [initialLoad, setInitialLoad] = useState<any[] | null>(null);
	const [searchInput, setSearchInput] = useState<string | null>(null);

	const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const router = useRouter();
	const initial = useLog().logs;

  useEffect(() => {
    async function initialLoad() {
			const indexedDb = new IndexedDb('test');
			await indexedDb.createObjectStore(['books', 'initialLoadSearch']);
			const items = await indexedDb.getAllValue('books');

			if (items.length >= 1) {
				const cachedData = await indexedDb.getAllValue('books');
				setInitialLoad(cachedData);
			}

      const {data} = await api.get(`/food-library/`);

			await indexedDb.putBulkValue('books', data);
      setInitialLoad(data);
    }

		initialLoad();
		setShowBarcodeScanner(false);
  }, []);

  useEffect(() => {
    async function loadFood() {
      if(searchInput && searchInput.length >= 3) {
        const {data} = await api.post(`/food-library/search`, { food_name: searchInput });

        console.log(data);

				setSearchResult(data);
      }
    }

    loadFood();
  }, [searchInput]);

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

  useEffect(() => {
		inputRef.current.focus();
  }, [inputRef]);

  return (
		<WholePageTransition>
		{showBarcodeScanner &&
			<BarcodeScannerComponent setVisibility={setShowBarcodeScanner} />
		}
    <Container>
      <Floating>
				<div>
					<Menu>
						<div className="search">
							<div className="icon">
								<Icon size={16} />
							</div>
							<input
        				ref={inputRef}
								type="text"
								placeholder="Search"
								onChange={e => setSearchInput(e.target.value)}
								onKeyDown={e => handleEnter(e)}
							/>
						</div>
						<BarcodeButton onClick={handleBarcode}><div><IoBarcodeOutline /></div><span>BARCODE</span></BarcodeButton>
					</Menu>
				</div>
      </Floating>
      <Header>
        <h1>Log Food</h1>
				<button onClick={() => {router.push('/food/create')}}>
					CREATE FOOD
				</button>
      </Header>
      <Foods>
				<div className="header">
					<h3>My Library</h3>
				</div>
        {searchInput ? (searchResult && searchResult.own_library.length >= 1 ? searchResult.own_library.map(result =>
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
						<h4>We didn't find it here 👀<br />Check out the Public Library below</h4>
					</CardMessage>
				)
				) : (initial && initial.length >= 1 ? (initial.map(result =>
					<Food key={result.id} onClick={() => router.push(`/food/${result.id}`)}>
						<div className="name-maker-and-quantity">
							<div className="name-maker">
								<h5>{result.brand && `${result.brand}, `} {result.quantity_amount}g</h5>
								<h4>{result.name}</h4>
							</div>
						</div>
						<div className="macros">
							<h5>C{result.carbohydrates}   P{result.proteins}   F{result.fats}</h5>
						</div>
					</Food>))
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
		</WholePageTransition>
  )
}
