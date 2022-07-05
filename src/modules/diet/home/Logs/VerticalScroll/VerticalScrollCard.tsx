import { ILog } from "@/redux/Food/diet.reducer";
import { Container } from "@/styles/components/Logs/Food/VerticalScroll/VerticalScrollCard";
import { Log } from "@/styles/pages/Home";
import { getHours, getMinutes, parseISO } from "date-fns";
import { useRouter } from "next/router";

interface IProps {
	data: ILog;
}

export default function VerticalScrollCard({ data }: IProps) {
	const router = useRouter();
	const {carbohydrates, proteins, fats} = data.macros;

	return (
		<Container
			onClick={() => router.push(`/log/edit/${data.id}`)}
		>
			<Log key={data.id} onClick={() => router.push(`/log/edit/${data.id}`)}>
				<div className="when">
					<h5>{getHours(parseISO(data.date.full))}:{getMinutes(parseISO(data.date.full))}</h5>
				</div>
				<div className="name-and-quantity">
					<h4>{data.food.name}</h4>
					<h5>{data.amount}{data.unit_abbreviation}</h5>
				</div>
				<div className="macros">
					<h5>C{carbohydrates}   P{proteins}   F{fats}</h5>
				</div>
			</Log>
		</Container>
  )
}
