import CardMessage from '@/components/Card/CardMessage';
import { BigCardHeader } from '@/styles/pages/Home';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import LogsHorizontalScroll from './HorizontalScroll';
import LogsVerticalScroll from './VerticalScroll';

import { Container } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { isSameDay, parseISO } from 'date-fns';
import { useDietHome } from '../DietHomeContext';

interface ILogs {
	isHorizontal: boolean
	handleLogsDirection: (isHorizontal: boolean) => void
}

const Logs: React.FC<ILogs> = ({isHorizontal, handleLogsDirection}: ILogs) => {

	const {selectedDate} = useDietHome();

	const logData = useSelector((state: RootState) => state.food.logs.filter(log => isSameDay(parseISO(log.date.full), selectedDate)));

	if (logData && logData.length >= 1) {
		if (isHorizontal) {
			return (
				<LogsHorizontalScroll data={logData} />
			)

		} else {
			return (
				<LogsVerticalScroll data={logData} />
			)
		}
	} else {
		return (
			<CardMessage borderBottom={false}>
				<h4>NO LOGS TODAY</h4>
			</CardMessage>
		)
	}
}

const LogsMain: React.FC = () => {
	const [isHorizontal, setIsHorizontal] = useState(true)

	const router = useRouter();

	const handleLogsDirection = useCallback(() => {
		setIsHorizontal(!isHorizontal)
	}, [isHorizontal])

	return (
		<Container>
			<BigCardHeader isHorizontal={isHorizontal}>
				<h3>Logs</h3>
				<div onClick={handleLogsDirection}>
					<FiChevronDown />
				</div>
			</BigCardHeader>
			<div>
				<AnimatePresence>
					<Logs isHorizontal={isHorizontal} handleLogsDirection={handleLogsDirection} />
				</AnimatePresence>
			</div>
			<div className="add-log">
				<button onClick={() => router.push(`/food/search`)}>
					ADD LOG
				</button>
			</div>
			{/* <canvas
				height="100px"
				id={`background-chart`}
				ref={chartRef}
			/> */}
		</Container>
	)
}

export default LogsMain;
