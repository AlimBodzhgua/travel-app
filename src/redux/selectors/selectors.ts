import {RootState} from 'redux/store';

export const selectUser = (state: RootState) => {
	return state.userReducer.user;
};

export const selectTravelById = (state: RootState, id: number) => {
	return state.userReducer.user?.travels.find(travel => travel.id === Number(id));	
};

export const selectTravels = (state: RootState) => {
	return state.userReducer.user?.travels;
};

export const selectTravelGroupsById = (state: RootState, id: number) => {
	return state.userReducer.user?.travels.find(travel => travel.id === Number(id))?.groups;
};

export const selectBacklogByTravelId = (state: RootState, travelId: number) => {
	return state.userReducer.user?.travels.find(travel => travel.id === travelId)?.backlog;
};

export const selectCards = (state: RootState, travelId: number, groupId: number) => {
	return state.userReducer.user?.travels
		.find(travel => travel.id === travelId)?.groups
		.find(group => group.id === groupId)?.cards;
};

export const selectAllUsers = (state: RootState) => {
	return state.allUsersReducer.users.filter(user => user.id !== state.userReducer.user?.id);
}