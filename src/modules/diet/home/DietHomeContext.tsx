/* eslint-disable camelcase */
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/toast';
import { RootState } from '@/redux/store';
import { setupAPIClient } from '@/services/api';
import addZeroBefore from '@/utils/addZeroBefore';
import IndexedDb from '@/utils/Indexed';
import paginate from '@/utils/paginate';
import { endOfDay, formatISO, isSameDay, parseISO, setHours, startOfDay } from 'date-fns';
import React, {
	createContext,
	useState,
	useContext,
	useCallback,
	useEffect,
} from 'react';
import { shallowEqual, useSelector } from 'react-redux';

interface IDayResume {
	when: number;
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
}

interface DietHomeContextData {
	dayResume: IDayResume;
	logData: IDayResume | null;
	selectedDate: Date;
	handleSelectDate(data: Date): void;
}

const DietHomeContext = createContext<DietHomeContextData>({} as DietHomeContextData);

const DietHomeProvider: React.FC = ({ children }) => {
	const [dayResume, setDayResume] = useState<IDayResume>();
	const [data, setData] = useState<any[] | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const logData = useSelector((state: RootState) => state.food.logs.filter(log => isSameDay(parseISO(log.date.full), selectedDate)), shallowEqual);

	useEffect(() => {
		const calories = logData.reduce((acc, curr) => acc + parseFloat(curr.macros.calories), 0);
		const carbohydrates = logData.reduce((acc, curr) => acc + parseFloat(curr.macros.carbohydrates), 0);
		const proteins = logData.reduce((acc, curr) => acc + parseFloat(curr.macros.proteins), 0);
		const fats = logData.reduce((acc, curr) => acc + parseFloat(curr.macros.fats), 0);

		setDayResume({
			when: selectedDate,
			carbohydrates: Math.round(carbohydrates).toString(),
			proteins: Math.round(proteins).toString(),
			fats: Math.round(fats).toString(),
			calories: Math.round(calories).toString(),
		})
	}, [selectedDate, logData])

	const handleSelectDate = useCallback( (day: Date): void => {
		setSelectedDate(day);
	}, [])

	return (
		<DietHomeContext.Provider value={{ dayResume, selectedDate, handleSelectDate }}>
			{ children }
		</DietHomeContext.Provider>
	);
};

function useDietHome(): DietHomeContextData {
	const context = useContext(DietHomeContext);

	if (!context) {
		throw new Error('useDietHome must be used within an DietHomeProvider');
	}

	return context;
}

export { DietHomeContext, DietHomeProvider, useDietHome };
