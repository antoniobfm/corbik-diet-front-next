import dynamic from 'next/dynamic'
import Link from 'next/link';
import { BigCardHeader, Calendar, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
import { createRef, useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format, formatISO, setHours, startOfDay, endOfDay } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import addZeroBefore from '@/utils/addZeroBefore';
import { useRouter } from 'next/router';
import { FiChevronDown, FiList, FiSettings } from 'react-icons/fi';
import LogsHorizontalScroll from '@/components/Logs/Food/HorizontalScroll';
import LogsVerticalScroll from '@/components/Logs/Food/VerticalScroll';
import { Chartzin } from '@/styles/pages/home/home';
import LineChart from '@/components/Charts/LineChart';
import Chart from "chart.js";

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
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
	logs: ILog[] | undefined;
}


export default function Home() {
	const [logData, setLogData] = useState<IDayResume | null>(null);
	const [chartData, setChartData] = useState<IDayResume[]>(null);
	const [loading, setLoading] = useState(true);
	const [isHorizontal, setIsHorizontal] = useState(true);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));


	let chartRef = createRef<HTMLCanvasElement>();

	useEffect(() => {
		const canvas = document.getElementById(`background-chart`) as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');

		var gradientStroke = ctx.createLinearGradient(chartRef.current.width / 2, 0, chartRef.current.width / 2, chartRef.current.height);
		gradientStroke.addColorStop(0, 'rgba(255, 255, 255, 0.075)');

		gradientStroke.addColorStop(0.63, 'rgba(24, 26, 27, 0)');

		const data2: Chart.ChartData = {
			labels: chartData && chartData.map(item => item.when),
			datasets: [
				{
					label: `oloco`,
					fill: true,
					lineTension: 0.1,
					backgroundColor: gradientStroke,
					borderColor: 'rgba(150, 150, 150, 1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					borderWidth: 1,

					pointBorderColor: 'rgba(150, 150, 150, 1)',
					pointBackgroundColor: 'rgba(150, 150, 150, 1)',
					pointBorderWidth: 0.1,
					pointHoverRadius: 0.1,
					pointHoverBackgroundColor: 'rgba(150, 150, 150, 1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 0.1,
					pointRadius: 0.1,
					pointHitRadius: 0.1,
					data: chartData && chartData.map(item => parseInt(item.calories, 10))
				}
			]
		};

		const options: Chart.ChartOptions = {
			responsive: true,
			aspectRatio: 1,
			maintainAspectRatio: false,
			tooltips: {
				enabled: false,
			},
			events: [],
			hover: {
				mode: null
			},
			animation: {
				duration: 0,
			},
			legend: {
				display: false,
					labels: {
					}
			},
			layout: {
				padding: {
						top: 0,
						bottom: 0,
				}
			},
			scales: {
				yAxes: [{
					display: false,
					gridLines: {
						display: false ,
						color: "#FFFFFF"
					},
					ticks: {
							beginAtZero: false,
							fontColor: '#747676',
							fontFamily: 'Poppins',
							fontSize: 6,
					},
				}],
				xAxes: [{
					display: false,
					gridLines: {
						display: false ,
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

		new Chart(ctx, {
				type: "line",
				data: data2,
				options: options
		});

	}, [chartRef, logData]);

	const router = useRouter();

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

		const newLogs = {
			...data,
			logs: data.logs.map((item) => {
			return {
				...item,
				hour: addZeroBefore(new Date(item.when).getHours()),
				minute: addZeroBefore(new Date(item.when).getMinutes())
			}
		})};

		setLogData(newLogs);
		setLoading(false);
	}, [logData]);

	useEffect(() => {
		async function loadData() {
			try {
				const start = formatISO(startOfDay(selectedDate));
				const end = formatISO(endOfDay(selectedDate));
				const response = await api.post('/food/log/day', { start, end });

				handleData(response.data);

			} catch (err) {
				console.log('err');
			}
		}

		loadData();
	}, [selectedDate]);

	useEffect(() => {
		async function loadData() {
			const today = new Date();
			const start = startOfDay(today).getTime();
			const end = endOfDay(today).getTime();
			const response_chart = await api.post('/food/log/30days', {start, end});
			setChartData(response_chart.data);
		}

		loadData();
	}, [logData])

	const handleLogsDirection = useCallback(() => {
		setIsHorizontal(!isHorizontal);
	}, [isHorizontal]);

	return (
		<>
			<Menu currentRoute="Diet" />
			<WholePageTransition>
			<Container>
				<Header>
					<button
					id="diet--home--change--date"
					type="button"
					onClick={e => handleCalendar(e)}>
						{isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM, dd')}
					</button>
					<button
					id="diet--home--settings--button"
					onClick={() => {router.push('/food/settings')}}>
						<FiSettings />
					</button>
				</Header>
				<Macros>
					<Macro macro="carb">
						<div>
							<h4>Carbs</h4>
							<span>{!loading && logData ? logData.carbohydrates : `0`}<span>/{user && parseInt(user.carbohydrates)}</span></span>
						</div>
						<progress id="carbs" value={logData ? logData.carbohydrates : `0`} max={user && user.carbohydrates}>30%</progress>
					</Macro>
					<Macro macro="protein">
						<div>
							<h4>Prots</h4>
							<span>{!loading && logData ? logData.proteins : `0`}<span>/{user && parseInt(user.proteins)}</span></span>
						</div>
						<progress id="carbs" value={logData ? logData.proteins : `0`} max={user && user.proteins}>30%</progress>
					</Macro>
					<Macro macro="fat">
						<div>
							<h4>Fat</h4>
							<span>{!loading && logData ? logData.fats : `0`}<span>/{user && parseInt(user.fats)}</span></span>
						</div>
						<progress id="carbs" value={logData ? logData.fats : `0`} max={user && user.fats}>30%</progress>
					</Macro>
				</Macros>
				<Calories>
					<div>
						<h4>Calories</h4>
						<span>{!loading && logData ? logData.calories : `0`}<span>/{user && parseInt(user.calories)}</span></span>
					</div>
					<progress id="carbs" value={logData ? logData.calories : `0`} max={user && user.calories}>30%</progress>
				</Calories>
				<Logs>
					<BigCardHeader isHorizontal={isHorizontal}>
						<h3>Logs</h3>
						<div onClick={handleLogsDirection}>
							<FiChevronDown />
						</div>
					</BigCardHeader>
					<div>
						{!loading ? logData && logData.logs ?
							isHorizontal ? <LogsHorizontalScroll data={logData.logs} /> : <LogsVerticalScroll data={logData.logs} />
							:
							<div/>
							:
							<Skeleton count={4} duration={2} height={64} width='92.5%' style={{ marginLeft: 16, marginRight: 16 }} />
						}
					</div>
					<div className="add-log">
						<button onClick={() => router.push(`/food/search`)}>
							ADD LOG
						</button>
					</div>
					<canvas
						height="100px"
						id={`background-chart`}
						ref={chartRef}
					/>
				</Logs>
			</Container>
			</WholePageTransition>

			{showCalendar &&
				<Calendar>
					<button type="button" onClick={e => handleCalendar(e)} />
						<DayPicker
							onDayClick={handleDateChange}
							selectedDays={selectedDate}
						/>
					<button type="button" onClick={e => handleCalendar(e)} />
				</Calendar>
			}
		</>
	)
}
