import { Calendar } from '@/styles/pages/Home';
import DayPicker from 'react-day-picker'
import React, { useCallback, useState } from 'react';

import { Container, Header } from './styles';
import { isToday, format } from 'date-fns';
import router from 'next/router';
import { FiSettings } from 'react-icons/fi';
import { useDietHome } from '../DietHomeContext';

const HeaderComponent: React.FC = () => {
	const [showCalendar, setShowCalendar] = useState(false)

	const {handleSelectDate, selectedDate} = useDietHome();

	const handleCalendar = useCallback(
		e => {
			e.preventDefault()

			setShowCalendar(!showCalendar)
		},
		[showCalendar]
	)

	return (
	<Container>
		<Header>
			<button
				id="diet--home--change--date"
				type="button"
				onClick={e => handleCalendar(e)}
			>
				{isToday(selectedDate)
					? 'Today'
					: format(selectedDate, 'MMM, dd')}
			</button>
			<button
				id="diet--home--settings--button"
				onClick={() => {
					router.push('/food/settings')
				}}
			>
				<FiSettings />
			</button>
		</Header>
		{showCalendar && (
			<Calendar>
				<button type="button" onClick={e => handleCalendar(e)} />
				<DayPicker
					onDayClick={handleSelectDate}
					selectedDays={selectedDate}
				/>
				<button type="button" onClick={e => handleCalendar(e)} />
			</Calendar>
		)}
		</Container>
		)
}

export default HeaderComponent;
