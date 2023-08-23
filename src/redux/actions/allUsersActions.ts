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