import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchAllUsers } from 'redux/actions/allUsersActions';
import {IPublicUser} from 'types/types';


interface UsersState {
	isLoading: boolean;
	errorMessage: string | undefined;
	users: IPublicUser[] | [];
}

const initialState:UsersState = {
	isLoading: false,
	errorMessage: '',
	users: [],
}

const allUsersSlice = createSlice({
	name: 'allUsers',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchAllUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload
			})
	}
})

export default allUsersSlice.reducer;