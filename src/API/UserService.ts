import {IUser, IUserResponse, IUserLogin} from 'types/types';
import axios from 'axios';


export default class UserService {
	static async register(user: IUser): Promise<IUserResponse> {
		const response = await axios.post('http://localhost:8080/users', user);
		return response.data;
	}

	static async login(user: IUserLogin): Promise<IUserResponse> {
		const response = await axios.post('http://localhost:8080/login', user);
		return response.data;
	}

	static updateUser(user: IUser): void {
		const body = {
			'login': user.login,
			'email': user.email,
			'travels': user.travels
		};
		axios.patch(`http://localhost:8080/users/${user.id}`, body);
	}
}