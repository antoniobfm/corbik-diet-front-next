import dynamic from 'next/dynamic'
import Link from 'next/link';
import { BigCardHeader, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
import { useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import 'react-day-picker/lib/style.css';
import { endOfDay, formatISO, setHours, startOfDay } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';
import { useRouter } from 'next/router';
import { FiChevronDown, FiList } from 'react-icons/fi';
import { Chartzin } from '@/styles/pages/home/home';
import LineChart from '@/components/Charts/LineChart';
import LogsHorizontalScroll from '@/components/Logs/Body/HorizontalScroll';
import LogsVerticalScroll from '@/components/Logs/Body/VerticalScroll';

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
						<h1>Overview</h1>
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
							<Link href={`/body/log/add`}>
								<a>ADD LOG</a>
							</Link>
						</div>
					</Logs>

					<Chartzin>
						<LineChart extractName="weight" logData={chartData} />
					</Chartzin>
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
