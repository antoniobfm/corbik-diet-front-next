/* eslint-disable camelcase */
import addZeroBefore from '@/utils/addZeroBefore';
import IndexedDb from '@/utils/Indexed';
import paginate from '@/utils/paginate';
import { endOfDay, formatISO, isSameDay, setHours, startOfDay } from 'date-fns';
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from 'react';

import api from '../services/api';
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
	id: string;
	amount: string;
	when: string;
}

interface LogContextData {
	search: any[] | null;
	logData: IDayResume | null;
	addLog(dataToAdd: IAddFoodLog): void;
	updateLog(data: IUpdateLog): void;
}

const LogContext = createContext<LogContextData>({} as LogContextData);

const LogProvider: React.FC = ({ children }) => {
	const [logData, setLogData] = useState<IDayResume | null>(null);
	const [data, setData] = useState<any[] | null>(null);

	const { addToast } = useToast();

	const handleData = useCallback(async (data) => {
		console.log(data);
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

	const updateLog = useCallback(async ({id, amount, when}: IUpdateLog) => {
		try {
			const log = {
				id: id,
				amount: amount,
				when: when,
			};

			await api.put(`/food/log`, log);

			addToast({
				type: 'success',
				title: 'Modified your log with success',
			});

			const indexedDb = new IndexedDb('test4');
			await indexedDb.createObjectStore(['DayResume']);
			const items = await indexedDb.getAllValue('DayResume');

			const okok = items.filter(item => isSameDay(new Date(item.id), new Date()));
			setLogData(okok[0])

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
	}, [])

	const addLog = useCallback(async (dataToAdd: IAddFoodLog) => {
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
	}, [])

	useEffect(() => {
    async function initialLoadSearch() {
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
			// console.log(paginateAll);

      setData(paginateAll);
			// console.log(data);
    }

    async function initialLoad() {
			const indexedDb = new IndexedDb('test4');
			await indexedDb.createObjectStore(['DayResume']);
			const items = await indexedDb.getAllValue('DayResume');

			const okok = items.filter(item => isSameDay(new Date(item.id), new Date()));
			setLogData(okok[0])

			const start = formatISO(startOfDay(setHours(new Date(), 12)));
			const end = formatISO(endOfDay(setHours(new Date(), 12)));

			// if (items.length >= 1) {
			// 	const cachedData = await indexedDb.getAllValue('DayResume');
			// 	console.log(cachedData);
			// 	setLogData(cachedData[0]);
			// }

      const { data } = await api.post('/food/log/day', { start, end });
			await handleData(data);
    }

		initialLoadSearch();
		initialLoad();
  }, []);

	return (
		<LogContext.Provider value={{ search: data, logData: logData, updateLog, addLog }}>
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
