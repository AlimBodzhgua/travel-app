import {
	IUser, 
	IPublicUser,
	IUserResponse, 
	IUserLogin, 
	IFriend
} from 'types/types';
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
			'friends': user.friends,
			'friendRequests': user.friendRequests,
			'travels': user.travels
		};
		axios.patch(`http://localhost:8080/users/${user.id}`, body);
	}

	static async getAllUsers(): Promise<IPublicUser[]> {
		const response = await axios.get('http://localhost:8080/users')
		const result:IPublicUser[] = response.data.map((user:any) => {
			delete user.password
			return user;
		})
		return result;
	}

	static sendFriendRequest(toId: number, fromData: any): void {
		axios.get(`http://localhost:8080/users/${toId}`).then(response => {
			const allRequests = response.data.friendRequests;
			const body = {"friendRequests": [...allRequests, fromData]}
			axios.patch(`http://localhost:8080/users/${toId}`, body);
		})
	}

	static cancelFriendRequest(toId: number, fromId: number): void {
		axios.get(`http://localhost:8080/users/${toId}`).then(response => {
			const filteredRequests = response.data.friendRequests
				.filter((request: IFriend) => request.id !== fromId);
			const body = {"friendRequests": filteredRequests}
			axios.patch(`http://localhost:8080/users/${toId}`, body);	
		})
	}
}