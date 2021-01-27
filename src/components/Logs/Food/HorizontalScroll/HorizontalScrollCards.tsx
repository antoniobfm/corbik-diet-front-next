import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/HorizontalScrollCards";
import { useRouter } from "next/router";

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
	data: ILog;
}

export default function LogsHorizontalScrollCards({ data }: IProps) {
	const router = useRouter();
	const {carbohydrates, proteins, fats} = data;

	const total = parseInt(carbohydrates, 10) + parseInt(proteins, 10) + parseInt(fats, 10);
	const carbPerc = (parseInt(carbohydrates, 10) / total) * 360;
	const protsPerc = (parseInt(proteins, 10) / total) * 360 + Math.floor(carbPerc);
	const fatPerc = (parseInt(fats, 10) / total) * 360 + Math.floor(carbPerc) + Math.floor(protsPerc);
console.log(data);
	return (
		<Container
			onClick={() => router.push(`/log/edit/${data.id}`)}
			carbPerc={Math.floor(carbPerc)}
			protsPerc={Math.floor(protsPerc)}
			fatPerc={Math.floor(fatPerc)}
		>
			<div className="header">
				<h1>{data.name}</h1>
				<span>{data.hour}:{data.minute}</span>
			</div>
			<div className="details2">
				<span>{data.quantity_amount}g - {data.calories}kcal</span>
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
