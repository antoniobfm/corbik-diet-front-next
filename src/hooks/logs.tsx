/* eslint-disable camelcase */
import { AuthContext } from '@/contexts/AuthContext';
import { setupAPIClient } from '@/services/api';
import addZeroBefore from '@/utils/addZeroBefore';
import IndexedDb from '@/utils/Indexed';
import paginate from '@/utils/paginate';
import { withSSRAuth } from '@/utils/withSSRAuth';
import { endOfDay, formatISO, isSameDay, setHours, startOfDay } from 'date-fns';
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
	useMemo,
} from 'react';

import { api } from '../services/apiClient';
import { useAuth } from './auth';
import { useToast } from './toast';

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

interface IAddFoodLog {
	food_id: string;
	//
	name: string;
	unit_type: string;
	amount: number;
	//
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	//
	when: string;
}

interface IDayResume {
	when: number;
	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
	logs: ILog[] | undefined;
}

interface IUpdateLog {
	log_id: string;
	amount: string;
	when: string;
}

interface LogContextData {
	search: any[] | null;
	logData: IDayResume | null;
	addLog(dataToAdd: IAddFoodLog): Promise<void>;
	updateLogStorage(date?: Date): Promise<void>;
	updateLog(data: IUpdateLog): Promise<void>;
	initialLoadSearch: () => Promise<void>;
	selectedDate: Date;
	handleSelectDate(data: Date): Promise<void>;
}

const LogContext = createContext<LogContextData>({} as LogContextData);

const LogProvider: React.FC = ({ children }) => {
	const [logData, setLogData] = useState<IDayResume | null>(null);
	const [data, setData] = useState<any[] | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date>(setHours(new Date(), 12));

	const { addToast } = useToast();
	const { user } = useContext(AuthContext);

	const handleData = useCallback(async (data): Promise<void> => {
		const indexedDb = new IndexedDb('test4');
		await indexedDb.createObjectStore(['DayResume']);

		if (!data) {
			setLogData(null);
			return;
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

		await indexedDb.putValue('DayResume', newLogs);
		setLogData(newLogs);
	}, [logData]);

	async function updateLogStorage(date?): Promise<void> {
		const indexedDb = new IndexedDb('test4');
		await indexedDb.createObjectStore(['DayResume']);
		const items = await indexedDb.getAllValue('DayResume');

		const okok = items.filter(item => isSameDay(new Date(item.id), date));
		setLogData(okok[0]);
		const d = new Date();

		console.log(d)

		const start = formatISO(startOfDay(setHours(d, 12)));
		console.log(start)
		const end = formatISO(endOfDay(setHours(d, 12)));
		console.log(end)

		const { data } = await api.post('/food/log/day', { start, end });
		await handleData(data);
	};

	useEffect(() => {
		async function loadData() {
			try {
				const start = formatISO(startOfDay(selectedDate));
				const end = formatISO(endOfDay(selectedDate));
				const response = await api.post('/food/log/day', { start, end });

				handleData(response.data);
			} catch (err) {
				// handleError(err);
			}
		}
		user && loadData();
	}, [user, selectedDate]);

	const handleSelectDate = useCallback(async (day: Date): Promise<void> => {
		setSelectedDate(day);
	}, [])

	const updateLog = useCallback(async ({log_id, amount, when}: IUpdateLog): Promise<void> => {
		try {
			const log = {
				log_id,
				amount: amount,
				when: when,
			};

			await api.put(`/food/log`, log);

			updateLogStorage(selectedDate);

			addToast({
				type: 'success',
				title: 'Modified your log with success',
			});

		} catch (err) {

			addToast({
				type: 'error',
				title: 'Something went wrong',
			});
		}
	}, [selectedDate])

	const addLog = useCallback(async (dataToAdd: IAddFoodLog): Promise<void> => {
		try {
			await api.post(`/food/log`, dataToAdd);

			addToast({
				type: 'success',
				title: 'Logged with success',
			});

			const start = formatISO(startOfDay(setHours(new Date(), 12)));
			const end = formatISO(endOfDay(setHours(new Date(), 12)));

			const { data } = await api.post('/food/log/day', { start, end });
			await handleData(data);
		} catch (err) {

			addToast({
				type: 'error',
				title: 'Something went wrong',
			});
		}
	}, []);

	const initialLoadSearch = useCallback(async () => {
		const indexedDb = new IndexedDb('test2');
		await indexedDb.createObjectStore(['search']);
		const items = await indexedDb.getAllValue('search');

		if (items.length >= 1) {
			const cachedData = await indexedDb.getAllValue('search');
			const paginateAll = await paginate({ arr: cachedData, size: 10 });
			setData(paginateAll);
		}

		const {data} = await api.get(`/food-library/`);

		await indexedDb.putBulkValue('search', data);
		const paginateAll = await paginate({ arr: data, size: 10 });

		// console.log(paginateAll)
			// console.log('SEHLOIRO')
		setData(paginateAll);
	}, [user]);

	const initialLoadDayResume = useCallback(async () => {
		const d = new Date();

		const indexedDb = new IndexedDb('test4');
		await indexedDb.createObjectStore(['DayResume']);
		const items = await indexedDb.getAllValue('DayResume');

		const okok = items.filter(item => isSameDay(new Date(item.id), d));
		setLogData(okok[0])

		console.log(d)

		const start = formatISO(startOfDay(setHours(d, 12)));
		console.log(start)
		const end = formatISO(endOfDay(setHours(d, 12)));
		console.log(end)

		// if (items.length >= 1) {
		// 	const cachedData = await indexedDb.getAllValue('DayResume');
		// 	console.log(cachedData);
		// 	setLogData(cachedData[0]);
		// }

		const { data } = await api.post('/food/log/day', { start, end });
		await handleData(data);
	}, []);

	useEffect(() => {
		async function initialLoad() {
			await initialLoadSearch();
			await initialLoadDayResume();
		}
		!!user && initialLoad()
  }, [user]);

	return (
		<LogContext.Provider value={{ search: data, logData: logData, selectedDate, handleSelectDate, updateLog, updateLogStorage, addLog, initialLoadSearch }}>
			{ children }
		</LogContext.Provider>
	);
};

function useLog(): LogContextData {
	const context = useContext(LogContext);

	if (!context) {
		throw new Error('useLog must be used within an LogProvider');
	}

	return context;
}

export { LogContext, LogProvider, useLog };

// export const getServerSideProps = withSSRAuth(async (ctx) => {
// 	const apiClient = setupAPIClient(ctx);
// 	const selectedDate = setHours(new Date(), 12);
// 	const start = formatISO(startOfDay(selectedDate));
// 	const end = formatISO(endOfDay(selectedDate));

// 	const response = await apiClient.post('/food/log/day', { start, end });
// 	console.log(response.data);

// 	return {
// 		props: {}
// 	}
// });
