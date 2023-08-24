import { FC } from 'react';
import { IFriend } from 'types/types';
import { useAppDispatch } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import classes from './friend-list.module.css';

interface ListItemProps {
	friend: IFriend;
}

const ListItem: FC<ListItemProps> = ({friend}) => {
	const dispatch = useAppDispatch();

	const handleDeleteClick = (id: number):void => {
		if (window.confirm('Are you sure you want to delete friend?')) {
			dispatch(userSlice.actions.deleteFriend(id));
		}
	}

	return (
		<li className={classes.item}>
			<div className={classes.item__info}>
				<div>{friend.email}</div>
				<div>{friend.login}</div>
			</div>
			<button 
				onClick={() => handleDeleteClick(friend.id)}
				className={classes.delete}
			>delete</button>
		</li>
	)
}

export default ListItem;