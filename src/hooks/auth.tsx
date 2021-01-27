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

	weight: string;
	water: string;
	muscle: string;
	fat: string;
	bones: string;
}

interface AuthState {
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

	const router = useRouter();

	useEffect(() => {
		async function loadUserFromLocalStorageOrGetFromServer() {
			const user = localStorage.getItem('@Corbik:User');
			if (user) {
				setData({ user: JSON.parse(user) });
			} else {
				try {
					const response = await api.get('/profile');
					localStorage.setItem('@Corbik:User', JSON.stringify(response.data));
					setData({ user: response.data });
				} catch (err) {
					return;
				}
			}
		}

		loadUserFromLocalStorageOrGetFromServer();
		setLoading(false);
	}, [])

	const signIn = useCallback(async ({ email, password }) => {
		setLoading(true);
		const response = await api.post('sessions', {
			email,
			password,
		});

		const { user } = response.data;


		localStorage.setItem('@Corbik:User', JSON.stringify(user));

		setData({ user });
		setLoading(false);
		router.reload();
	}, []);

	const signOut = useCallback(async () => {
		try {
		await api.post('/sessions/logout');

		localStorage.removeItem('@Corbik:User');

		setData({} as AuthState);
		} catch (err) {
			localStorage.removeItem('@Corbik:User');
			router.reload();
		}
	}, []);

	const updateUser = useCallback(
		(user: User) => {
			localStorage.setItem('@Corbik:User', JSON.stringify(user));
			setData({
				user,
			});
		},
		[setData],
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
	if (loading || (!isAuthenticated && window.location.pathname !== '/login')) {
		return <Login />;
	} else if (isAuthenticated && window.location.pathname !== '/login') {
		console.log('tru');
	}
	return children;
};
