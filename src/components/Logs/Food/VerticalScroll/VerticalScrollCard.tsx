import { Container } from "@/styles/components/Logs/Food/VerticalScroll/VerticalScrollCard";
import { Log } from "@/styles/pages/Home";
import { useRouter } from "next/router";
import { ILog } from "../HorizontalScroll";

interface IProps {
	data: ILog;
}

export default function VerticalScrollCard({ data }: IProps) {
	const router = useRouter();
	const {carbohydrates, proteins, fats} = data;

	return (
		<Container
			onClick={() => router.push(`/log/edit/${data.id}`)}
		>
			<Log key={data.id} onClick={() => router.push(`/log/edit/${data.id}`)}>
				<div className="when">
					<h5>{data.hour}:{data.minute}</h5>
				</div>
				<div className="name-and-quantity">
					<h4>{data.name}</h4>
					<h5>{data.amount}{data.unit_abbreviation}</h5>
				</div>
				<div className="macros">
					<h5>C{carbohydrates}   P{proteins}   F{fats}</h5>
				</div>
			</Log>
		</Container>
  )
}
