import { Container } from "@/styles/components/Menu";
import { useRouter } from "next/router";
import { IoAdd, IoBarbell, IoBody, IoHome, IoRestaurant } from 'react-icons/io5';
import { RiAddLine } from 'react-icons/ri'
import { Button } from "@/styles/components/Menu";

interface IMenuProps {
	currentRoute: string;
}

const Menu = ({ currentRoute }: IMenuProps) => {
  const router = useRouter();

  return (
		<Container>
			<Button
			type="button"
			onClick={() => router.push('/home')}
			isSelected={'Home' === currentRoute}>
				<IoHome />
			</Button>

			<Button
			type="button"
			onClick={() => router.push('/body')}
			isSelected={'body' === currentRoute}>
				<IoBody />
			</Button>
			{'Home' === currentRoute &&
				<Button type="button" onClick={() => router.push('/body/log/add')} isSelected={false} id="add">
					<RiAddLine size={18} />
				</Button>
			}
			{'Diet' === currentRoute &&
				<Button type="button" onClick={() => router.push('/food/search')} isSelected={false} id="add">
					<RiAddLine size={18} />
				</Button>
			}
			{'body' === currentRoute &&
				<Button type="button" onClick={() => router.push('/body/log/add')} isSelected={false} id="add">
					<RiAddLine size={18} />
				</Button>
			}

			<Button
			type="button"
			onClick={() => router.push('/')}
			isSelected={'Diet' === currentRoute}>
				<IoRestaurant />
			</Button>

			<Button
			type="button"
			onClick={() => {}}
			isSelected={'Lifting' === currentRoute}>
				<IoBarbell />
			</Button>
		</Container>
  )
}

export default Menu;
