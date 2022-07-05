import {Food} from "@/styles/pages/food/search";
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';
import { useSearchContext } from "../SearchContext";
import CardMessage from "@/components/Card/CardMessage";



const MyLibrary: React.FC = ({}) => {
	const ownLibrary = useSelector((state: RootState) => state.food.own_library)
	const router = useRouter();

	const {searchInput, searchResult} = useSearchContext();

	if (searchInput.length >= 3 && searchResult &&  searchResult.own_library.length >= 1) {
		return (
		searchResult.own_library.map((food, index) =>
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
			<h4>We didn't find it here 👀<br />Check out the Public Library below</h4>
		</CardMessage>
		)
	}

	if (ownLibrary) {
		return (
			<Container>
			{ownLibrary.map((food, index) =>
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
			)}
		</Container>
		)
	} else {
		<CardMessage>
			<h4>You don't have any food! (yet)<br />Get a food from the Public Library or <b onClick={() => router.push('/food/create')}>Create your own</b></h4>
		</CardMessage>
	}
}

export default MyLibrary;
