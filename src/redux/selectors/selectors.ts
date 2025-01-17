import { StateSchema } from './../config/StateSchema';

export const selectUser = (state: StateSchema) => {
	return state.user.authData;
};

export const selectUserId = (state: StateSchema) => state.user.authData?.id;

export const selectUserInfo = (state: StateSchema) => ({
	id: state.user.authData!.id,
	login: state.user.authData!.login,
	email: state.user.authData!.email,
})

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