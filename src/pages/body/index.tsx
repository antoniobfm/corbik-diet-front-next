import dynamic from 'next/dynamic'
import Link from 'next/link';
import { BigCardHeader, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
import { createRef, useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import 'react-day-picker/lib/style.css';
import { endOfDay, formatISO, setHours, startOfDay } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import { useRouter } from 'next/router';
import { FiChevronDown, FiList, FiSettings } from 'react-icons/fi';
import LogsHorizontalScroll from '@/components/Logs/Body/HorizontalScroll';
import LogsVerticalScroll from '@/components/Logs/Body/VerticalScroll';
import Chart from "chart.js";

const LoginModal = dynamic(() => import('@/components/LoginModal'),
	{ loading: () => <div className="blurred__background"><h1>Loading</h1></div> })

interface BodyLog {
	id: string;
	muscle: number;
	water: number;
	weight: number;
	fat: number;
	bones: number;
	when: string;
}

interface IBodyLogDayResume extends BodyLog {
	month: string;
	day: string;
}

interface IDayResume {
	currentWeight: number;
	currentWater: number;
	currentFat: number;
	currentMuscle: number;
	logs: IBodyLogDayResume[];
}

export default function Home() {
	const [logData, setLogData] = useState<IDayResume | null>(null);
	const [chartData, setChartData] = useState<IDayResume[]>(null);
	const [loading, setLoading] = useState(true);
	const [isHorizontal, setIsHorizontal] = useState(true);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

	const router = useRouter();

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
					lineTension: 1,
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
					data: chartData && chartData.map(item => parseInt(item.weight, 10))
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

	}, [chartRef, chartData]);

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
				// Logs
				const when = formatISO(selectedDate);
				const response = await api.post('/body/logs', { when });

				handleData(response.data);

				// Chart
				const today = new Date();
				const start = startOfDay(today).getTime();
				const end = endOfDay(today).getTime();
				const response_chart = await api.post('/body/log/30days', {start, end});
				setChartData(response_chart.data);
				} catch (err) {
				console.log('err');
			}
		}
		loadData();
	}, [selectedDate]);

	const handleLogsDirection = useCallback(() => {
		setIsHorizontal(!isHorizontal);
	}, [isHorizontal]);

	return (
		<>
			<Menu currentRoute="body" />
			<WholePageTransition>
				<Container>
					<Header>
						<button
						id="diet--home--change--date"
						type="button"
						onClick={() => {}}>
							Overview
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
								<h4>Muscle</h4>
								<span>{!loading && logData ? logData.currentMuscle : `0`}<span>/{user && parseInt(user.muscle)}%</span></span>
							</div>
							<progress id="carbs" value={logData ? logData.currentMuscle : `0`} max={user && user.muscle} />
						</Macro>
						<Macro macro="protein">
							<div>
								<h4>Water</h4>
								<span>{!loading && logData ? logData.currentWater : `0`}<span>/{user && parseInt(user.water)}%</span></span>
							</div>
							<progress id="carbs" value={logData ? logData.currentWater : `0`} max={user && user.water} />
						</Macro>
						<Macro macro="fat">
							<div>
								<h4>Fat</h4>
								<span>{!loading && logData ? logData.currentFat : `0`}<span>/{user && parseInt(user.fat)}%</span></span>
							</div>
							<progress id="carbs" value={logData ? logData.currentFat : `0`} max={user && user.fat} />
						</Macro>
					</Macros>
					<Calories>
						<div>
							<h4>Weight</h4>
							<span>{!loading && logData ? logData.currentWeight : `0`}<span>/{user && parseInt(user.weight)}kg</span></span>
						</div>
						<progress id="carbs" value={logData ? logData.currentWeight : `0`} max={user && user.weight} />
					</Calories>
					<Logs>
						<BigCardHeader isHorizontal={isHorizontal}>
							<h3>Logs</h3>
							<div onClick={handleLogsDirection}>
								<FiChevronDown />
							</div>
						</BigCardHeader>
						<div>
							{!loading ? logData && logData.logs &&
								isHorizontal ? <LogsHorizontalScroll data={logData.logs} /> : <LogsVerticalScroll data={logData.logs} />
								:
								<Skeleton count={4} duration={2} height={64} width='92.5%' style={{ marginLeft: 16, marginRight: 16 }} />
							}
						</div>
						<div className="add-log">
							<button onClick={() => router.push(`/body/log/add`)}>
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
			<Link href="/settings">
				<a>
					<h4 style={{ opacity: 0.5, fontWeight: 400, textAlign: 'center', paddingTop: 40, paddingBottom: 40 }}>Settings</h4>
				</a>
			</Link>
		</>
	)
}
