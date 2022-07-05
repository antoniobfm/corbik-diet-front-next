import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

const urls = {
	test: `https://api.qualaboa.app/`,
	development: `http://localhost:${process.env.NEXT_PUBLIC_BACK_DEV_PORT}`,
	production: 'https://api.qualaboa.app/'
}

let isRefreshing = false
let failedRequestsQueue = []

export function setupAPIClient(ctx = undefined) {
	let cookies = parseCookies(ctx)
	const api = axios.create({
		baseURL: urls[process.env.NODE_ENV],
		headers: {
			Authorization: `Bearer ${cookies['nextauth.token']}`
		}
	})

	api.interceptors.response.use(
		response => {
			return response
		},
		(error: AxiosError) => {
			if (error.response && error.response.status === 401) {
				console.log(error.response.data.message)
				if (error.response.data.message === 'Invalid token') {
					cookies = parseCookies(ctx)

					const { 'nextauth.refreshToken': refreshToken } = cookies
					const originalConfig = error.config

					if (!isRefreshing) {
						isRefreshing = true

						api
							.post('/authentication/refresh', {
								token: refreshToken
							})
							.then(response => {
								const { token } = response.data

								setCookie(ctx, 'nextauth.token', token, {
									maxAge: 60 * 60 * 24 * 30, // 30 days
									path: '/'
								})

								setCookie(
									ctx,
									'nextauth.refreshToken',
									response.data.refresh_token,
									{
										maxAge: 60 * 60 * 24 * 30, // 30 days
										path: '/'
									}
								)

								api.defaults.headers.Authorization = `Bearer ${token}`

								failedRequestsQueue.forEach(request => request.onSuccess(token))
								failedRequestsQueue = []
							})
							.catch(err => {
								failedRequestsQueue.forEach(request => request.onFailure(err))
								failedRequestsQueue = []

								if (process.browser) {
									destroyCookie(undefined, 'nextauth.token')
									destroyCookie(undefined, 'nextauth.refreshToken')
								}
							})
							.finally(() => {
								isRefreshing = false
							})
					}

					return new Promise((resolve, reject) => {
						failedRequestsQueue.push({
							onSuccess: (token: string) => {
								originalConfig.headers.Authorization = `Bearer ${token}`

								resolve(api(originalConfig))
							},
							onFailure: (err: AxiosError) => {
								reject(err)
							}
						})
					})
				} else {
					if (process.browser) {
						destroyCookie(undefined, 'nextauth.token')
						destroyCookie(undefined, 'nextauth.refreshToken')
					} else {
						return Promise.reject(new AuthTokenError())
					}
				}
			}

			return Promise.reject(error)
		}
	)

	return api
}
