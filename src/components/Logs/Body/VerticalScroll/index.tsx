import { Container } from "@/styles/components/Logs/Body/HorizontalScroll/home";
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
		<Container
		initial={{ opacity: 0, height: 80 }}
		animate={{ opacity: 1, height: 'auto' }}
		transition={{ duration: 0.3 }}
		exit={{ opacity: 0 }}>
			{data && data.map(log =>
				<VerticalScrollCard key={log.id} data={log} />
			)}
		</Container>
  )
}
