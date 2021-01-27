import { Container } from "@/styles/components/Logs/Food/VerticalScroll/VerticalScrollCard";
import { Log } from "@/styles/pages/Home";
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
					<h5>{data.quantity_amount}g</h5>
				</div>
				<div className="macros">
					<h5>C{carbohydrates}   P{proteins}   F{fats}</h5>
				</div>
			</Log>
		</Container>
  )
}
