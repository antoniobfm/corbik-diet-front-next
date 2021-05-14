import { Container } from "@/styles/components/Logs/Food/HorizontalScroll/home";
import { ILog } from "../HorizontalScroll";
import VerticalScrollCard from "./VerticalScrollCard";

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
