import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Authentication/user.reducer'
import dietReducer from './Food/diet.reducer'

const store = configureStore({
	reducer: {
		user: UserReducer,
		food: dietReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>

export default store
