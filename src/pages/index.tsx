import dynamic from 'next/dynamic'
import Link from 'next/link';
import { Calendar, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
import { useCallback, useEffect, useState } from 'react';
import api from '@/services/api';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format, formatISO, setHours } from 'date-fns';
import { useAuth } from '@/hooks/auth';
import Skeleton from 'react-loading-skeleton';
import Menu from '@/components/Menu';
import WholePageTransition from '@/components/WholePageTransition';

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

		const newLogs = {
			...data,
			logs: data.logs.map((item) => {
			return {
				...item,
				hour: new Date(item.when).getHours(),
				minute: new Date(item.when).getMinutes()
			}
		})};

		setLogData(newLogs);
		setLoading(false);
	}, [logData]);

	useEffect(() => {
		async function loadData() {
			try {
				const when = formatISO(selectedDate);
				const response = await api.post('/food/log/day', { when });

				handleData(response.data);
			} catch (err) {
				console.log('err');
			}
		}

		loadData();
	}, [selectedDate]);

	return (
		<>
			<Menu currentRoute="Diet" />
			<WholePageTransition>
			<Container>
				<Header>
					<button type="button" onClick={e => handleCalendar(e)}>{isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM, dd')}</button>
				</Header>
				<Macros>
					<Macro macro="carb">
						<h3>Carbs</h3>
						<span>{!loading && logData ? logData.carbohydrates : `0`}<span>/{user && parseInt(user.carbohydrates)}</span></span>
						<progress id="carbs" value={logData ? logData.carbohydrates : `0`} max={user && user.carbohydrates}>30%</progress>
					</Macro>
					<Macro macro="protein">
						<h3>Protein</h3>
						<span>{!loading && logData ? logData.proteins : `0`}<span>/{user && parseInt(user.proteins)}</span></span>
						<progress id="carbs" value={logData ? logData.proteins : `0`} max={user && user.proteins}>30%</progress>
					</Macro>
					<Macro macro="fat">
						<h3>Fat</h3>
						<span>{!loading && logData ? logData.fats : `0`}<span>/{user && parseInt(user.fats)}</span></span>
						<progress id="carbs" value={logData ? logData.fats : `0`} max={user && user.fats}>30%</progress>
					</Macro>
				</Macros>
				<Calories>
					<div>
						<h3>Calories</h3>
						<span>{!loading && logData ? logData.calories : `0`}<span>/{user && parseInt(user.calories)}</span></span>
					</div>
					<progress id="carbs" value={logData ? logData.calories : `0`} max={user && user.calories}>30%</progress>
				</Calories>
				<Logs>
					<h2>Logs</h2>
					<div>
						{!loading ? logData && logData.logs && logData.logs.map(log =>
							<Link key={log.id} href={`/log/edit/${log.id}`}>
								<a>
									<Log>
										<div className="when">
											<h5>{log.hour}:{log.minute}</h5>
										</div>
										<div className="name-and-quantity">
											<h4>{log.name}</h4>
											<h5>{log.quantity_amount}g</h5>
										</div>
										<div className="macros">
											<h5>C{log.carbohydrates}   P{log.proteins}   F{log.fats}</h5>
										</div>
									</Log>
								</a>
							</Link>
						) :
							<Skeleton count={4} duration={2} height={64} width='92.5%' style={{ marginLeft: 16, marginRight: 16 }} />
						}
					</div>
					<div className="add-log">
						<Link href={`/food/search`}>
							<a>ADD LOG</a>
						</Link>
					</div>
				</Logs>

			</Container>
			</WholePageTransition>
			<Link href="/settings">
				<a>
					<h4 style={{ opacity: 0.5, fontWeight: 400, textAlign: 'center', paddingTop: 40, paddingBottom: 40 }}>Settings</h4>
				</a>
			</Link>

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
