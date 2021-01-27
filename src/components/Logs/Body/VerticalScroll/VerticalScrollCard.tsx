import { Container } from "@/styles/components/Logs/Body/VerticalScroll/VerticalScrollCard";
import { Log } from "@/styles/pages/Home";
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

export default function VerticalScrollCard({ data }: IProps) {
	const router = useRouter();
	const {weight, muscle, water, fat} = data;

	return (
		<Container
			onClick={() => router.push(`/body/log/${data.id}`)}
		>
			<Log key={data.id}>
				<div className="when">
					<h5>{data.month}/{data.day}</h5>
				</div>
				<div className="name-and-quantity">
					<h4>{data.weight}</h4>
					<h5>kilos</h5>
				</div>
				<div className="macros">
					<h5>M{data.muscle}   W{data.water}   F{data.fat}</h5>
				</div>
			</Log>
		</Container>
  )
}
