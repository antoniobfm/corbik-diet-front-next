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
			<Button
			type="button"
			onClick={() => router.push('/home')}
			isSelected={'Home' === currentRoute}>
				<IoIosHome />
			</Button>

			<Button
			type="button"
			onClick={() => router.push('/body')}
			isSelected={'body' === currentRoute}>
				<IoIosBody />
			</Button>

			<Button
			type="button"
			onClick={() => router.push('/')}
			isSelected={'Diet' === currentRoute}>
				<IoIosRestaurant />
			</Button>

			<Button
			type="button"
			onClick={() => {}}
			isSelected={'Lifting' === currentRoute}>
				<IoIosFitness />
			</Button>
			{'Home' === currentRoute &&
				<Button type="button" onClick={() => router.push('/body/log/add')} isSelected={false} id="add">
					<IoIosAdd />
				</Button>
			}
			{'Diet' === currentRoute &&
				<Button type="button" onClick={() => router.push('/food/search')} isSelected={false} id="add">
					<IoIosAdd />
				</Button>
			}
			{'body' === currentRoute &&
				<Button type="button" onClick={() => router.push('/body/log/add')} isSelected={false} id="add">
					<IoIosAdd />
				</Button>
			}
		</Container>
  )
}

export default Menu;
