/* eslint-disable camelcase */
import addZeroBefore from '@/utils/addZeroBefore';
import IndexedDb from '@/utils/Indexed';
import paginate from '@/utils/paginate';
import { endOfDay, formatISO, setHours, startOfDay } from 'date-fns';
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from 'react';

import api from '../services/api';

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

interface LogContextData {
	search: any[] | null;
	log: IDayResume | null;
}

const LogContext = createContext<LogContextData>({} as LogContextData);

const LogProvider: React.FC = ({ children }) => {
	const [logData, setLogData] = useState<IDayResume | null>(null);
	const [data, setData] = useState<any[] | null>(null);

	const handleData = useCallback(async (data) => {
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
			console.log(paginateAll);

      setData(paginateAll);
			console.log(data);
    }

    async function initialLoad() {
			const indexedDb = new IndexedDb('test4');
			await indexedDb.createObjectStore(['DayResume']);
			const items = await indexedDb.getAllValue('DayResume');

			const start = formatISO(startOfDay(setHours(new Date(), 12)));
			const end = formatISO(endOfDay(setHours(new Date(), 12)));

			if (items.length >= 1) {
				const cachedData = await indexedDb.getAllValue('DayResume');
				setLogData(cachedData);
			}

      const { data } = await api.post('/food/log/day', { start, end });
			await handleData(data);
    }

		initialLoadSearch();
		initialLoad();
  }, []);

	return (
		<LogContext.Provider value={{ search: data, log: logData }}>
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
