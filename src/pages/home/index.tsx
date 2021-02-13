import dynamic from 'next/dynamic'
import Link from 'next/link';
import { Container, Chartzin } from "@/styles/pages/home/home";
import { useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import 'react-day-picker/lib/style.css';
import { setHours } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import { endOfDay, startOfDay } from 'date-fns';
import { CardHeader, Header, WideCardContainer } from '@/styles/pages/Home';
import { useRouter } from 'next/router';
import { FiSettings } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import LineChart from '@/components/Charts/LineChart';

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

interface IDayResume2 {
	day: Date;
	weight: number;
}


export default function Home() {
	const [logData, setLogData] = useState<IDayResume[]>(null);
	const [logData2, setLogData2] = useState<IDayResume2[]>(null);
	const [chartData1, setChartData1] = useState<Chart.ChartData>(null);
	const [chartData2, setChartData2] = useState<Chart.ChartData>(null);
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

	const handleData2 = useCallback((data) => {
		setLoading(true);

		if (!data) {
			setLogData(null);
			return setLoading(false);
		}

		setLogData2(data);
		setLoading(false);
	}, [logData2]);

	useEffect(() => {
		async function loadData() {
			try {
				const today = new Date();
				const start = startOfDay(today).getTime();
				const end = endOfDay(today).getTime();
				const response = await api.post('/food/log/30days', { start, end });

				handleData(response.data);
			} catch (err) {
				console.log('err');
			}
		}

		loadData();
	}, [selectedDate]);

	useEffect(() => {
		async function loadData() {
			try {
				const today = new Date();
				const start = startOfDay(today).getTime();
				const end = endOfDay(today).getTime();

				const response = await api.post('/body/log/30days', { start, end });

				handleData2(response.data);
			} catch (err) {
				console.log('err');
			}
		}

		loadData();
	}, [selectedDate]);

	useEffect(() => {
		const data2: Chart.ChartData = {
			labels: logData && logData.map(item => item.day),
			datasets: [
				{
					label: 'Calories',
					fill: true,
					lineTension: 0.1,
					backgroundColor: 'rgba(39, 174, 96,0.3)',
					borderColor: 'rgba(39, 174, 96,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(39, 174, 96,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 3,
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


		const data3: Chart.ChartData = {
			labels: logData2 && logData2.map(item => item.day),
			datasets: [
				{
					label: 'Weight',
					fill: true,
					lineTension: 0.1,
					backgroundColor: 'rgba(235, 87, 87,0.3)',
					borderColor: 'rgba(235, 87, 87,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(235, 87, 87,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 3,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(235, 87, 87,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: logData2 && logData2.map(item => item.weight)
				}
			]
		};

		setChartData1(data2);
		setChartData2(data3);
	}, [logData, logData2]);

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

	const options = {
		responsive: true,
		aspectRatio: 1,
		maintainAspectRatio: false,
		legend: {
			display: false,
			labels: {
			}
		},
		scales: {
			yAxes: [{
				display: false,
				gridLines: {
					display: false,
					color: "#FFFFFF"
				},
				ticks: {
					beginAtZero: false,
					fontColor: '#747676',
					fontFamily: 'Poppins',
					fontSize: 6,
					borderColor: 'red'
				},
			}],
			xAxes: [{
				display: false,
				gridLines: {
					display: false,
					color: "#FFFFFF"
				},
				ticks: {
					fontColor: '#747676',
					fontFamily: 'Poppins',
					fontSize: 6
				},
			}]
		}
	}

	const router = useRouter();

	return (
		<>
			<Menu currentRoute="Home" />
			<WholePageTransition>
				<Container>
					<Header>
						<button
							id="diet--home--change--date"
							type="button"
							onClick={() => { }}>
							Home
					</button>
						<button
							id="diet--home--settings--button"
							onClick={() => { router.push('/settings') }}>
							<FiSettings />
						</button>
					</Header>
					<WideCardContainer>
						<CardHeader>
							<h3>Calory intake variation</h3>
						</CardHeader>
						<div id="test-chart">
							<LineChart extractName="calories" logData={logData} baseColor="#27AE60" />
						</div>
					</WideCardContainer>
					<WideCardContainer>
						<CardHeader>
							<h3>Weight variation</h3>
						</CardHeader>
						<div id="test-chart">
							<LineChart extractName="weight" logData={logData2} baseColor="#27AE60" />
						</div>
					</WideCardContainer>
				</Container>
			</WholePageTransition>
		</>
	)
}
