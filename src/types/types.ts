
export interface IUser {
	id?: number;
	login: string;
	email: string;
	password: string;
	travels: ITravel[];
}

export interface ITravel {
	name: string;
	dateStart: number;
	dateEnd: number;
	backlog: string[]
	groups: IGroup[];
}


export interface IGroup {
	title: string;
	cards:	ICard[];
}

export interface ICard {
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