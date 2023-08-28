import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserLogin, IFriend } from 'types/types';
import { getErrorMessage, modifyUserResponseObject, saveUserToLocalStorage } from 'utils/utils';
import UserService from 'API/UserService';

export const registerUser = createAsyncThunk<
	IUser, 
	IUser, 
	{rejectValue: string}
>(
	'users/register',
	async (data, {rejectWithValue}) => {
		try {
			const response = await UserService.register(data);
			const user = modifyUserResponseObject(response);
			saveUserToLocalStorage(user);
			return user; 
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

export const loginUser = createAsyncThunk<
	IUser,
	IUserLogin,
	{rejectValue: string}
>(
	'users/login',
	async (data, {rejectWithValue}) => {
		try {
			const response = await UserService.login(data);
			const user = modifyUserResponseObject(response);
			saveUserToLocalStorage(user);
			return user;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);


export const acceptFriendRequest = createAsyncThunk<
	IFriend,
	{requestUser: IFriend, responseUser: IFriend},
	{rejectValue: string}
>(
	'user/acceptFriendRequest',
	async({requestUser, responseUser}, {rejectWithValue}) => {
		try {
			UserService.acceptFriendRequest(requestUser, responseUser);
			return requestUser
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
)

export const deleteFriend = createAsyncThunk<
	number,
	{firstUserId: number, secondUserId: number},
	{rejectValue: string}
>(
	'user/deleteFrined',
	async({firstUserId, secondUserId}, {rejectWithValue}) => {
		try {
			UserService.deleteFriend(firstUserId, secondUserId);
			return secondUserId;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
)