import { Container } from "@/styles/components/Menu";
import { useRouter } from "next/router";
import { IoIosAdd, IoIosBody, IoIosFitness, IoIosHome, IoIosRestaurant, IoMdBody, IoMdHome, IoMdRestaurant } from 'react-icons/io';
import { Button } from "@/styles/components/Menu";

interface IMenuProps {
	currentRoute: string;
}

const Menu = ({ currentRoute }: IMenuProps) => {
  const router = useRouter();

  return (
		<Container>
			<Button type="button" onClick={() => {}} isSelected={'Home' === currentRoute}>
				<IoIosHome />
			</Button>
			<Button type="button" onClick={() => {}} isSelected={'Body' === currentRoute}>
				<IoIosBody />
			</Button>
			<Button type="button" onClick={() => {}} isSelected={'Diet' === currentRoute}>
				<IoIosRestaurant />
			</Button>
			<Button type="button" onClick={() => {}} isSelected={'Lifting' === currentRoute}>
				<IoIosFitness />
			</Button>
			<Button type="button" onClick={() => router.push('/food/search')} isSelected={'Add' === currentRoute} id="add">
				<IoIosAdd />
			</Button>
		</Container>
  )
}

export default Menu;
