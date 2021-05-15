import useLongPress from "@/components/useLogPress";
import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/HorizontalScrollCards";
import { useRouter } from "next/router";
import { useState } from "react";
import { ILog } from ".";

interface IProps {
	data: ILog;
	handleQuickEditModal: any;
}

export default function LogsHorizontalScrollCards({ data, handleQuickEditModal }: IProps) {
	const router = useRouter();
	const {carbohydrates, proteins, fats} = data;

	const total = parseInt(carbohydrates, 10) + parseInt(proteins, 10) + parseInt(fats, 10);
	const carbPerc = (parseInt(carbohydrates, 10) / total) * 360;
	const protsPerc = (parseInt(proteins, 10) / total) * 360 + Math.floor(carbPerc);
	const fatPerc = (parseInt(fats, 10) / total) * 360 + Math.floor(carbPerc) + Math.floor(protsPerc);


  const [longPressCount, setlongPressCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)


  const onLongPress = () => {
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
    delay: 350,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

	return (
		<Container
			{...longPressEvent}
			carbPerc={Math.floor(carbPerc)}
			protsPerc={Math.floor(protsPerc)}
			fatPerc={Math.floor(fatPerc)}
			whileTap={{ scale: 0.9 }}
		>
			<div className="header">
				<h1>{data.name}</h1>
				<span>{data.hour}:{data.minute}</span>
			</div>
			<div className="details2">
				<span>{data.amount}{data.unit_abbreviation} - {data.calories}kcal</span>
			</div>
			<div className="card--macros">
				<h4 style={{ color: "#EB5757" }}>C{carbohydrates}</h4>
				<h4 style={{ color: "#2D9CDB" }}>P{proteins}</h4>
				<h4 style={{ color: "#F2C94C" }}>F{fats}</h4>
				<div className="pie"></div>
			</div>
		</Container>
  )
}
