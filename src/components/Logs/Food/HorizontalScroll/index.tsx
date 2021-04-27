import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/home";
import React from 'react';
import LogsHorizontalScrollCards from "./HorizontalScrollCards";


export interface ILog {
	id: number;
	name: string;
	calories: string;
	carbohydrates: string;
	fats: string;
	proteins: string;
	amount: string;
	unit_abbreviation: string;

	hour: string | number;
	minute: string | number;

	food_id: string;
	user_id: string;
	when: Date;
	created_at: Date;
	updated_at: Date;
}

interface IProps {
	data: ILog[] | undefined;
}

const LogsHorizontalScroll: React.FC<IProps> = ({data}: IProps) => {

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
						<LogsHorizontalScrollCards key={log.id} data={log} />
					)}
				</div>
			</div>
		</Container>
	)
}
export default LogsHorizontalScroll;
