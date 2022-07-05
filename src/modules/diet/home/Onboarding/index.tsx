import { RootState } from '@/redux/store';
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { CardContent, CardHeader,  Mission, WideCardContainer } from './styles';

const Onboarding: React.FC = () => {

	const user = useSelector((state: RootState) => state.user.targets);

	return (
			<WideCardContainer>
			<CardHeader>
				<h3>Welcome to the diet page</h3>
				<p>
					Your diet is everything you eat, inside or outside of your
					planning.
				</p>
			</CardHeader>
			<CardContent>
				<h4>Getting started</h4>
				<div id="missions-container">
					<Mission isDone={true}>
						<div className="is-done">
							<FiCheck />
						</div>
						<h5>Create your first food</h5>
					</Mission>
					<Mission
						isDone={user && (
							!!user.calories &&
							!!user.carbohydrates &&
							!!user.proteins &&
							!!user.carbohydrates &&
							!!user.fats)
						}
					>
						<div className="is-done">
							<FiCheck />
						</div>
						<h5>Add your first food log</h5>
					</Mission>
					<Mission
						isDone={user && (
							!!user.calories &&
							!!user.carbohydrates &&
							!!user.proteins &&
							!!user.carbohydrates &&
							!!user.fats)
						}
					>
						<div className="is-done">
							<FiCheck />
						</div>
						<h5>Set your macro’s target</h5>
					</Mission>
				</div>
			</CardContent>
		</WideCardContainer>
	)
}

export default Onboarding;
