import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage, modifyUserResponseObject, saveUserToLocalStorage } from 'utils/utils';
import { StateSchema } from 'redux/config/StateSchema';
import { selectUserInfo } from 'redux/selectors/selectors';
import type { IUser, IUserLogin, IFriend, ITravel } from 'types/types';
import UserService from 'services/UserService';

export const registerUser = createAsyncThunk<
	IUser, 
	IUser, 
	{ rejectValue: string }
>(
	'user/register',
	async (data, { rejectWithValue }) => {
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
	{ rejectValue: string }
>(
	'user/login',
	async (data, { rejectWithValue }) => {
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
	{ requestUser: IFriend, responseUser: IFriend },
	{ rejectValue: string }
>(
	'user/acceptFriendRequest',
	async(request, { rejectWithValue }) => {
		const { requestUser, responseUser } = request;

		try {
			await UserService.acceptFriendRequest(requestUser, responseUser);
			return requestUser;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

export const deleteFriend = createAsyncThunk<
	number,
	{ firstUserId: number, secondUserId: number },
	{ rejectValue: string }
>(
	'user/deleteFrined',
	async(data, { rejectWithValue }) => {
		const { firstUserId, secondUserId } = data;

		try {
			await UserService.deleteFriend(firstUserId, secondUserId);
			return secondUserId;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

export const addMember = createAsyncThunk<
	{ travel: ITravel, member: IFriend },
	{ travel: ITravel, member: IFriend },
	{ rejectValue: string, state: StateSchema }
>(
	'user/addMember',
	async (data, { rejectWithValue, getState }) => {
		const userInfo = selectUserInfo(getState());
		const { travel, member } = data;

		const updatedTravel = {
			...travel!,
			members: [...travel!.members, userInfo],
		};

		try {
			await UserService.addTravelToMember(member.id, updatedTravel);

			return data;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
)

export const deleteMember = createAsyncThunk<
	{ travelId: string, memberId: number },
	{ travelId: string, memberId: number },
	{ rejectValue: string }
>(
	'user/deleteMember',
	async (data, { rejectWithValue }) => {
		const { travelId, memberId } = data;

		try {
			await UserService.removeTravelByMember(memberId, travelId);

			return data;
		} catch (e) {
			return rejectWithValue(getErrorMessage(e));
		}
	}
)