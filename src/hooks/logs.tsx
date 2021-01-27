/* eslint-disable camelcase */
import React, {
	createContext,
	useCallback,
	useState,
	useContext,
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
	logs: ILog[] | null;
	getDaysLogs(day: number): Promise<void>;
}

const LogContext = createContext<LogContextData>({} as LogContextData);

const LogProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<ILog[] | null>(null);

	const getDaysLogs = useCallback(async day => {
		const response = await api.get(`/food/log/${day}`);

		setData(response.data);
	}, []);

	return (
		<LogContext.Provider value={{ logs: data, getDaysLogs }}>
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
