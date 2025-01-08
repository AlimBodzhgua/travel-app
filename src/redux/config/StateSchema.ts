import { AllUsersSchema } from '../slices/allUsersSlice';
import { UserSchema } from '../slices/userSlice';

export interface StateSchema {
	user: UserSchema,
	allUsers: AllUsersSchema,
}