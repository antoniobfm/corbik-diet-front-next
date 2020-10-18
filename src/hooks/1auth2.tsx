import { useRouter } from 'next/router';
import React, {
	createContext,
	useCallback,
	useState,
	useContext,
	useEffect,
} from 'react';

import api from '../services/api';

interface User {
	id: string;
	name: string;
	email: string;
	avatar_url: string;
}

interface AuthState {
	token: string;
	user: User;
}

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	user: User;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
	 /*const [data, setData] = useState<AuthState>(() => {
	 	const token = localStorage.getItem('@Corbik:token');
	 	const user = localStorage.getItem('@Corbik:user');

	 	if (token && user) {
	 		api.defaults.headers.authorization = `Bearer ${token}`;

	 		return { token, user: JSON.parse(user) };
	 	}

	 	return {} as AuthState;
	 }); */
	// ---- INICIO DO AUTH DE TESTE --------

	const [data, setData] = useState<AuthState>({
		token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5NjEzNTEsImV4cCI6MTYwMzA0Nzc1MSwic3ViIjoiNWI1MDAyMjEtNGE4ZC00YWExLTk5YWYtOWM1YjM3MWQyMjNlIn0.bRp0atxdRMuFAUY4CgCE3kMOMW6S84TaMpj7yoNkWWY`,
		user: {
			email: 'tonho111@gmail.com',
			id: '5b500221-4a8d-4aa1-99af-9c5b371d223e',
			name: 'Antonio Moraes',
			avatar_url: '',
		},
	});

	useEffect(() => {
		api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5NjEzNTEsImV4cCI6MTYwMzA0Nzc1MSwic3ViIjoiNWI1MDAyMjEtNGE4ZC00YWExLTk5YWYtOWM1YjM3MWQyMjNlIn0.bRp0atxdRMuFAUY4CgCE3kMOMW6S84TaMpj7yoNkWWY`;

		localStorage.setItem(
			'@Corbik:token',
			`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5NjEzNTEsImV4cCI6MTYwMzA0Nzc1MSwic3ViIjoiNWI1MDAyMjEtNGE4ZC00YWExLTk5YWYtOWM1YjM3MWQyMjNlIn0.bRp0atxdRMuFAUY4CgCE3kMOMW6S84TaMpj7yoNkWWY`,
		);
		
		localStorage.setItem('@Corbik:user', JSON.stringify(data.user));
	}, [data.token, data.user]);

	// ---- FIM DO AUTH DE TESTE --------

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post('sessions', {
			email,
			password,
		});

		const { token, user } = response.data;

		localStorage.setItem('@Corbik:token', token);
		localStorage.setItem('@Corbik:user', JSON.stringify(user));

		api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5NjEzNTEsImV4cCI6MTYwMzA0Nzc1MSwic3ViIjoiNWI1MDAyMjEtNGE4ZC00YWExLTk5YWYtOWM1YjM3MWQyMjNlIn0.bRp0atxdRMuFAUY4CgCE3kMOMW6S84TaMpj7yoNkWWY`;

		setData({ token, user });
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem('@Corbik:token');
		localStorage.removeItem('@Corbik:token');

		setData({} as AuthState);
	}, []);

	const updateUser = useCallback(
		(user: User) => {
			localStorage.setItem('@Corbik:user', JSON.stringify(user));
			setData({
				token: data.token,
				user,
			});
		},
		[setData, data.token],
	);
	return (
		<AuthContext.Provider
			value={{ user: data.user, signIn, signOut, updateUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

export { AuthContext, AuthProvider, useAuth };
