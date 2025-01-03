import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '../reducers/userSlice';
import { allUsersReducer } from '../reducers/allUsersSlice';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		user: userReducer,
		allUsers: allUsersReducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];