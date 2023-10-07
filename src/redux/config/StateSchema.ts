import { AllUsersSchema } from '../reducers/allUsersSlice';
import { UserSchema } from '../reducers/userSlice';

export interface StateSchema {
	user: UserSchema,
	allUsers: AllUsersSchema,
}