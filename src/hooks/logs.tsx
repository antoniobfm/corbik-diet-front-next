/* eslint-disable camelcase */
import IndexedDb from '@/utils/Indexed';
import React, {
	createContext,
	useCallback,
	useState,
	useContext,
	useEffect,
} from 'react';

import api from '../services/api';

interface ILog {
	id: number;
	name: string;
	calories: number;
	carbohydrates: number;
	fats: number;
	proteins: number;
	quantity_amount: number;
	quantity_type: string;
	when: Date;
	food_id: string;
	created_at: Date;
	updated_at: Date;
	user_id: string;
}

interface LogContextData {
	logs: any[] | null;
}

const LogContext = createContext<LogContextData>({} as LogContextData);

const LogProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<any[] | null>(null);

	useEffect(() => {
    async function initialLoad() {
			const indexedDb = new IndexedDb('test');
			await indexedDb.createObjectStore(['books', 'initialLoadSearch']);
			const items = await indexedDb.getAllValue('books');

			if (items.length >= 1) {
				const cachedData = await indexedDb.getAllValue('books');
				setData(cachedData);
			}

      const {data} = await api.get(`/food-library/`);

			await indexedDb.putBulkValue('books', data);
      setData(data);
    }

		initialLoad();
  }, []);

	// const getDaysLogs = useCallback(async day => {
	// 	const response = await api.get(`/food/log/${day}`);

	// 	setData(response.data);
	// }, []);

	return (
		<LogContext.Provider value={{ logs: data }}>
			{children}
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
