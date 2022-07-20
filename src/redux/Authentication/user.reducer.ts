import { createSlice } from "@reduxjs/toolkit"
import { initialLoadUser, signIn, signOut, updateDietTargets } from "./authentication.actions"

interface IUser {
	info: {
		id: string
		name: string
		email: string
	},
	targets: {
		carbohydrates: number
		proteins: number
		fats: number
		calories: number
	},
	is_first_load_done: boolean
	pending: boolean
	error: boolean
	messages: Array<{title: string, type: 'success' | 'error'}>
}

const initialState: IUser = {
	info: {
		id: '',
		name: '',
		email: '',
	},
	targets: {
		carbohydrates: 0,
		proteins: 0,
		fats: 0,
		calories: 0,
	},
	is_first_load_done: false,
	pending: false,
	error: false,
	messages: [{title: '', type: 'success'}]
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Initial Load User
		builder.addCase(initialLoadUser.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(initialLoadUser.fulfilled, (state, action) => {
			state.pending = false
			state.info = action.payload.info
			state.targets = action.payload.targets

			state.messages = [
				...state.messages,
				{ title: 'Welcome back', type: 'success' }
			]
		}),
		builder.addCase(initialLoadUser.rejected, (state, action) => {
			state.pending = false
			state.error = true

			state.messages = [
				...state.messages,
				{ title: 'Error when signing up', type: 'error' }
			]
		}),
		// Sign In
		builder.addCase(signIn.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.pending = false
			state.info.id = action.payload.user.id
			state.info.name = action.payload.user.name
			state.info.email = action.payload.user.email

			state.messages = [
				...state.messages,
				{ title: 'Welcome back', type: 'success' }
			]
		}),
		builder.addCase(signIn.rejected, (state, action) => {
			state.pending = false
			state.error = true

			state.messages = [
				...state.messages,
				{ title: 'Erro ao criar conta', type: 'error' }
			]
		}),updateDietTargets
		// Sign Out User
		builder.addCase(signOut.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.pending = false
			state.info = initialState.info

			state.messages = [
				...state.messages,
				{ title: 'Você saiu com sucesso', type: 'success' }
			]
		}),
		builder.addCase(signOut.rejected, (state, action) => {
			state.pending = false
			state.error = true

			state.messages = [
				...state.messages,
				{ title: 'Erro ao sair', type: 'error' }
			]
		}),
		// Update Diet Targets
		builder.addCase(updateDietTargets.pending, (state, action) => {
			state.pending = true
			state.error = false
		}),
		builder.addCase(updateDietTargets.fulfilled, (state, action) => {
			state.pending = false
			console.log(action.meta)
			state.targets = {...action.meta.arg}

			state.messages = [
				...state.messages,
				{ title: 'Targets updated', type: 'success' }
			]
		}),
		builder.addCase(updateDietTargets.rejected, (state, action) => {
			state.pending = false
			state.error = true

			state.messages = [
				...state.messages,
				{ title: 'Target update error', type: 'error' }
			]
		})
	}
})

export default userSlice.reducer
