import { api } from '@/services/apiClient';
import Router from 'next/router';
import { destroyCookie, parseCookies } from "nookies";

export function signOut() {
	console.log('cheguei signOut')
	console.log(parseCookies(undefined, 'corbik.token'))
	destroyCookie(null, 'corbik.token', { path: "/" });

	localStorage.removeItem('@Corbik:User');
	// destroyCookie(undefined, 'nextauth.refreshToken');

	Router.push('/account/login');
}

export function alreadyLoggedIn() {
	const user = localStorage.getItem('@Corbik:User');
	if (user) {
		// setData({ user: JSON.parse(user) });
	} else {
		api.get('/profile').then(response => {
				localStorage.setItem('@Corbik:User', JSON.stringify(response.data));
				setData({ user: response.data });
				console.log(response);
		})
		.catch(() => {
			console.log('2cheguei else useeffect auth')
			signOut();
			Router.push('/account/login');
		})
	}
}
