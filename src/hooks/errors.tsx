/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import React, {
	createContext,
	useCallback,
	useState,
	useContext,
} from 'react';

import api from '../services/api';

interface ErrorContextData {
	handleError(error: Error): Promise<void>;
}

const ErrorContext = createContext<ErrorContextData>({} as ErrorContextData);

const ErrorProvider: React.FC = ({ children }) => {
	const router = useRouter();

	const handleError = useCallback(async error => {
		if (error.response.status === 401) {
			localStorage.removeItem('@Corbik:User');
			router.reload();
		}
	}, []);

	return (
		<ErrorContext.Provider value={{ handleError }}>
			{children}
		</ErrorContext.Provider>
	);
};

function useError(): ErrorContextData {
	const context = useContext(ErrorContext);

	if (!context) {
		throw new Error('useError must be used within an ErrorProvider');
	}

	return context;
}

export { ErrorContext, ErrorProvider, useError };
