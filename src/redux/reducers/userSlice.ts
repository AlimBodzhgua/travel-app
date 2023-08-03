import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, ITravel, IBacklog, IGroup, ICard} from 'types/types';
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
		editTravel(state, action: PayloadAction<
			Omit<ITravel, 'backlog' | 'groups'>
		>) {
			state.user?.travels.forEach(travel => {
				if (travel.id === action.payload.id) {
					travel.name = action.payload.name;
					travel.dateStart = action.payload.dateStart;
					travel.dateEnd = action.payload.dateEnd
				}
			})
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
		},
		addGroup(state, action: PayloadAction<{id: number, group: IGroup}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.id) {
					travel.groups.push(action.payload.group);
				}
			})
		},
		deleteGroup(state, action: PayloadAction<{travelId: number, groupId: number}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.splice(travel.groups.findIndex(group => 
						group.id === action.payload.groupId
					), 1)
				}
			})
		},
		editGroup(state, action: PayloadAction<{
			travelId: number,
			groupId: number,
			value: string
		}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.forEach(group => {
						if (group.id === action.payload.groupId) {
							group.title = action.payload.value;
						}
					})
				}
			})
		},
		addCard(state, action: PayloadAction<{
			travelId: number, 
			groupId: number,
			card: ICard
		}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.forEach(group => {
						if (group.id === action.payload.groupId) {
							group.cards.push(action.payload.card);
						}
					})
				}
			})
		},
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