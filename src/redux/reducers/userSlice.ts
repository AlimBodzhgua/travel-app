import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	IUser, 
	ITravel, 
	IBacklog, 
	IGroup, 
	ICard, 
	IFriend
} from 'types/types';
import {
	acceptFriendRequest,
	deleteFriend,
	registerUser, 
	loginUser
} from 'redux/actions/userActions';
import {arrayMove} from '@dnd-kit/sortable';

export interface UserSchema {
	isLoading: boolean;
	isAuth: boolean;
	errorMessage: string | undefined;
	authData?: IUser;
}

const initialState: UserSchema = {
	isAuth: false,
	isLoading: false,
	errorMessage: '',
	authData: undefined,
};


export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.authData = action.payload;
			state.isAuth = true;
		},
		clearError(state) {
			state.errorMessage = '';
		},
		logoutUser(state) {
			state.authData = undefined;
			state.isAuth = false;
		},
		changeLogin(state, action: PayloadAction<string>) {
			if (state.authData) {
				state.authData.login = action.payload;
			}
		},
		changeEmail(state, action: PayloadAction<string>) {
			if (state.authData) {
				state.authData.email = action.payload;
			}
		},
		rejectFriendRequest(state, action: PayloadAction<number>) {
			if (state.authData) {
				state.authData.friendRequests = state.authData.friendRequests.filter(request => request.id !== action.payload);
			}
		},
		addTravel(state, action: PayloadAction<ITravel>) {
			state.authData?.travels.push(action.payload);
		},
		deleteTravel(state, action: PayloadAction<string>) {
			const filteredTravels = state.authData!.travels.filter((travel) => travel.id !== action.payload);
			state.authData!.travels = filteredTravels;
		},
		editTravel(state, action: PayloadAction<
			Omit<ITravel, 'members' | 'backlog' | 'groups'>
		>) {
			state.authData?.travels.forEach(travel => {
				if (travel.id === action.payload.id) {
					travel.name = action.payload.name;
					travel.dateStart = action.payload.dateStart;
					travel.dateEnd = action.payload.dateEnd;
				}
			});
		},
		moveTravels(state, action: PayloadAction<{ activeId: string, overId: string }>) {
			if (state.authData) {
				const activeIndex = state.authData?.travels.findIndex((travel) => {
					return travel.id === action.payload.activeId;
				});
				const overIndex = state.authData?.travels.findIndex((travel) => {
					return travel.id === action.payload.overId;
				});
				state.authData.travels = arrayMove(state?.authData?.travels, activeIndex, overIndex);
			}
		},
		addMember(state, action: PayloadAction<{ travelId: string, member: IFriend }>) {
			state.authData?.travels.forEach(travel => {
				if (travel.id === action.payload.travelId) {
					travel.members.push(action.payload.member);
				}
			});
		},
		deleteMember(state, action: PayloadAction<{ travelId: string, memberId: number }>) {
			state.authData?.travels.forEach(travel => {
				if (travel.id === action.payload.travelId) {
					travel.members = travel.members
						.filter(member => member.id !== action.payload.memberId);
				}
			});
		},
		addBacklog(state, action: PayloadAction<{ travelId: string, backlog: IBacklog }>) {
			state.authData?.travels.forEach(travel => {
				if (travel.id === action.payload.travelId) {
					travel.backlog.push(action.payload.backlog);
				}
			});
		},
		deleteBacklog(state, action: PayloadAction<{ travelId: string, backlogId: string }>) {
			state.authData?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.backlog.splice(travel.backlog.findIndex((item) => 
						item.id === action.payload.backlogId
					), 1);
				}
			});
		},
		editBacklog(state, action: PayloadAction<{
			travelId: string, 
			backlogId: string, 
			value: string}>
		) {
			state.authData?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.backlog.forEach(item => {
						if (item.id === action.payload.backlogId) {
							item.name = action.payload.value;
						}
					});
				}
			});
		},
		moveBacklogs(state, action: PayloadAction<{
			travelId: string,
			activeId: string,
			overId: string,
		}>) {
			state.authData?.travels.forEach((travel) => {
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
		addGroup(state, action: PayloadAction<{ travelId: string, group: IGroup }>) {
			state.authData?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.push(action.payload.group);
				}
			});
		},
		deleteGroup(state, action: PayloadAction<{travelId: string, groupId: string}>) {
			state.authData?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.splice(travel.groups.findIndex(group => 
						group.id === action.payload.groupId
					), 1);
				}
			});
		},
		editGroup(state, action: PayloadAction<{
			travelId: string,
			groupId: string,
			value: string
		}>) {
			state.authData?.travels.forEach((travel) => {
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
			travelId: string, 
			activeId: string, 
			overId: string
		}>) {
			state.authData?.travels.forEach((travel) => {
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
			travelId: string, 
			groupId: string,
			card: ICard
		}>) {
			state.authData?.travels.forEach((travel) => {
				if (travel.id === action.payload.travelId) {
					travel.groups.forEach(group => {
						if (group.id === action.payload.groupId) {
							group.cards.push(action.payload.card);
						}
					});
				}
			});
		},
		deleteCard(state, action: PayloadAction<{
			cardId: string,
			groupId: string,
			travelId: string
		}>) {
			state.authData?.travels.forEach(travel => {
				if (travel.id === action.payload.travelId) {
					travel.groups.forEach(group => {
						if (group.id === action.payload.groupId) {
							group.cards.splice(group.cards.findIndex(
								card => card.id === action.payload.cardId)
							, 1);
						}
					});
				}
			});
		},
		moveCards(state, action: PayloadAction<{
			travelId: string,
			groupId: string,
			activeId: string,
			overId: string
		}>) {
			state.authData?.travels.forEach((travel) => {
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
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuth = true;
				state.authData = action.payload;
				state.errorMessage = '';
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload;
			})
			.addCase(loginUser.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuth = true;
				state.authData = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload;
			})
			.addCase(acceptFriendRequest.fulfilled, (state, action) => {
				if (state.authData) {
					state.authData.friendRequests = state.authData.friendRequests
						.filter(request => request.id !== action.payload.id);
					state.authData.friends.push(action.payload);
				}	
			})
			.addCase(acceptFriendRequest.rejected, (state, action) => {
				state.errorMessage = action.payload;
				state.isLoading = false;
			})
			.addCase(deleteFriend.fulfilled, (state, action) => {
				if (state.authData) {
					state.authData.friends = state.authData.friends.filter(friend => friend.id !== action.payload);
				}
			})
			.addCase(deleteFriend.rejected, (state, action) => {
				state.errorMessage = action.payload;
				state.isLoading = false;
			});
	}
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;