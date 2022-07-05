/* eslint-disable camelcase */
import { api } from '@/services/apiClient'
import { createAsyncThunk } from '@reduxjs/toolkit'
import cookie from 'js-cookie'
// import mixpanel from 'mixpanel-browser'

interface ISignInProps {
	email: string
	password: string
}

export const initialLoadUser = createAsyncThunk(
	'/users/initial-load',
	async () => {
		const response = await api.post('/users/initial-load', {
			module: 'user'
		})

		return response.data
	}
)

export const signIn = createAsyncThunk(
	'/authentication/signin',
	async ({ email, password }: ISignInProps) => {
		const response = await api.post('/authentication/signin', {
			email,
			password
		})

		cookie.set('nextauth.token', response.data.token, {
			expires: 60 * 60 * 24 * 30, // 30 days
			path: '/'
		})

		cookie.set('nextauth.refreshToken', response.data.refresh_token, {
			expires: 60 * 60 * 24 * 30, // 30 days
			path: '/'
		})

		// mixpanel.identify(response.data.user.id)

		return response.data
	}
)

export const signOut = createAsyncThunk('/authentication/logout', async () => {
	cookie.set('nextauth.token', '', {
		expires: 0,
		path: '/'
	})

	cookie.set('nextauth.refreshToken', '', {
		expires: 0,
		path: '/'
	})
})

interface IUpdateDietTargets {
	carbohydrates: number
	proteins: number
	fats: number
	calories: number
}

export const updateDietTargets = createAsyncThunk('/users/update-diet-targets', async ({carbohydrates, proteins, fats, calories}) => {
	const response = await api.put('/profile/diet-targets', {
		carbohydrates,
		proteins,
		fats,
		calories
	});

	return response.data
})

