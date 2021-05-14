import { Container } from "@/styles/components/Logs/Body/HorizontalScroll/home";
import Food from "./Food";

interface ILog {
	id: number;
	name: string;
	calories: string;
	carbohydrates: string;
	fats: string;
	proteins: string;
	amount: string;

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

export default function Ingredients({ data }: IProps) {
	return (
		<Container
		initial={{ opacity: 0, height: 80 }}
		animate={{ opacity: 1, height: 'auto' }}
		transition={{ duration: 0.3 }}
		exit={{ opacity: 0 }}>
			{data && data.map(log =>
				<Food key={log.id} data={log} />
			)}
		</Container>
  )
}
