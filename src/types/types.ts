
export interface IUser {
	id: number;
	login: string;
	email: string;
	friends: IFriend[];
	friendRequests: IFriend[];
	password: string;
	travels: ITravel[];
}

export type IFriend = Pick<IUser, 'id' | 'login' | 'email'>;
export type IPublicUser = Omit<IUser, 'password'>;

export interface ITravel {
	id: string;
	name: string;
	dateStart: string;
	dateEnd: string;
	members: IFriend[];
	backlog: IBacklog[];
	places: string[];
	groups: IGroup[];
}

export interface IBacklog {
	id: string;
	name: string;
}

export interface IGroup {
	id: string;
	title: string;
	cards:	ICard[];
}

export interface ICard {
	id: string;
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