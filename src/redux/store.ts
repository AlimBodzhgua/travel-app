import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userSlice';
import { allUsersReducer } from './reducers/allUsersSlice';

export const store = configureStore({
	reducer: {
		userReducer,
		allUsersReducer,
	}
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;