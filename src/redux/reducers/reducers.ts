import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { UserSchema } from 'redux/slices/userSlice';
import { acceptFriendRequest, addMember, deleteFriend, deleteMember, loginUser, registerUser } from 'redux/actions/userActions';

export const getRegisterUserReducerBuilder = (builder: ActionReducerMapBuilder<UserSchema>) => {
	builder.addCase(registerUser.pending, (state, _) => {
		state.isLoading = true;
	});
	builder.addCase(registerUser.fulfilled, (state, action) => {
		state.isLoading = false;
		state.isAuth = true;
		state.authData = action.payload;
		state.errorMessage = '';
	});
	builder.addCase(registerUser.rejected, (state, action) => {
		state.isLoading = false;
		state.errorMessage = action.payload;
	});
};

export const getLoginUserReducerBuilder = (builder: ActionReducerMapBuilder<UserSchema>) => {
	builder.addCase(loginUser.pending, (state, _) => {
		state.isLoading = true;
	});
	builder.addCase(loginUser.fulfilled, (state, action) => {
		state.isLoading = false;
		state.isAuth = true;
		state.authData = action.payload;
	});
	builder.addCase(loginUser.rejected, (state, action) => {
		state.isLoading = false;
		state.errorMessage = action.payload;
	});
};

export const getAcceptFriendRequestReducerBuilder = (builder: ActionReducerMapBuilder<UserSchema>) => {
	builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
		if (state.authData) {
			state.authData.friendRequests = state.authData.friendRequests
				.filter(request => request.id !== action.payload.id);
			state.authData.friends.push(action.payload);
		}	
	});
	builder.addCase(acceptFriendRequest.rejected, (state, action) => {
		state.errorMessage = action.payload;
		state.isLoading = false;
	});
};

export const getDeleteFrinedReducerBuilder = (builder: ActionReducerMapBuilder<UserSchema>) => {
	builder.addCase(deleteFriend.fulfilled, (state, action) => {
		if (state.authData) {
			state.authData.friends = state.authData.friends.filter(
				(friend) => friend.id !== action.payload,
			);
		}
	});
	builder.addCase(deleteFriend.rejected, (state, action) => {
		state.errorMessage = action.payload;
		state.isLoading = false;
	});
};


export const getAddMemberReducerBuilder = (builder: ActionReducerMapBuilder<UserSchema>) => {
	builder.addCase(addMember.pending, (state, action) => {
		state.isLoading = true;
	});
	builder.addCase(addMember.fulfilled, (state, action) => {
		state.isLoading = false;
		state.errorMessage = undefined;
		
		const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travel.id);
		
		if (travel) {
			travel.members.push(action.payload.member);
		}
	});
	builder.addCase(addMember.rejected, (state, action) => {
		state.errorMessage = action.payload;
	});
};

export const getDeleteMemberReducerBuilder = (builder: ActionReducerMapBuilder<UserSchema>) => {
	builder.addCase(deleteMember.pending, (state, action) => {
		state.isLoading = true;
	});
	builder.addCase(deleteMember.fulfilled, (state, action) => {
		state.isLoading = false;
		state.errorMessage = undefined;

		const travel = state.authData?.travels.find((travel) => travel.id === action.payload.travelId);

		if (travel) {
			const memberIndex = travel.members.findIndex((member) => member.id === action.payload.memberId);
			travel.members.splice(memberIndex, 1);
		}
	});
	builder.addCase(deleteMember.rejected, (state, action) => {
		state.errorMessage = action.payload;
	});
};