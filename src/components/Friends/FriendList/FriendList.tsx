import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import { FriendItem } from './FriendItem/FriendItem';
import classnames from 'classnames';
import classes from './friend-list.module.css';

interface FriendsListProps {
	friends: IFriend[];
	className?: string;
}

const FriendList: FC<FriendsListProps> = memo(({friends, className}) => {
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

export default FriendList;