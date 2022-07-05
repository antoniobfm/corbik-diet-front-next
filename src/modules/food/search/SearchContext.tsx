/* eslint-disable camelcase */
import { api } from '@/services/apiClient'
import { useRouter } from 'next/router'
import React, {
	createContext,
	useCallback,
	useState,
	useContext,
	useEffect,
	useMemo,
	SetStateAction,
	Dispatch
} from 'react'

interface SearchContextData {
	 searchResult: any
	 searchInput: string
	 setSearchInput: any

	 isTyping: boolean
	 setIsTyping: any
}

const SearchContext = createContext<SearchContextData>(
	{
		searchResult: []
	} as SearchContextData
)

const SearchProvider: React.FC = ({ children }) => {
	const [searchResult, setSearchResult] = useState<any>()
	const [searchInput, setSearchInput] = useState<string>('')
	const [isTyping, setIsTyping] = useState(false);
	const router = useRouter()

	useEffect(() => {
		setIsTyping(true);
		const timeoutId = setTimeout(() => {
			setIsTyping(false);
			searchFood(searchInput);
		}, 700);
		return () => clearTimeout(timeoutId);
	}, [searchInput]);

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

	console.log(searchResult)

	return (
		<SearchContext.Provider value={{searchResult: searchResult, isTyping, setIsTyping, searchInput, setSearchInput: setSearchInput}}>
			{children}
		</SearchContext.Provider>
	)
}

function useSearchContext(): SearchContextData {
	const context = useContext(SearchContext)

	if (!context) {
		throw new Error(
			'useSearchContext must be used within an SearchProvider'
		)
	}

	return context
}

export {
	SearchContext,
	SearchProvider,
	useSearchContext
}
