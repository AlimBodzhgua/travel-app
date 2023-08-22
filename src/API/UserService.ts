import {IUser, IUserResponse, IUserLogin, IFriendRequest} from 'types/types';
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

	static async getAllUsers(): Promise<IUser[]> {
		const response = await axios.get('http://localhost:8080/users')
		return response.data;
	}

	static sendFriendRequest(toId: any, fromData: any): void {
		axios.get(`http://localhost:8080/users/${toId}`).then(response => {
			const allRequests = response.data.friendRequests;
			const body = {"friendRequests": [...allRequests, fromData]}
			axios.patch(`http://localhost:8080/users/${toId}`, body);
		})
	}

	static cancelFriendRequest(fromId: any, toId: any): void {
		axios.get(`http://localhost:8080/users/${toId}`).then(response => {
			const filteredRequests = response.data.friendRequests
				.filter((request: IFriendRequest) => request.id !== fromId);
			const body = {"friendRequests": filteredRequests}
			axios.patch(`http://localhost:8080/users/${toId}`, body);	
		})
	}
}