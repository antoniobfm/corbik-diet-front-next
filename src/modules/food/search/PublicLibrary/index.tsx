import {Food} from "@/styles/pages/food/search";
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';
import { useSearchContext } from "../SearchContext";
import CardMessage from "@/components/Card/CardMessage";
import { RiAddLine } from "react-icons/ri";



const PublicLibrary: React.FC = ({}) => {
	const router = useRouter();

	const {searchInput, searchResult} = useSearchContext();

	if (searchInput.length >= 3 && searchResult && searchResult.public_library.length >= 1) {
		return (
		searchResult.public_library.map((food, index) =>
		<Food key={food.id} onClick={() => router.push(`/food/${food.id}`)}>
			<div className="name-maker-and-quantity">
				<div className="name-maker">
					<h5>{food.brand && `${food.brand}, `} {food.current_unit.amount}{food.current_unit.abbreviation}</h5>
					<h4>{food.name}</h4>
				</div>
			</div>
			<div className="macros">
				<h5>C{food.carbohydrates}   P{food.proteins}   F{food.fats}</h5>
			</div>
		</Food>
		))
	} else if (searchInput.length >= 3) {
		return (
			<CardMessage>
				<h4>We didn't find anything 😖<br />Help us out by adding it here<br /><button><div><RiAddLine size={16} /></div><span>CREATE FOOD</span></button></h4>
			</CardMessage>
		)
	} else {
		return (
			<CardMessage>
				<h4>Search something 😁</h4>
			</CardMessage>
		)
	}
}

export default PublicLibrary;
