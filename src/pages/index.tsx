import dynamic from 'next/dynamic'
import Link from 'next/link';
import { BigCardHeader, Calendar, Calories, Container, Header, Log, Logs, Macro, Macros, CardContainer, CardHeader, CardContent, Mission } from "@/styles/pages/Home";
import { createRef, useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format, formatISO, setHours, startOfDay, endOfDay } from 'date-fns';
import nookies from "nookies";
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import addZeroBefore from '@/utils/addZeroBefore';
import { useRouter } from 'next/router';
import { FiCheck, FiChevronDown, FiList, FiSettings } from 'react-icons/fi';
import LogsHorizontalScroll from '@/components/Logs/Food/HorizontalScroll';
import LogsVerticalScroll from '@/components/Logs/Food/VerticalScroll';
import Chart from "chart.js";
import { useError } from '@/hooks/errors';
import { GetServerSidePropsContext } from 'next';
import { AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { Chartzin } from '@/styles/pages/home/home';
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
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
	logs: ILog[] | undefined;
}


export default function Home({tururu}) {
	const [logData, setLogData] = useState<IDayResume | null>(null);
	const [chartData, setChartData] = useState<IDayResume[]>(null);
	const [chartRawData, setChartRawData] = useState<IDayResume[]>(null);
	const [loading, setLoading] = useState(true);
	const [isHorizontal, setIsHorizontal] = useState(true);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

	const router = useRouter();
	const {handleError} = useError();

	let chartRef = createRef<HTMLCanvasElement>();


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
				handleError(err);
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
			setChartRawData(response_chart.data);
		}

		loadData();
	}, [logData])

	const handleLogsDirection = useCallback(() => {
		setIsHorizontal(!isHorizontal);
	}, [isHorizontal]);

	useEffect(() => {
		const data4: Chart.ChartData = {
			labels: chartRawData && chartRawData.map(item => item.day),
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
					data: chartRawData && chartRawData.map(item => item.calories)
				}
			]
		};

		setChartData(data4);
	}, [chartRawData]);

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
						<AnimatePresence>
						{!loading ? logData && logData.logs ?
							isHorizontal ? <LogsHorizontalScroll data={logData.logs} /> : <LogsVerticalScroll data={logData.logs} />
							:
							<div className="search-first">
								<h4>NO LOGS TODAY</h4>
							</div>
							:
							<Skeleton count={4} duration={2} height={64} width='92.5%' style={{ marginLeft: 16, marginRight: 16 }} />
						}
						</AnimatePresence>
					</div>
					<div className="add-log">
						<button onClick={() => router.push(`/food/search`)}>
							ADD LOG {tururu}
						</button>
					</div>
					{/* <canvas
						height="100px"
						id={`background-chart`}
						ref={chartRef}
					/> */}
				</Logs>
				<CardContainer>
					<CardHeader>
						<h3>Welcome to the diet page</h3>
						<p>Your diet is everything you eat, inside or outside of your planning.</p>
					</CardHeader>
					<CardContent>
						<h4>Getting started</h4>
						<div id="missions-container">
							<Mission isDone={true}>
								<div className="is-done">
									<FiCheck />
								</div>
								<h5>Create your first food</h5>
							</Mission>
							<Mission isDone={false}>
								<div className="is-done" />
								<h5>Add your first food log</h5>
							</Mission>
							<Mission isDone={false}>
								<div className="is-done" />
								<h5>Set your macro’s target</h5>
							</Mission>
						</div>
					</CardContent>
				</CardContainer>
				<CardContainer>
					<div id="test-chart">
						<LineChart extractName="calories" logData={chartRawData} baseColor="#27AE60"/>
					</div>
				</CardContainer>
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(context);
    console.log(cookies);
		console.log('tururuu');
    return {
			props: {tururu: ''}
		};
  } catch (err) {
    context.res.writeHead(302, { Location: "/account/login" });
    context.res.end();
    return { props: {} };
  }
}
