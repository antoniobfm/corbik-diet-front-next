import React from 'react';

import { AuthProvider } from './auth';
import { ErrorProvider } from './errors';
import { LogProvider } from './logs';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
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
