import { FC, memo } from 'react';
import type { IPublicUser } from 'types/types';
import { UserItem } from './UserItem';

interface UsersListProps {
	users: IPublicUser[];
}

export const UsersList: FC<UsersListProps> = memo(({ users }) => {
	return (
		<ul>
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</ul>
	);
});

