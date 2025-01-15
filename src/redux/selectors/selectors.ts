import { StateSchema } from 'redux/config/StateSchema';
import { createSelector } from '@reduxjs/toolkit';

export const selectUser = (state: StateSchema) => {
	return state.user.authData;
};

export const selectTravelById = (state: StateSchema, id: string) => {
	return state.user.authData?.travels.find(travel => travel.id === id);	
};

export const selectTravels = (state: StateSchema) => {
	return state.user.authData?.travels || [];
};

export const selectGroupsByTravelId = (state: StateSchema, id: string) => {
	return state.user.authData?.travels.find(travel => travel.id === id)?.groups || [];
};

export const selectBacklogsByTravelId = (state: StateSchema, travelId: string) => {
	return state.user.authData?.travels.find(travel => travel.id === travelId)?.backlog || [];
};

export const selectMembersByTravelId = (state: StateSchema, travelId: string) => {
	return state.user.authData?.travels.find(travel => travel.id === travelId)?.members || [];
};

export const selectCards = (state: StateSchema, travelId: string, groupId: string) => {
	return state.user.authData?.travels
		.find(travel => travel.id === travelId)?.groups
		.find(group => group.id === groupId)?.cards || [];
};

export const selectPlaces = (state: StateSchema, travelId: string) => {
	return state.user.authData?.travels
		.find((travel) => travel.id === travelId)?.places || [];
};

export const selectAllUsers = (state: StateSchema) => {
	return state.allUsers.users.filter(user => user.id !== state.user.authData?.id);
};

export const memozedSelectAllUsers = createSelector(
	[selectAllUsers], (allUsers) => {
	return allUsers;
});