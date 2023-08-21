import {FC} from 'react';
import {IUser} from 'types/types';
import UserItem from './UserItem';
import classes from './users-list.module.css';

interface UsersListProps {
	users: IUser[]
}

const UsersList: FC<UsersListProps> = ({users}) => {
	return (
		<ul>
			{users.map(user => 
				<UserItem 
					key={user.id}
					user={user}
				/>
			)}
		</ul>
	)
}


export default UsersList;