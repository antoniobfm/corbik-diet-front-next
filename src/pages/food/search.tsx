import api from "@/services/api";
import { Container, CreateButton, Floating, Food, Foods, Header, Icon, Menu } from "@/styles/pages/food/search";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from "react";

export default function Search() {
	const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function loadFood() {
      if(searchInput && searchInput.length >= 3) {
        const {data} = await api.get(`/food-library/${searchInput}`);
        
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

  return (
    <Container>
      <Header>
        <h1>Log Food</h1>
      </Header>
      <Foods>
        {searchResult.map(result => 
          <Link key={result.id} href={`/food/${result.id}`}>
            <a>
              <Food>
                <div className="name-maker-and-quantity">
                  <div className="name-maker">
                    <h6>{result.brand}</h6>
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
        )}
        {/*<Link href={`/food/red`}>
          <a>
            <Food>
              <div className="name-maker-and-quantity">
                <div className="name-maker">
                  <h6>Natureza</h6>
                  <h4>Banana</h4>
                </div>
                <h5>100g</h5>
              </div>
              <div className="macros">
                <h5>C26   P0.3   F0.6</h5>
              </div>
            </Food>
          </a>
        </Link> */}
      </Foods>
      <Floating>
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
          <CreateButton onClick={handleClick}>CREATE FOOD</CreateButton>
        </Menu>
      </Floating>
    </Container>
  )
}