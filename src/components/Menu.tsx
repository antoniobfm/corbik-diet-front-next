import { Container, FloatingButton } from "@/styles/components/Menu";
import { useRouter } from "next/router";
import { IoBarbell, IoBody, IoHome, IoRestaurant } from 'react-icons/io5';
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
				<FloatingButton
					type="button"
					onClick={() => router.push('/body/log/add')}
					isSelected={false}
					whileTap={{ scale: 0.9 }}>
					<RiAddLine size={16} />
				</FloatingButton>
			}
			{'Diet' === currentRoute &&
				<FloatingButton
					type="button"
					drag
					dragConstraints={{left: 0, top: 0, right: 0, bottom: 0}}
					dragElastic={0.5}
					onClick={() => router.push('/food/search')}
					isSelected={false}
					whileTap={{ scale: 0.9 }}>
					<RiAddLine size={16} />
				</FloatingButton>
			}
			{'body' === currentRoute &&
				<FloatingButton
					type="button"
					onClick={() => router.push('/body/log/add')}
					isSelected={false}
					whileTap={{ scale: 0.9 }}>
					<RiAddLine size={16} />
				</FloatingButton>
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
