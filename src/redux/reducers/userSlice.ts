import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, ITravel} from 'types/types';
import {Dayjs} from 'dayjs';
import {registerUser, loginUser} from 'redux/actions/userActions';

interface UserState {
	isLoading: boolean;
	isAuth: boolean;
	errorMessage: string | undefined;
	user: IUser | null
}

const initialState: UserState = {
	isAuth: false,
	isLoading: false,
	errorMessage: '',
	user: null,
}


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
			state.isAuth = true;
		},
		addTravel(state, action: PayloadAction<ITravel>) {
			state.user?.travels.push(action.payload);
		}
	},
	extraReducers: {
		[registerUser.pending.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
			state.isLoading = false;
			state.isAuth = true;
			state.errorMessage = '';
			state.user = action.payload;
		},
		[registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.errorMessage = action.payload;
		},
		[loginUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
			state.isAuth = true;
			state.user = action.payload;
		}
	}
})

export default userSlice.reducer;