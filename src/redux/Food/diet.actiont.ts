/* eslint-disable camelcase */
import { api } from '@/services/apiClient'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initialLoadFoodLibrary = createAsyncThunk(
	'/food/initial-load-food-library',
	async () => {
		const response = await api.post('/users/initial-load', {
			module: 'food-library'
		})

		return response.data
	}
)

export const initialLoadFoodLogs = createAsyncThunk(
	'/food/initial-load-food-logs',
	async () => {
		const response = await api.post('/users/initial-load', {
			module: 'food-logs'
		})

		return response.data
	}
)

interface ISearchFood {
	food_name: string
}

export const searchFood = createAsyncThunk(
	'/food/search',
	async ({ food_name }: ISearchFood) => {
		const response = await api.post('/food/search', {
			food_name
		})

		return response.data
	}
)

export const createFood = createAsyncThunk(
	'/food/search',
	async ({ food_name }: ISearchFood) => {
		const response = await api.post('/food/search', {
			food_name
		})

		return response.data
	}
)

interface ICreateFoodLog {
	food_id: string;
	//
	name: string;
	unit_type: string;
	amount: number;
	//
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	//
	when: string;
}

export const logFood = createAsyncThunk(
	'/food/create-food-log',
	async (logData: ICreateFoodLog) => {
		const response = await api.post(`/food/log`, logData);

		return response.data
	}
)

export const deleteFoodLog = createAsyncThunk(
	'/food/delete-food-log',
	async (log_id: string) => {
		const response = await api.delete(`/food/log/specific/${log_id}`);

		return response.data
	}
)
