import {IUser, IUserResponse, IUserLogin} from 'types/types';
import axios, {AxiosResponse} from 'axios';


export default class UserService {
	static async register(user: IUser): Promise<IUserResponse> {
		const response = await axios.post('http://localhost:8080/users', user);
		return response.data;
	}

	static async login(user: IUserLogin): Promise<IUserResponse> {
		const response = await axios.post('http://localhost:8080/login', user)
		return response.data;
	}
}