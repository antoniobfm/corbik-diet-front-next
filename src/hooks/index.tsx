import React from 'react';

import { AuthProvider } from './auth';
import { LogProvider } from './logs';

const AppProvider: React.FC = ({ children }) => {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	);
};

export default AppProvider;
