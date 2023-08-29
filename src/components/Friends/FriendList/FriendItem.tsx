import { FC } from 'react';
import { IFriend } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/selectors';
import { deleteFriend } from 'redux/actions/userActions';
import classes from './friend-list.module.css';

interface FriendItemProps {
	friend: IFriend;
}

const FriendItem: FC<FriendItemProps> = ({friend}) => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const handleClick = ():void => {
		if (window.confirm('Are you sure you want to delete friend?')) {
			if (user) {
				dispatch(deleteFriend({
					firstUserId: user.id,
					secondUserId: friend.id
				}))
			}
		}
	}

	return (
		<li className={classes.item}>
			<div className={classes.item__info}>
				<div>{friend.email}</div>
				<div>{friend.login}</div>
			</div>
			<button 
				onClick={handleClick}
				className={classes.delete}
			>delete</button>
		</li>
	)
}

export default FriendItem;