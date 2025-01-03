import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from 'utils/utils';
import { IPublicUser } from 'types/types';
import UserService from 'services/UserService';

export const fetchAllUsers = createAsyncThunk<
	IPublicUser[], 
	void, 
	{rejectValue: string}
>(
	'users/getAll',
	async (_, {rejectWithValue}) => {
		try {
			const response = await UserService.getAllUsers();
			return response;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

interface DataProps {
	id: number;
	login: string;
	email: string;
}

interface ISendFriendRequestAction {
	id: number;
	data: DataProps;
}

export const sendFriendRequest = createAsyncThunk<
	ISendFriendRequestAction,
	ISendFriendRequestAction,
	{rejectValue: string}
>(
	'users/friendRequest',
	async({id, data}, {rejectWithValue}) => {
		try {
			UserService.sendFriendRequest(id, data);
			return {id, data};
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

interface ICancelFriendRequestAction {
	toId: number;
	fromId: number;
}

export const cancelFriendRequest = createAsyncThunk<
	ICancelFriendRequestAction,
	ICancelFriendRequestAction,
	{rejectValue: string}
>(
	'users/cancelRequest',
	async({toId, fromId}, {rejectWithValue}) => {
		try {
			UserService.cancelFriendRequest(toId, fromId);
			return {toId, fromId};
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);