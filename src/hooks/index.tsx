import React from 'react';

import { AuthProvider } from './auth';
import { LogProvider } from './logs';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
	return (
		<AuthProvider>
			<ToastProvider>
				{children}
			</ToastProvider>
		</AuthProvider>
	);
};

export default AppProvider;
