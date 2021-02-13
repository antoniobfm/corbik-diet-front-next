import { Container } from "@/styles/components/Card/CardMessage";

interface ICardMessageProps {
	children?: React.ReactNode | undefined;
	borderBottom?: boolean;
}

const CardMessage = ({ children, borderBottom = true }: ICardMessageProps) => {
  return (
		<Container borderBottom={borderBottom}>
			{children}
		</Container>
  )
}

export default CardMessage;
