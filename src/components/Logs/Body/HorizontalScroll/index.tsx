import { Container } from "@/styles/components/Logs/Body/HorizontalScroll/home";
import LogsHorizontalScrollCards from "./HorizontalScrollCards";

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

export default function LogsHorizontalScroll({ data }: IProps) {
	return (
		<Container
			// initial={{ opacity: 0, height: data.length * 64 }}
			initial={{ opacity: 1, height: 80 }}
			animate={{ opacity: 1, height: 80 }}
			transition={{ duration: 0.3 }}
			exit={{ opacity: 0 }}>
			<div className="scrolly2">
			<div className="scrolly-container">
				{data && data.map(log =>
					<LogsHorizontalScrollCards key={log.id} data={log} />
				)}
			</div>
			</div>
		</Container>
  )
}
