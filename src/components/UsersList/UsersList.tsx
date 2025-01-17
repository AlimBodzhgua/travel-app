import { FC, memo } from 'react';
import type { IPublicUser } from 'types/types';
import { useTranslation } from 'react-i18next';
import { UserItem } from './UserItem';
import { ReactComponent as UsersGroup } from 'assets/icons/users_group.svg';
import classes from './users-list.module.css';

interface UsersListProps {
	users: IPublicUser[];
}

export const UsersList: FC<UsersListProps> = memo(({ users }) => {
	const { t } = useTranslation();

	if (!users.length) {
		return (
			<div className={classes.emptyMsg}>
				<UsersGroup className={classes.usersIcon}/>
				<h2>{t('No users in app community yet')}</h2>
			</div>
		)
	}

	return (
		<ul>
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</ul>
	);
});

