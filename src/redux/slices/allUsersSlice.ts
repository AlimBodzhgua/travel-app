import { createSlice } from '@reduxjs/toolkit';
import {
	fetchAllUsers,
	sendFriendRequest,
	cancelFriendRequest
} from 'redux/actions/allUsersActions';
import type { IPublicUser } from 'types/types';


export interface AllUsersSchema {
	isLoading: boolean;
	errorMessage: string | undefined;
	users: IPublicUser[] | [];
};

const initialState:AllUsersSchema = {
	isLoading: false,
	errorMessage: '',
	users: [],
};

const allUsersSlice = createSlice({
	name: 'allUsers',
	initialState,
	reducers: {},
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
				state.errorMessage = action.payload;
			})
			.addCase(sendFriendRequest.fulfilled, (state, action) => {
				const user = state.users.find((user) => user.id === action.payload.receivingId);

				if (user) {
					user.friendRequests.push(action.payload.requestingUser);
				}
			})
			.addCase(cancelFriendRequest.fulfilled, (state, action) => {
				const user = state.users.find((user) => user.id === action.payload.canceledUserId);

				if (user) {
					user.friendRequests = user.friendRequests.filter(request => request.id !== action.payload.receivedUserId);
				}
			});
	}
});

export const { actions: allUsersActions } = allUsersSlice;
export const { reducer: allUsersReducer } = allUsersSlice;