import {createAsyncThunk} from '@reduxjs/toolkit';
import {getErrorMessage} from 'utils/utils';
import {IPublicUser, IUser} from 'types/types';
import UserService from 'API/UserService';

export const fetchAllUsers = createAsyncThunk<IPublicUser[], void, {rejectValue: string}>(
	'users/getAll',
	async (_, {rejectWithValue}) => {
		try {
			const response = await UserService.getAllUsers();
			return response;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
)

interface DataProps {
	id: number;
	login: string;
	email: string;
}

export const sendFriendRequest = createAsyncThunk<
	{id: number, data: DataProps},
	{id: number, data: DataProps},
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
)

export const cancelFriendRequest = createAsyncThunk<
	{toId: number, fromId: number},
	{toId: number, fromId: number},
	{rejectValue: string}
>(
	'users/cancelRequest',
	async({toId, fromId}, {rejectWithValue}) => {
		try {
			UserService.cancelFriendRequest(toId, fromId);
			return {toId, fromId}
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
)