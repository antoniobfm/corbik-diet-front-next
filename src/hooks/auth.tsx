import Login from '@/pages/login';
import { Router, useRouter } from 'next/router';
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

	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;
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
	isAuthenticated: boolean;
	user: User;
	loading: boolean;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<AuthState>({} as AuthState);

	useEffect(() => {
		async function loadUserFromLocalStorage() {
			const token = localStorage.getItem('@Corbik:token');
			const user = localStorage.getItem('@Corbik:user');

			if (token && user) {
				api.defaults.headers.authorization = `Bearer ${token}`;

				setData({ token, user: JSON.parse(user) });
			}

			setLoading(false);
		}
		loadUserFromLocalStorage();
	}, [])

	const router = useRouter();

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post('sessions', {
			email,
			password,
		});

		const { token, user } = response.data;
		console.log(token, user);

		localStorage.setItem('@Corbik:token', token);
		localStorage.setItem('@Corbik:user', JSON.stringify(user));

		api.defaults.headers.authorization = `Bearer ${token}`;

		setData({ token, user });
		router.reload();
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
			value={{ isAuthenticated: !!data.user, user: data.user, loading, signIn, signOut, updateUser }}
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

export const ProtectRoute = ({ children }) => {

	const router = useRouter();
	const { isAuthenticated, loading } = useAuth();
  if (loading || (!isAuthenticated && window.location.pathname !== '/login' && window.location.pathname !== '/')){
    return <Login />; 
  } else if (isAuthenticated && window.location.pathname !== '/login') {
		console.log('tru');
	}
  return children;
};