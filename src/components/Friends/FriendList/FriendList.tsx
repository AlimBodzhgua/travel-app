import { FC } from 'react';
import { IFriend } from 'types/types';
import ListItem from './ListItem';
import classes from './friend-list.module.css';

interface FriendsListProps {
	friends: IFriend[]
}

const FriendList: FC<FriendsListProps> = ({friends}) => {
	return (
		<ul className={classes.list}>
			{friends.map(friend => 
				<ListItem 
					key={friend.id}
					friend={friend}
				/>
			)}
		</ul>
	)
}

export default FriendList;