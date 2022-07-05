import BarcodeScannerComponent from "@/components/BarcodeScanner";
import WholePageTransition from "@/components/WholePageTransition";
import {api} from "@/services/apiClient";
import { Container, BarcodeButton, CreateButton, Floating, Food, Foods, Header, Icon, Menu, Floating2 } from "@/styles/pages/food/search";
import CardMessage from '@/components/Card/CardMessage';
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from "react";
import Menu2 from '@/components/Menu';
import { IoBarcodeOutline } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import { useLog } from "@/hooks/logs";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MyLibrary from "@/modules/food/search/MyLibrary";
import { SearchContext, SearchProvider, useSearchContext } from "@/modules/food/search/SearchContext";
import TopSearch from "@/modules/food/search/TopSearch";
import PublicLibrary from "@/modules/food/search/PublicLibrary";

interface ISearchResult {
	own_library: any[];
	public_library: any[];
}

export default function Search() {
	const [maxPages, setMaxPages] = useState(0);

	const router = useRouter();

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

	return (
		<SearchProvider>
			<Head>
				<title>Search Food {'&'} Recipes | Corbik</title>
			</Head>
			<Menu2 currentRoute="Search" />
			<Container>
				<Header>
					<h1>Log Food</h1>
					<button onClick={() => { router.push('/food/create') }}>
						CREATE FOOD
					</button>
				</Header>
				<TopSearch />
				<Foods>
					<div className="header">
						<h3>My Library</h3>
					</div>
					<MyLibrary />
				</Foods>
				<Foods>
					<div className="header">
						<h3>Public Library</h3>
					</div>
					<PublicLibrary />
				</Foods>
			</Container>
		</SearchProvider>
	)
}
