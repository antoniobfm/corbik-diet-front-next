import { Container } from "@/styles/components/Card/Details";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";

interface IProps {
	data: any;
	name: string;
	dataName: string;
	hasContent: boolean;
}

export const Details: React.FC<IProps> = ({data, name, hasContent, dataName}: IProps) => {
	const [shouldExpand, setShouldExpand] = useState(false);

	const handleShouldExpand = useCallback(() => {
		setShouldExpand(!shouldExpand)
	}, [shouldExpand]);

	return (
		<Container hasContent={hasContent} onClick={handleShouldExpand}>
			<div className="header">
				<h3>{name}</h3>
				{!data || data.length === 0 && <h4>Doesn't have data</h4>}
				{data && data.length >= 1 && !shouldExpand && <h4>{data.length}</h4>}
			</div>
			{shouldExpand &&
			<div className="history__container">
				{data && data.length >= 1 && data.map(ingredient =>
					<div className="history__item">
						<div className="history__item__title">
							{ingredient[dataName]}
						</div>
						<div className="history__item__subtitle">
							{ingredient.amount}
						</div>
					</div>
				)
				}
			</div>}
		</Container>
	)
}
