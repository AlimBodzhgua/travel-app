import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import {
	getAcceptFriendRequestReducerBuilder,
	getDeleteFrinedReducerBuilder,
	getLoginUserReducerBuilder,
	getRegisterUserReducerBuilder,
} from 'redux/reducers/reducers';
import type {
	IUser, 
	ITravel, 
	IBacklog, 
	IGroup, 
	ICard, 
	IFriend
} from 'types/types';

export interface UserSchema {
	isLoading: boolean;
	isAuth: boolean;
	errorMessage: string | undefined;
	authData?: IUser;
};

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
			const travelIndex = state.authData!.travels.findIndex((travel) => travel.id === action.payload);
			state.authData!.travels.splice(travelIndex, 1);
		},
		editTravel(state, action: PayloadAction<Omit<ITravel, 'members' | 'backlog' | 'groups' | 'places'>>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.id);
			if (travel) {
				travel.name = action.payload.name;
				travel.dateStart = action.payload.dateStart;
				travel.dateEnd = action.payload.dateEnd;
			}
		},
		moveTravels(state, action: PayloadAction<{ activeId: string, overId: string }>) {
			if (state.authData) {
				const activeIndex = state.authData.travels.findIndex((t) => t.id === action.payload.activeId);
				const overIndex = state.authData.travels.findIndex((t) => t.id === action.payload.overId);
				state.authData.travels = arrayMove(state.authData.travels, activeIndex, overIndex);
			}
		},
		addMember(state, action: PayloadAction<{ travelId: string, member: IFriend }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				travel.members.push(action.payload.member);
			}
		},
		deleteMember(state, action: PayloadAction<{ travelId: string, memberId: number }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const memberIndex = travel.members.findIndex((member) => member.id === action.payload.memberId);
				travel.members.splice(memberIndex, 1);
			}
		},
		addBacklog(state, action: PayloadAction<{ travelId: string, backlog: IBacklog }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				travel.backlog.push(action.payload.backlog);
			}
		},
		deleteBacklog(state, action: PayloadAction<{ travelId: string, backlogId: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const backlogIndex = travel.backlog.findIndex((backlog) => backlog.id === action.payload.backlogId);
				travel.backlog.splice(backlogIndex, 1);
			}
		},
		editBacklog(state, action: PayloadAction<{ travelId: string, backlogId: string, value: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const backlog = travel.backlog.find((backlog) => backlog.id === action.payload.backlogId);

				if (backlog) {
					backlog.name = action.payload.value;
				}
			}
		},
		moveBacklogs(state, action: PayloadAction<{ travelId: string,activeId: string,overId: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const activeIndex = travel.backlog.findIndex((log) => log.id === action.payload.activeId);
				const overIndex = travel.backlog.findIndex((log) => log.id === action.payload.overId);
				travel.backlog = arrayMove(travel.backlog, activeIndex, overIndex);
			}
		},
		addGroup(state, action: PayloadAction<{ travelId: string, group: IGroup }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				travel.groups.push(action.payload.group);
			}
		},
		deleteGroup(state, action: PayloadAction<{ travelId: string, groupId: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const groupIndex = travel.groups.findIndex((group) => group.id === action.payload.groupId);
				travel.groups.splice(groupIndex, 1);
			}
		},
		editGroup(state, action: PayloadAction<{ travelId: string, groupId: string, value: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const group = travel.groups.find((group) => group.id === action.payload.groupId);

				if (group) {
					group.title = action.payload.value;
				}
			}
		},
		moveGroups(state, action: PayloadAction<{ travelId: string, activeId: string, overId: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const activeIndex = travel.groups.findIndex((group) => group.id === action.payload.activeId);
				const overIndex = travel.groups.findIndex((group) => group.id === action.payload.overId);
				travel.groups = arrayMove(travel.groups, activeIndex, overIndex);
			}
		},
		addCard(state, action: PayloadAction<{ travelId: string, groupId: string, card: ICard }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const group = travel.groups.find((group) => group.id === action.payload.groupId);

				if (group) {
					group.cards.push(action.payload.card);
				}
			}
		},
		deleteCard(state, action: PayloadAction<{ cardId: string, groupId: string, travelId: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const group = travel.groups.find((group) => group.id === action.payload.groupId);

				if (group) {
					const cardIndex = group.cards.findIndex((card) => card.id === action.payload.groupId);
					group.cards.splice(cardIndex, 1);
				}
			}
		},
		moveCards(state, action: PayloadAction<{ travelId: string, groupId: string, activeId: string, overId: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) {
				const group = travel.groups.find((group) => group.id === action.payload.groupId);

				if (group) {
					const activeIndex = group.cards.findIndex((card) => card.id === action.payload.activeId);
					const overIndex = group.cards.findIndex((card) => card.id === action.payload.overId);
					group.cards = arrayMove(group.cards, activeIndex, overIndex);
				}
			}
		},
		addPlace(state, action: PayloadAction<{ travelId: string, place: string }>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

			if (travel) travel.places.push(action.payload.place);
		},
		clearPlaces(state, action: PayloadAction<string>) {
			const travel = state.authData?.travels.find((travel) => travel.id === action.payload);

			if (travel) travel.places = [];
		}
	},
	extraReducers: (builder) => {
		getRegisterUserReducerBuilder(builder);
		getLoginUserReducerBuilder(builder);
		getAcceptFriendRequestReducerBuilder(builder);
		getDeleteFrinedReducerBuilder(builder);
	}
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;