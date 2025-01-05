import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import { ReactComponent as FriendsIcon } from 'assets/icons/friends.svg';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { FriendItem } from '../FriendItem/FriendItem';
import classes from './friend-list.module.css';

interface FriendsListProps {
	friends: IFriend[];
	className?: string;
}

export const FriendList: FC<FriendsListProps> = memo((props) => {
	const { friends, className} = props;
	const { t } = useTranslation();

	if (!friends.length) {
		return (
			<div className={classes.emptyMsg}>
				<FriendsIcon className={classes.icon}/>
				<h2>{t('You have no friends')}</h2>
			</div>
		);
	}

	return (
		<ul className={classnames(classes.list, className)}>
			{friends.map(friend => 
				<FriendItem 
					key={friend.id}
					friend={friend}
				/>
			)}
		</ul>
	);
});