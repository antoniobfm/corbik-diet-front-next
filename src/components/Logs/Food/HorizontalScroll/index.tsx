import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/home";
import React from 'react';
import LogsHorizontalScrollCards from "./HorizontalScrollCards";


export interface ILog {
	food_id: string;
	user_id: string;
	//
	id: number;
	name: string;
	brand: string;
	//
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
	//
	amount: string;
	unit_abbreviation: string;
	//
	day: string;
	month: string;
	year: string;
	hour: string | number;
	minute: string | number;
	//
	when: Date;
	//
	created_at: Date;
	updated_at: Date;
}

interface IProps {
	data: ILog[] | undefined;
	handleQuickEditModal: any;
}

const LogsHorizontalScroll: React.FC<IProps> = ({data, handleQuickEditModal}: IProps) => {

	return (
		<Container
			initial={{ opacity: 0, height: data.length * 64 }}
			animate={{ opacity: 1, height: 80 }}
			transition={{ duration: 0.3 }}
			exit={{ opacity: 0 }}
		>
			<div className="scrolly2">
				<div className="scrolly-container">
					{data && data.map(log =>
						<LogsHorizontalScrollCards key={log.id} data={log} handleQuickEditModal={handleQuickEditModal} />
					)}
				</div>
			</div>
		</Container>
	)
}
export default LogsHorizontalScroll;
