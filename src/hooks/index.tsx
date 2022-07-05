import { initialLoadUser } from '@/redux/Authentication/authentication.actions';
import { initialLoadFood, initialLoadFoodLibrary, initialLoadFoodLogs } from '@/redux/Food/diet.actiont';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorProvider } from './errors';
import { LogProvider } from './logs';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initialLoadUser());
		dispatch(initialLoadFoodLibrary());
		dispatch(initialLoadFoodLogs());
		console.log('ok')
	}, [])

	return (
		<ToastProvider>
			<LogProvider>
				<ErrorProvider>
					{children}
				</ErrorProvider>
			</LogProvider>
		</ToastProvider>
	);
};

export default AppProvider;
