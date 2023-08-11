import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, ITravel, IBacklog, IGroup, ICard} from 'types/types';
import {arrayMove} from '@dnd-kit/sortable';
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
};


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
			state.isAuth = true;
		},
		logoutUser(state) {
			state.user = null;
			state.isAuth = false;
		},
		changeLogin(state, action: PayloadAction<string>) {
			if (state.user) {
				state.user.login = action.payload;
			}
		},
		changeEmail(state, action: PayloadAction<string>) {
			if (state.user) {
				state.user.email = action.payload;
			}
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
					travel.dateEnd = action.payload.dateEnd;
				}
			});
		},
		moveTravels(state, action: PayloadAction<{activeId: number, overId: number}>) {
			if (state.user !== null) {
				const activeIndex = state.user.travels.findIndex((travel) => {
					return travel.id === action.payload.activeId;
				});
				const overIndex = state.user.travels.findIndex((travel) => {
					return travel.id === action.payload.overId;
				});
				state.user.travels = arrayMove(state.user.travels, activeIndex, overIndex);
			}
		},
		addBacklog(state, action: PayloadAction<{id: string, backlog: IBacklog}>) {
			state.user?.travels.forEach(travel => {
				if (travel.id === Number(action.payload.id)) {
					travel.backlog.push(action.payload.backlog);
				}
			});
		},
		deleteBacklog(state, action: PayloadAction<{travelId: number, backlogId: number}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.backlog.splice(travel.backlog.findIndex((item) => 
						item.id === action.payload.backlogId
					), 1);
				}
			});
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
					});
				}
			});
		},
		moveBacklogs(state, action: PayloadAction<{travelId: number, activeId: number ,overId: number}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					const activeIndex = travel.backlog.findIndex((log) => {
						return log.id === action.payload.activeId;
					});
					const overIndex = travel.backlog.findIndex((log) => {
						return log.id === action.payload.overId;
					});
					travel.backlog = arrayMove(travel.backlog, activeIndex, overIndex);
				}
			});
		},
		addGroup(state, action: PayloadAction<{id: number, group: IGroup}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.id) {
					travel.groups.push(action.payload.group);
				}
			});
		},
		deleteGroup(state, action: PayloadAction<{travelId: number, groupId: number}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.splice(travel.groups.findIndex(group => 
						group.id === action.payload.groupId
					), 1);
				}
			});
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
					});
				}
			});
		},
		moveGroups(state, action: PayloadAction<{
			travelId: number, 
			activeId: number, 
			overId: number
		}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					const activeIndex = travel.groups.findIndex((group) => {
						return group.id === action.payload.activeId;
					});
					const overIndex = travel.groups.findIndex((group) => {
						return group.id === action.payload.overId;
					});
					travel.groups = arrayMove(travel.groups, activeIndex, overIndex);
				}
			});
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
					});
				}
			});
		},
		moveCards(state, action: PayloadAction<{
			travelId: number,
			groupId: number,
			activeId: number,
			overId: number
		}>) {
			state.user?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.forEach(group => {
						if (group.id === action.payload.groupId) {
							const activeIndex = group.cards.findIndex((card) => {
								return card.id === action.payload.activeId;
							});
							const overIndex = group.cards.findIndex((card) => {
								return card.id === action.payload.overId;
							});
							group.cards = arrayMove(group.cards, activeIndex, overIndex);
						}
					});
				}
			});	
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
});

export default userSlice.reducer;