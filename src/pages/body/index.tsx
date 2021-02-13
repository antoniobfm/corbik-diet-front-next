import dynamic from 'next/dynamic'
import Link from 'next/link';
import { BigCardHeader, Calories, CardContainer, CardContent, CardHeader, Container, Header, Log, Logs, Macro, Macros, Mission } from "@/styles/pages/Home";
import { createRef, useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import 'react-day-picker/lib/style.css';
import { endOfDay, formatISO, setHours, startOfDay } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import { useRouter } from 'next/router';
import { FiCheck, FiChevronDown, FiList, FiSettings } from 'react-icons/fi';
import LogsHorizontalScroll from '@/components/Logs/Body/HorizontalScroll';
import LogsVerticalScroll from '@/components/Logs/Body/VerticalScroll';
import Chart from "chart.js";
import CardMessage from '@/components/Card/CardMessage';
import LineChart from '@/components/Charts/LineChart';

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
	const [chartRawData, setChartRawData] = useState<IDayResume[]>(null);
	const [loading, setLoading] = useState(true);
	const [isHorizontal, setIsHorizontal] = useState(true);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

	const router = useRouter();

	let chartRef = createRef<HTMLCanvasElement>();

	const { isAuthenticated, user } = useAuth();
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

	useEffect(() => {
		async function loadData() {
			const today = new Date();
			const start = startOfDay(today).getTime();
			const end = endOfDay(today).getTime();
			const response_chart = await api.post('/body/log/30days', {start, end});
			setChartRawData(response_chart.data);
		}

		loadData();
	}, [logData])

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
						onClick={() => {router.push('/body/settings')}}>
							<FiSettings />
						</button>
					</Header>
					<Macros>
						<Macro macro="carb">
							<div>
								<h4>Muscle</h4>
								<span>{!loading && logData ? logData.currentMuscle : `0`}%{/*<span>/{user && parseInt(user.muscle)}%</span>*/}</span>
							</div>
							<progress id="carbs" value={logData ? logData.currentMuscle : `0`} max={user && user.muscle} />
						</Macro>
						<Macro macro="protein">
							<div>
								<h4>Water</h4>
								<span>{!loading && logData ? logData.currentWater : `0`}%{/*<span>/{user && parseInt(user.water)}%</span>*/}</span>
							</div>
							<progress id="carbs" value={logData ? logData.currentWater : `0`} max={user && user.water} />
						</Macro>
						<Macro macro="fat">
							<div>
								<h4>Fat</h4>
								<span>{!loading && logData ? logData.currentFat : `0`}%{/*<span>/{user && parseInt(user.fat)}%</span>*/}</span>
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
							{!loading ? logData && logData.logs ?
								isHorizontal ? <LogsHorizontalScroll data={logData.logs} /> : <LogsVerticalScroll data={logData.logs} />
								:
								<CardMessage borderBottom={false}>
									<h4>NO LOGS</h4>
								</CardMessage>
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
					<CardContainer>
						<CardHeader>
							<h3>Welcome to the body page</h3>
							<p>Here you will track how your body composition change through time.</p>
						</CardHeader>
						<CardContent>
							<h4>Getting started</h4>
							<div id="missions-container">
								<Mission isDone={logData ? logData.logs.length >= 1 : false}>
									<div className="is-done">
										<FiCheck />
									</div>
									<h5>Add your first log</h5>
								</Mission>
								<Mission isDone={!!user.weight}>
									<div className="is-done">
										<FiCheck />
									</div>
									<h5>Set your weight target</h5>
								</Mission>
							</div>
						</CardContent>
					</CardContainer>
					<CardContainer>
						<CardHeader>
							<h3>Weight variation</h3>
						</CardHeader>
						<div id="test-chart">
							<LineChart extractName="weight" logData={chartRawData} baseColor="#27AE60"/>
						</div>
					</CardContainer>
				</Container>
			</WholePageTransition>
		</>
	)
}
