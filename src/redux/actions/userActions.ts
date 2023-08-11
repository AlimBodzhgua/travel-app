import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserLogin } from 'types/types';
import { getErrorMessage, modifyUserResponseObject, saveUserToLocalStorage } from 'utils/utils';
import UserService from 'API/UserService';

export const registerUser = createAsyncThunk(
	'users/register',
	async (data: IUser, {rejectWithValue}) => {
		try {
			const response = await UserService.register(data);
			const user = modifyUserResponseObject(response);
			saveUserToLocalStorage(user);
			return user; 
		} catch (e) {
			rejectWithValue(getErrorMessage(e));
		}
	}
);

export const loginUser = createAsyncThunk(
	'users/login',
	async (data: IUserLogin, {rejectWithValue}) => {
		try {
			const response = await UserService.login(data);
			const user = modifyUserResponseObject(response);
			saveUserToLocalStorage(user);
			return user;
		} catch (e) {
			rejectWithValue(getErrorMessage(e));
		}
	}
);