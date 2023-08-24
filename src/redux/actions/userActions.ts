import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserLogin } from 'types/types';
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