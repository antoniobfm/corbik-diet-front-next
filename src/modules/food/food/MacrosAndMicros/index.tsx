import React from 'react';

import { Calories, Macro, Macros } from "@/styles/pages/Home";
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface IMacrosAndMicrosProps {
	carbs: number;
	prots: number;
	fats: number;
	calories: number;
}

const MacrosAndMicros: React.FC<IMacrosAndMicrosProps> = ({carbs, prots, fats, calories}: IMacrosAndMicrosProps) => {

	const user = useSelector((state: RootState) => state.user.targets)

	return (
			<>
				<Macros>
				<Macro macro="carb">
					<div>
						<h4>Carbs</h4>
						<span>{carbs ? carbs : '0'}</span>
					</div>
					<progress id="carbs" value={carbs ? carbs : '0'} max={user ? user.carbohydrates : '0'}>30%</progress>
				</Macro>
				<Macro macro="protein">
					<div>
						<h4>Protein</h4>
						<span>{prots ? prots : '0'}</span>
					</div>
					<progress id="prots" value={prots ? prots : '0'} max={user ? user.proteins : '0'}>30%</progress>
				</Macro>
				<Macro macro="fat">
					<div>
						<h4>Fat</h4>
						<span>{fats ? fats : '0'}</span>
					</div>
					<progress id="fats" value={fats ? fats : '0'} max={user ? user.fats : '0'}>30%</progress>
				</Macro>
			</Macros>
			<Calories>
				<div>
					<h4>Calories</h4>
					<span>{calories ? calories : '0'}</span>
				</div>
				<progress id="calories" value={calories ? calories : '0'} max={user ? user.calories : '0'}>30%</progress>
			</Calories>
		</>
	)
}

export default MacrosAndMicros;
