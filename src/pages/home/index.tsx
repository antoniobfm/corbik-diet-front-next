import dynamic from 'next/dynamic'
import Link from 'next/link';
import { Container } from "@/styles/pages/home/home";
import { useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import 'react-day-picker/lib/style.css';
import { formatISO, setHours } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import {Line, Pie} from 'react-chartjs-2';
import { ChartLineOptions } from 'chart.js';

const LoginModal = dynamic(() => import('@/components/LoginModal'),
	{ loading: () => <div className="blurred__background"><h1>Loading</h1></div> })

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

interface IDayResume {
	day: Date;
	calories: number;
}


export default function Home() {
	const [logData, setLogData] = useState<IDayResume[]>(null);
	const [loading, setLoading] = useState(true);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

	const { isAuthenticated, user, signOut } = useAuth();
	if (!isAuthenticated) return <LoginModal />;

	const handleDateChange = useCallback((day: Date) => {
		setSelectedDate(day);
	}, []);

	const handleCalendar = useCallback((e) => {
		e.preventDefault();

		setShowCalendar(!showCalendar);
	}, [showCalendar]);

	const handleData = useCallback((data) => {
		setLoading(true);

		if (!data) {
			setLogData(null);
			return setLoading(false);
		}

		setLogData(data);
		setLoading(false);
	}, [logData]);

	useEffect(() => {
		async function loadData() {
			try {
				const response = await api.get('/food/log/30days');

				handleData(response.data);
			} catch (err) {
				console.log('err');
			}
		}

		loadData();
	}, [selectedDate]);

	const data = {
		labels: [
			'Red',
			'Blue',
			'Yellow'
		],
		datasets: [{
			data: [300, 50, 100],
			backgroundColor: [
			'#EB5757',
			'#2D9CDB',
			'#F2C94C'
			],
			hoverBackgroundColor: [
			'#EB5757',
			'#2D9CDB',
			'#F2C94C'
			]
		}]
	};

	const data2 = {
		labels: logData && logData.map(item => item.day),
		datasets: [
			{
				label: 'Calories',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(39, 174, 96,0.4)',
				borderColor: 'rgba(39, 174, 96,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(39, 174, 96,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(39, 174, 96,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: logData && logData.map(item => item.calories)
			}
		]
	};

	const options = {
		legend: {
			display: false,
				labels: {
				}
		},
	}

	return (
		<>
			<Menu currentRoute="Home" />
			<WholePageTransition>
			<Container>
				<h1>Cole so testando</h1>
        <Line data={data2} options={options} />
			</Container>
			</WholePageTransition>
			<Link href="/settings">
				<a>
					<h4 style={{ opacity: 0.5, fontWeight: 400, textAlign: 'center', paddingTop: 40, paddingBottom: 40 }}>Settings</h4>
				</a>
			</Link>
		</>
	)
}
