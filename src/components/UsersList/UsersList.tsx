import { FC, memo } from 'react';
import { IPublicUser } from 'types/types';
import UserItem from './UserItem';
import classes from './users-list.module.css';

interface UsersListProps {
	users: IPublicUser[]
}

const UsersList: FC<UsersListProps> = memo(({users}) => {
	return (
		<ul>
			{users.map(user => 
				<UserItem 
					key={user.id}
					user={user}
				/>
			)}
		</ul>
	);
});


export default UsersList;