import { Container } from "@/styles/components/Logs/Body/HorizontalScroll/HorizontalScrollCards";
import { useRouter } from "next/router";

interface BodyLog {
	id: string;
	muscle: number;
	water: number;
	weight: number;
	fat: number;
	bones: number;
	when: string;
}

interface ILog extends BodyLog {
	month: string;
	day: string;
}

interface IProps {
	data: ILog;
}

export default function LogsHorizontalScrollCards({ data }: IProps) {
	const router = useRouter();
	const {weight, muscle, water, fat} = data;

	return (
		<Container
			onClick={() => router.push(`/body/log/${data.id}`)}
		>
			<div className="header">
				<h1>{weight}kg</h1>
				<span>{data.month}/{data.day}</span>
			</div>
			<div className="details2">
				<span></span>
			</div>
			<div className="card--macros">
				<h4 style={{ color: "#EB5757" }}>M{muscle}</h4>
				<h4 style={{ color: "#2D9CDB" }}>W{water}</h4>
				<h4 style={{ color: "#F2C94C" }}>F{fat}</h4>
				</div>
      </Container>
  )
}
