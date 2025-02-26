import {
	IUser, 
	IPublicUser,
	IUserResponse, 
	IUserLogin, 
	IFriend,
	ITravel
} from 'types/types';
import $axios from 'api/axios';

export default class UserService {
	static async register(user: IUser): Promise<IUserResponse> {
		const response = await $axios.post('/users', user);
		return response.data;
	}

	static async login(user: IUserLogin): Promise<IUserResponse> {
		const response = await $axios.post('/login', user);
		return response.data;
	}

	static async updateUser(user: IUser): Promise<void> {
		const body = {
			login: user.login,
			email: user.email,
			friends: user.friends,
			friendRequests: user.friendRequests,
			travels: user.travels,
		};
		await $axios.patch(`/users/${user.id}`, body);
	}

	static async getAllUsers(): Promise<IPublicUser[]> {
		const response = await $axios.get('/users');
		const result: IPublicUser[] = response.data.map((user: any) => {
			delete user.password;
			return user;
		});
		return result;
	}

	static async sendFriendRequest(toId: number, fromData: any): Promise<void> {
		const response = await $axios.get(`/users/${toId}`);
		const allRequests = response.data.friendRequests;

		const body = { friendRequests: [...allRequests, fromData] };
		await $axios.patch(`users/${toId}`, body);
	}

	static async cancelFriendRequest(toId: number, fromId: number): Promise<void> {
		const response = await $axios.get(`/users/${toId}`);
		const filteredRequests = response.data.friendRequests.filter(
			(request: IFriend) => request.id !== fromId,
		);
		const body = { friendRequests: filteredRequests };

		await $axios.patch(`/users/${toId}`, body);
	}

	static async acceptFriendRequest(requestUser: IFriend, responseUser: IFriend): Promise<void> {
		const response = await $axios.get(`/users/${requestUser.id}`);
		const body = { friends: [...response.data.friends, responseUser] };

		await $axios.patch(`/users/${requestUser.id}`, body);
	}

	static async deleteFriend(firstUserId: number, secondUserId: number): Promise<void> {
		const response = await $axios.get(`/users/${secondUserId}`);
		const body = {
			friends: response.data.friends.filter(
				(friend: IFriend) => friend.id !== firstUserId,
			),
		};

		await $axios.patch(`/users/${secondUserId}`, body);
	}

	static async getUserTravels(userId: number): Promise<ITravel[]> {
		const response = await $axios.get<IUser[]>(`/users?id=${userId}`);
		return response.data[0].travels;
	}

	static async addTravelToMember(memberId: number, travel: ITravel) : Promise<void> {
		const memberTravels = await UserService.getUserTravels(memberId);

		await $axios.patch(`/users/${memberId}`, {
			travels: [...memberTravels, travel],
		});
	}

	static async removeTravelByMember(memberId: number, travelId: string) : Promise<void> {
		const memberTravels = await UserService.getUserTravels(memberId);
		const filteredTravels = memberTravels.filter((travel) => travel.id !== travelId);

		await $axios.patch(`/users/${memberId}`, {
			travels: filteredTravels,
		});
	}
}