import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, ITravel, IBacklog} from 'types/types';
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
		},
		deleteTravel(state, action: PayloadAction<number>) {
			state.user?.travels.splice(state.user?.travels.findIndex((travel) => 
				travel.id === action.payload
			), 1);
		},
		addBacklog(state, action: PayloadAction<{id: string, backlog: IBacklog}>) {
			state.user?.travels.forEach(travel => {
				if (travel.id === Number(action.payload.id)) {
					travel.backlog.push(action.payload.backlog);
				}
			})
		},
		deleteBacklog(state, action: PayloadAction<{travelId: number, backlogId: number}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.backlog.splice(travel.backlog.findIndex((item) => 
						item.id === action.payload.backlogId
					), 1);
				}
			})
		},
		editBacklog(state, action: PayloadAction<{
			travelId: number, 
			backlogId: number, 
			value: string}>
		) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.backlog.forEach(item => {
						if (item.id === action.payload.backlogId) {
							item.name = action.payload.value;
						}
					})
				}
			})
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