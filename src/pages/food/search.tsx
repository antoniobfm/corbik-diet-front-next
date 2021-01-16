import BarcodeScannerComponent from "@/components/BarcodeScanner";
import GoBack from "@/components/GoBack";
import WholePageTransition from "@/components/WholePageTransition";
import api from "@/services/api";
import { Container, BarcodeButton, CreateButton, Floating, Food, Foods, Header, Icon, Menu } from "@/styles/pages/food/search";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoMdAddCircleOutline } from "react-icons/io";

export default function Search() {
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [initialLoad, setInitialLoad] = useState<any[]>([]);
	const [searchInput, setSearchInput] = useState('');

	const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function initialLoad() {
      const {data} = await api.get(`/food-library/`);
      console.log(data);
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
								type="text"
								placeholder="Search"
								onChange={e => setSearchInput(e.target.value)}
							/>
						</div>
						<BarcodeButton onClick={handleBarcode}>BARCODE</BarcodeButton>
					</Menu>
				</div>
      </Floating>
      <Header>
        <h1>Log Food</h1>
      </Header>
      <Foods>
        {searchInput ? (searchResult && searchResult.map(result =>
          <Link key={result.id} href={`/food/${result.id}`}>
            <a>
              <Food>
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
            </a>
          </Link>
        )) : (initialLoad && initialLoad.map(result =>
          <Link key={result.id} href={`/food/${result.id}`}>
            <a>
              <Food>
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
            </a>
          </Link>
        ))}
        {searchInput ? (searchResult && searchResult.map(result =>
          <Link key={result.id} href={`/food/${result.id}`}>
            <a>
              <Food>
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
            </a>
          </Link>
        )) : (initialLoad && initialLoad.map(result =>
          <Link key={result.id} href={`/food/${result.id}`}>
            <a>
              <Food>
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
            </a>
          </Link>
        ))}
      </Foods>
			{/* <CreateButton onClick={handleClick}>
				<IoMdAddCircleOutline /><br />
				CREATE FOOD
			</CreateButton> */}
    </Container>
		</WholePageTransition>
  )
}
