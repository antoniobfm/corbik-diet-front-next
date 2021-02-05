import React from 'react';

import { AuthProvider } from './auth';
import { ErrorProvider } from './errors';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
	return (
		<AuthProvider>
			<ToastProvider>
				<ErrorProvider>
					{children}
				</ErrorProvider>
			</ToastProvider>
		</AuthProvider>
	);
};

export default AppProvider;
