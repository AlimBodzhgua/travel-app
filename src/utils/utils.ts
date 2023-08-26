import {IUser, ITravel, IUserResponse, IGroup, ICard} from 'types/types';
import dayjs, {Dayjs} from 'dayjs';

export const getErrorMessage = (error: unknown):string => {
	if (error instanceof Error) return error.message;
	return String(error);
};

export const createNewUser = 
	(data: {login: string, email: string, password: string}
): IUser => {
	return {
		...data, 
		id: Date.now(), 
		friends: [], 
		friendRequests: [], 
		travels: []}
	;
}

export const saveUserToLocalStorage = (user: IUser):void => {
	localStorage.setItem('user', JSON.stringify(user));
};

export const isUserLoggedIn = ():boolean => {
	return localStorage.hasOwnProperty('user');
};

export const modifyUserResponseObject = (data: IUserResponse):IUser => {
	return {...data.user, password: data.accessToken};
};

export const createNewTravel = (
	id: number, 
	value: string, 
	startDate: Dayjs, 
	endDate: Dayjs
): ITravel => {
	return { 
		id: id,
		name: value,
		dateStart: startDate.format('YYYY.MM.DD'),
		dateEnd: endDate.format('YYYY.MM.DD'),
		members: [],
		backlog: [],
		groups: [],
	};
};

export const stringToDayjsObject = (date: string):Dayjs => {
	const jsDateObj = dayjs(date).toDate();
	return dayjs(jsDateObj);
};

export const createNewGroup = (title: string):IGroup => {
	return {id: Date.now(), title, cards: []};
};

export const createNewCard = (title: string, description: string): ICard => {
	return {id: Date.now(), title, description};
};