import Router from 'next/router';
import { destroyCookie, parseCookies } from "nookies";

export function signOut() {
	console.log('cheguei signOut')
	console.log(parseCookies(undefined, 'corbik.token'))
	destroyCookie(null, 'corbik.token', { path: "/ " });

	localStorage.removeItem('@Corbik:User');
	// destroyCookie(undefined, 'nextauth.refreshToken');

	Router.push('/account/login');
}
