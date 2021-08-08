import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import { ErrorProvider } from './errors';
import { LogProvider } from './logs';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
	return (
		<ToastProvider>
			<AuthProvider>
				<LogProvider>
					<ErrorProvider>
						{children}
					</ErrorProvider>
				</LogProvider>
			</AuthProvider>
		</ToastProvider>
	);
};

export default AppProvider;
