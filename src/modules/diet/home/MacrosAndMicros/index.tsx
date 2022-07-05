import { RootState } from '@/redux/store';
import { Calories, Macro, Macros } from '@/styles/pages/Home';
import { isSameDay, parseISO } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDietHome } from '../DietHomeContext';

// import { Container } from './styles';

const MacrosAndMicros: React.FC = (date) => {
	const { dayResume } = useDietHome()

	const logData = useSelector((state:RootState) => state.food.logs.filter(item => isSameDay(parseISO(item.date.full), new Date())))
	const user = useSelector((state:RootState) => state.user.targets);

	if (user)
	return (
	<>
		<Macros>
		<Macro macro="carb">
			<div>
				<h4>Carbs</h4>
				<span>
					{dayResume ? dayResume.carbohydrates : `0`}
					{user && user.carbohydrates && (
						<span>/{parseInt(user.carbohydrates)}</span>
					)}
				</span>
			</div>
			<progress
				id="carbs"
				value={dayResume ? dayResume.carbohydrates : `0`}
				max={user && user.carbohydrates}
			>
				30%
			</progress>
		</Macro>
		<Macro macro="protein">
			<div>
				<h4>Prots</h4>
				<span>
					{dayResume ? dayResume.proteins : `0`}
					{user && user.proteins && (
						<span>/{parseInt(user.proteins)}</span>
					)}
				</span>
			</div>
			<progress
				id="carbs"
				value={dayResume ? dayResume.proteins : `0`}
				max={user && user.proteins}
			>
				30%
			</progress>
		</Macro>
		<Macro macro="fat">
			<div>
				<h4>Fat</h4>
				<span>
					{dayResume ? dayResume.fats : `0`}
					{user && user.fats && <span>/{parseInt(user.fats)}</span>}
				</span>
			</div>
			<progress
				id="carbs"
				value={dayResume ? dayResume.fats : `0`}
				max={user && user.fats}
			>
				30%
			</progress>
		</Macro>
	</Macros>
	<Calories>
		<div>
			<h4>Calories</h4>
			<span>
				{dayResume ? dayResume.calories : `0`}
				{user && user.calories && (
					<span>/{parseInt(user.calories)}</span>
				)}
			</span>
		</div>
		<progress
			id="carbs"
			value={dayResume ? dayResume.calories : `0`}
			max={user && user.calories}
		>
			30%
		</progress>
	</Calories>
	</>
	)

	return (<h1>a</h1>)
}

export default MacrosAndMicros;
