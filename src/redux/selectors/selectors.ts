import {RootState} from 'redux/store';

export const selectUser = (state: RootState) => {
	return state.userReducer.user;
}

export const selectTravelById = (state: RootState, id: number) => {
	return state.userReducer.user?.travels.find(travel => travel.id === Number(id))	
}

export const selectTravels = (state: RootState) => {
	return state.userReducer.user?.travels;
}

export const selectTravelGroupsById = (state: RootState, id: number) => {
	return 	state.userReducer.user?.travels.find(travel => travel.id === Number(id))?.groups
}