import { createSlice } from "@reduxjs/toolkit"
import {  deleteFoodLog, initialLoadFood, initialLoadFoodLibrary, initialLoadFoodLogs, logFood, searchFood } from "./diet.actiont"

interface ILibrary {
	id: string
	brand: string
	name: string

	current_unit: {
		amount: number
		abbreviation: string
	}

	carbohydrates: number
	proteins: number
	fats: number
}

export interface ILog {
	id: string
	food: {
		id: string
		name: string
		brand: string
	}
	date: {
		day: number
		month: string
		year: number
		full: string
	},
	amount: number
	unit_abbreviation: string
	macros: {
		carbohydrates: number
		proteins: number
		fats: number
		calories: number
	}
}

interface IUser {
	own_library: ILibrary[]
	logs: ILog[]
	is_first_load_done: boolean
	pending: boolean
	error: boolean
	messages: Array<{title: string, type: 'success' | 'error'}>
}

const initialState: IUser = {
	own_library: [],
	logs: [],
	is_first_load_done: false,
	pending: false,
	error: false,
	messages: [{title: '', type: 'success'}]
}

export const dietSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Initial Load Food Library
		builder.addCase(initialLoadFoodLibrary.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(initialLoadFoodLibrary.fulfilled, (state, action) => {
			state.pending = false

			state.own_library = action.payload
			// state.message = [...state.message, {title: 'Account created', type: 'success'}]
		}),
		builder.addCase(initialLoadFoodLibrary.rejected, (state, action) => {
			state.pending = false
			state.error = true

			// state.message = [...state.message, {title: 'Error when creating account', type: 'success'}]
		}),
		// Initial Load Food Logs
		builder.addCase(initialLoadFoodLogs.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(initialLoadFoodLogs.fulfilled, (state, action) => {
			state.pending = false

			state.logs = action.payload
			// state.message = [...state.message, {title: 'Account created', type: 'success'}]
		}),
		builder.addCase(initialLoadFoodLogs.rejected, (state, action) => {
			state.pending = false
			state.error = true

			// state.message = [...state.message, {title: 'Error when creating account', type: 'success'}]
		}),
		// Search Food
		builder.addCase(searchFood.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(searchFood.fulfilled, (state, action) => {
			state.pending = false

			state.own_library = action.payload.own_library
		}),
		builder.addCase(searchFood.rejected, (state, action) => {
			state.pending = false
			state.error = true
		}),
		// Log Food
		builder.addCase(logFood.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(logFood.fulfilled, (state, action) => {
			state.pending = false

			state.logs = [...state.logs, action.payload]
		}),
		builder.addCase(logFood.rejected, (state, action) => {
			state.pending = false
			state.error = true
		})
		// Delete Log
		builder.addCase(deleteFoodLog.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(deleteFoodLog.fulfilled, (state, action) => {
			state.pending = false
			const logs = state.logs.filter(log => log.id !== action.meta.arg)
			console.log(action.meta.arg)
			console.log(logs)

			state.logs = logs

		}),
		builder.addCase(deleteFoodLog.rejected, (state, action) => {
			state.pending = false
			state.error = true
		})
}
})

export default dietSlice.reducer
