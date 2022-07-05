import useLongPress from "@/components/useLogPress";
import { ILog } from "@/redux/Food/diet.reducer";
import { RootState } from "@/redux/store";
import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/HorizontalScrollCards";
import { isSameDay, parseISO } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface IProps {
	data: ILog;
	handleQuickEditModal: any;
}

export default function LogsHorizontalScrollCards({ data, handleQuickEditModal }: IProps) {
	const router = useRouter();
	const {carbohydrates, proteins, fats} = data.macros;

	const total = useMemo(() => parseInt(carbohydrates, 10) + parseInt(proteins, 10) + parseInt(fats, 10), []);
	const carbPerc = useMemo(() => (parseInt(carbohydrates, 10) / total) * 360, []);
	const protsPerc = useMemo(() => (parseInt(proteins, 10) / total) * 360 + Math.floor(carbPerc), []);
	const fatPerc = useMemo(() => (parseInt(fats, 10) / total) * 360 + Math.floor(carbPerc) + Math.floor(protsPerc), []);

  const [longPressCount, setlongPressCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

	const logData = useSelector((state: RootState) => state.food.logs.filter(log => isSameDay(parseISO(log.date.full), new Date())));

  const onLongPress = (event) => {
		// router.push(`/log/edit/${data.id}`)
		handleQuickEditModal(
			{
				id: data.id,
				name: data.name,
				brand: data.brand,
				//
				amount: data.amount,
				unit_name: data.unit_abbreviation,
				//
				day: data.day,
				month: data.month,
				year: data.year,
				hour: data.hour,
				minute: data.minute,
				when: data.when,
			});
    setlongPressCount(longPressCount + 1);
  };

  const onClick = () => {
    console.log('click is triggered')
		router.push(`/log/edit/${data.id}`)
    setClickCount(clickCount + 1);
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    timeToBeClick: 350,
		timeToOpenModal: 650
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

	return (
		<Container
			{...longPressEvent}
			id={`${data.id}`}
			carbPerc={Math.floor(carbPerc)}
			protsPerc={Math.floor(protsPerc)}
			fatPerc={Math.floor(fatPerc)}
			whileTap={{ scale: 0.9 }}
		>
			<div className="header">
				<h1>{data.food.name}</h1>
				<span>{data.date.hour}:{data.date.minute}</span>
			</div>
			<div className="details2">
				<span>{data.amount}{data.unit_abbreviation} - {data.macros.calories}kcal</span>
			</div>
			<div className="card--macros">
				<h4 style={{ color: "#EB5757" }}>C{data.macros.carbohydrates}</h4>
				<h4 style={{ color: "#2D9CDB" }}>P{data.macros.proteins}</h4>
				<h4 style={{ color: "#F2C94C" }}>F{data.macros.fats}</h4>
				<div className="pie"></div>
			</div>
		</Container>
  )
}
