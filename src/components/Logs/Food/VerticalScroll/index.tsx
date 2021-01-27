import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/home";
import VerticalScrollCard from "./VerticalScrollCard";

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

export default function LogsVerticalScroll({ data }: IProps) {
	return (
		<Container>
			{data && data.map(log =>
				<VerticalScrollCard key={log.id} data={log} />
			)}
		</Container>
  )
}
