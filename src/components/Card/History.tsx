
import { Details } from "@/styles/pages/log/edit/edit";
import { useCallback, useEffect, useRef, useState } from "react";
import CardMessage from "@/components/Card/CardMessage";

interface IFoodVersion {
	food_id: string;
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	quantity_amount: number;
	quantity_type: string;
}

interface IFood {
	food_id: string;
	name: string;
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	quantity_amount: number;
	quantity_type: string;
	when: Date;
	food: any;
}

interface IProps {
	foodHistory: any[];
}


const History: React.FC<IProps> = ({ foodHistory }: IProps) => {
	const [collapse, setCollapse] = useState(true);

	return (
		<Details hasContent={!!foodHistory}>
			<div className="header">
				<h3>History</h3>
				{!foodHistory || foodHistory.length === 0 && <h4>You haven't logged this food yet</h4>}
			</div>
			<div className="history__container">
				{foodHistory && foodHistory.length >= 1 && foodHistory.map(log =>
					<div className="history__item">
						<div className="history__item__title">
							{log.when}
						</div>
						<div className="history__item__subtitle">
							{log.amount}
							{/* {foodHistory.foodUnit.unitDefault.abbreviation} */}
						</div>
					</div>
				)
				}
			</div>
		</Details>
	);
}
export default History;
