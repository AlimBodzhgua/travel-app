import {Dayjs} from 'dayjs';

export interface IUser {
	id?: number;
	login: string;
	email: string;
	password: string;
	travels: ITravel[];
}

export interface ITravel {
	id: number;
	name: string;
	dateStart: string;
	dateEnd: string;
	backlog: IBacklog[]
	groups: IGroup[];
}

export interface IBacklog {
	id: number;
	name: string;
}

export interface IGroup {
	id: number;
	title: string;
	cards:	ICard[];
}

export interface ICard {
	id: number;
	title: string;
	description: string;
}

export interface IUserResponse {
	accessToken: string;
	user: IUser;
}

export interface IUserLogin {
	email: string;
	password: string;
}