import React from 'react';

import { AuthProvider } from './auth';
import { ErrorProvider } from './errors';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
	return (
		<ToastProvider>
			<AuthProvider>
				<ErrorProvider>
					{children}
				</ErrorProvider>
			</AuthProvider>
		</ToastProvider>
	);
};

export default AppProvider;
