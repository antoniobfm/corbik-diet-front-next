import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/home";
import React, { CanvasHTMLAttributes, Component, createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import LogsHorizontalScrollCards from "./HorizontalScrollCards";


interface ILog {
	id: number;
	name: string;
	calories: string;
	carbohydrates: string;
	fats: string;
	proteins: string;
	quantity_amount: string;
	quantity_type: string;

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
		<Container>
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
