import { signOut } from "@/contexts/AuthContext";
import Axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

let urls = {
    test: `https://api.corbik.com/`,
    development: `https://localhost:3333`,
    production: 'https://api.corbik.com/'
}

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);
		const api = Axios.create({
			baseURL: urls[process.env.NODE_ENV],
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true,
	});

	api.interceptors.response.use(response => {
		return response;
	}, (error: AxiosError) => {
		if (error.response.status === 401) {
				if (error.response.data?.message === 'You are not logged in') {
						cookies = parseCookies(ctx);

						const { 'corbik.token': token } = cookies;
						console.log(cookies);
						const originalConfig = error.config;

						if (process.browser) {
							signOut();
						}

						// if (!isRefreshing) {
						// 		isRefreshing = true;

						// 		api.post('/refresh', {
						// 				refreshToken,
						// 		}).then(response => {
						// 				const { token } = response.data;

						// 				setCookie(ctx, 'nextauth.token', token, {
						// 						maxAge: 60 * 60 * 24 * 30, // 30 days
						// 						path: '/'
						// 				});

						// 				setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
						// 						maxAge: 60 * 60 * 24 * 30, // 30 days
						// 						path: '/'
						// 				});

						// 				api.defaults.headers['Authorization'] = `Bearer ${token}`;

						// 				failedRequestsQueue.forEach(request => request.onSuccess(token));
						// 				failedRequestsQueue = [];
						// 		}).catch(err => {
						// 				failedRequestsQueue.forEach(request => request.onFailure(err));
						// 				failedRequestsQueue = [];

						// 				if (process.browser) {
						// 						signOut();
						// 				}
						// 		}).finally(() => {
						// 				isRefreshing = false;
						// 		});

						// }

						return new Promise((resolve, reject) => {
								failedRequestsQueue.push({
										onSuccess: (token: string) => {
												originalConfig.headers['Authorization'] = `Bearer ${token}`;

												resolve(api(originalConfig));
										},
										onFailure: (err: AxiosError) => {
												reject(err);
										}
								});
						});
				}	else if (error.response.data?.message === 'You are already logged in') {
					cookies = parseCookies(ctx);

					const { 'corbik.token': token } = cookies;
					console.log(cookies);
					const originalConfig = error.config;

					destroyCookie(ctx, 'corbik.token');

					if (process.browser) {
						signOut();
					}

					return new Promise((resolve, reject) => {
							failedRequestsQueue.push({
									onSuccess: (token: string) => {
											originalConfig.headers['Authorization'] = `Bearer ${token}`;

											resolve(api(originalConfig));
									},
									onFailure: (err: AxiosError) => {
											reject(err);
									}
							});
					});
				} else {
						if (process.browser) {
								signOut();
						} else {
								return Promise.reject(new AuthTokenError());
						}
				}
		}

		return Promise.reject(error);
});

	return api;
}
