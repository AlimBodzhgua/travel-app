import {IUser, IUserResponse} from 'types/types';

export const getErrorMessage = (error: unknown):string => {
	if (error instanceof Error) return error.message;
	return String(error);
}

export const saveUserToLocalStorage = (user: IUser):void => {
	localStorage.setItem('user', JSON.stringify(user));
}

export const isUserLoggedIn = ():boolean => {
	return localStorage.hasOwnProperty('user');
}

export const modifyUserResponseObject = (data: IUserResponse):IUser => {
	return {...data.user, password: data.accessToken}
}