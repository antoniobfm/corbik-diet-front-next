import dynamic from 'next/dynamic'
import Link from 'next/link';
import { BigCardHeader, Calendar, Calories, Container, Header, Log, Logs, Macro, Macros } from "@/styles/pages/Home";
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
import { FiChevronDown, FiList, FiSettings } from 'react-icons/fi';
import LogsHorizontalScroll from '@/components/Logs/Food/HorizontalScroll';
import LogsVerticalScroll from '@/components/Logs/Food/VerticalScroll';
import Chart from "chart.js";
import errorHandler from "../errors/errorHandler";
import { useError } from '@/hooks/errors';
import { GetServerSidePropsContext } from 'next';
import { AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { Chartzin } from '@/styles/pages/home/home';

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
	const [loading, setLoading] = useState(true);
	const [isHorizontal, setIsHorizontal] = useState(true);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

	const router = useRouter();
	const {handleError} = useError();

	// let chartRef = createRef<HTMLCanvasElement>();

//  useEffect(() => {

// 	// set the dimensions and margins of the graph
// 	var margin = {top: 30, right: 30, bottom: 70, left: 60},
// 			width = 460 - margin.left - margin.right,
// 			height = 400 - margin.top - margin.bottom;

// 	// append the svg object to the body of the page
// 	var svg = d3.select("#my_dataviz")
// 		.append("svg")
// 			.attr("width", width + margin.left + margin.right)
// 			.attr("height", height + margin.top + margin.bottom)
// 		.append("g")
// 			.attr("transform",
// 						"translate(" + margin.left + "," + margin.top + ")");


// 	// Parse the Data
// 	d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

// 	// X axis
// 	var x = d3.scaleBand()
// 		.range([ 0, width ])
// 		.domain(data.map(function(d) { return d.Country; }))
// 		.padding(0.2);
// 	svg.append("g")
// 		.attr("transform", "translate(0," + height + ")")
// 		.call(d3.axisBottom(x))
// 		.selectAll("text")
// 			.attr("transform", "translate(-10,0)rotate(-45)")
// 			.style("text-anchor", "end");

// 	// Add Y axis
// 	var y = d3.scaleLinear()
// 		.domain([0, 13000])
// 		.range([ height, 0]);
// 	svg.append("g")
// 		.call(d3.axisLeft(y));

// 	// Bars
// 	svg.selectAll("mybar")
// 		.data(data)
// 		.enter()
// 		.append("rect")
// 			.attr("x", function(d) { return x(d.Country); })
// 			.attr("y", function(d) { return y(d.Value); })
// 			.attr("width", x.bandwidth())
// 			.attr("height", function(d) { return height - y(d.Value); })
// 			.attr("fill", "#69b3a2")

// 	})
//   }, [chartData]);

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
				{/* <Chartzin>
<div id="my_dataviz"></div>
				</Chartzin> */}
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
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
}
