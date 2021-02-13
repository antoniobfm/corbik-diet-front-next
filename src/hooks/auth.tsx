import Login from '@/pages/account/login';
import { Router, useRouter } from 'next/router';
import React, {
	createContext,
	useCallback,
	useState,
	useContext,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react';

import { useToast } from '@/hooks/toast'
import api from '../services/api';
import nookies from "nookies";
import { GetServerSidePropsContext } from 'next';

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

interface ResetPassword {
	token: string;
	password: string;
	password_confirmation: string;
	setState: Dispatch<SetStateAction<boolean>>;
}

interface AuthContextData {
	isAuthenticated: boolean;
	user: User;
	loading: boolean;
	loadingAction: boolean;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void;
	updateUser(user: User): void;
	forgotPassword(email: string): Promise<void>;
	resetPassword(data: ResetPassword): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [loadingAction, setLoadingAction] = useState(false);
	const [data, setData] = useState<AuthState>({} as AuthState);

	const { addToast } = useToast();
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
		setLoadingAction(true);
		try {
			const response = await api.post('sessions', {
				email,
				password,
			});

			console.log(response.data);

			const { user } = response.data;

			localStorage.setItem('@Corbik:User', JSON.stringify(user));

			setData({ user });
			router.push('/');
		} catch (err) {
			addToast({
				title: 'Incorrect email/password combination',
				type: 'error'
			});
			router.push('/');
		}
		setLoadingAction(false);
	}, []);

	const signOut = useCallback(async () => {
		try {
			await api.post('/sessions/logout');

			localStorage.removeItem('@Corbik:User');

			setData({} as AuthState);

			addToast({
				title: 'Logged out with success',
				type: 'success'
			});
		} catch (err) {
			localStorage.removeItem('@Corbik:User');
			router.push('/');
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

	const forgotPassword = useCallback(async (email: string) => {
		setLoadingAction(true);
		try {
			await api.post('/password/forgot', {
					email
			});
		} catch (err) {
			console.log(err);
		}
		setLoadingAction(false);
	}, []);

	const resetPassword = useCallback(async ({ token, password, password_confirmation, setState }: ResetPassword) => {
		setLoadingAction(true);
		try {
			await api.post('/password/reset', {
				token,
				password,
				password_confirmation
			});

			setState(true);
			setTimeout(() => { router.push('/') }, 5000);
		} catch (err) {
			addToast({
				title: 'Something went wrong',
				type: 'error'
			});
		}
		setLoadingAction(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated: !!data.user, user: data.user, loading, loadingAction, signIn, signOut, updateUser, forgotPassword, resetPassword }}
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
	if (loading || (!isAuthenticated && window.location.pathname !== '/account/login' && window.location.pathname !== '/account/forgot-password' && window.location.pathname !== '/account/reset-password')) {
		return <Login />;
	} else if (isAuthenticated && window.location.pathname !== '/account/login'  && window.location.pathname !== '/account/forgot-password' && window.location.pathname !== '/account/reset-password') {
		console.log('tru');
	}
	return children;
};

export async function getServerSideProps(context: GetServerSidePropsContext, children) {
  try {
    const cookies = nookies.get(context);
    console.log(cookies);
		console.log('tururuu');
    return children;
  } catch (err) {
    context.res.writeHead(302, { Location: "/account/login" });
    context.res.end();
    return { props: {} };
  }
}
