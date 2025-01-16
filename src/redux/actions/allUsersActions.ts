import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from 'utils/utils';
import type { IPublicUser } from 'types/types';
import UserService from 'services/UserService';

export const fetchAllUsers = createAsyncThunk<
	IPublicUser[], 
	void, 
	{ rejectValue: string }
>(
	'allUsers/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const response = await UserService.getAllUsers();
			return response;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

type RequestingUser = {
	id: number;
	login: string;
	email: string;
}

type RequestType = {
	receivingId: number;
	requestingUser: RequestingUser;
}

export const sendFriendRequest = createAsyncThunk<
	RequestType,
	RequestType,
	{ rejectValue: string }
>(
	'allUsers/friendRequest',
	async(request, { rejectWithValue }) => {
		const { receivingId, requestingUser } = request;
		try {
			await UserService.sendFriendRequest(receivingId, requestingUser);
			return { receivingId, requestingUser };
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

type CancelRequestType = {
	receivedUserId: number;
	canceledUserId: number;
}

export const cancelFriendRequest = createAsyncThunk<
	CancelRequestType,
	CancelRequestType,
	{ rejectValue: string }
>(
	'allUsers/cancelRequest',
	async(request, { rejectWithValue }) => {
		const { receivedUserId, canceledUserId} = request;

		try {
			await UserService.cancelFriendRequest(receivedUserId, canceledUserId);
			return { receivedUserId, canceledUserId };
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);