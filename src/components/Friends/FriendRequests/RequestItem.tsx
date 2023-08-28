import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import { acceptFriendRequest } from 'redux/actions/userActions';
import { selectUser } from 'redux/selectors/selectors';
import { IFriend } from 'types/types';
import classes from './friend-requests.module.css';

interface RequestItemProps {
	request: IFriend; 
}

const RequestItem: FC<RequestItemProps> = ({request}) => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const handleRejectClick = (id:number):void => {
		if (window.confirm('Are you sure you want to reject friend request?')) {
			dispatch(userSlice.actions.rejectFriendRequest(id))
		}
	}

	const handleAddClick = (friend: IFriend) => {
		if (user) {
			const currentUser: IFriend = {
				id: user.id,
				login: user.login,
				email: user.email
			}
			dispatch(acceptFriendRequest({
				requestUser: friend,
				responseUser: currentUser 
			}))
		}
	}

	return (
		<li className={classes.item}>
			<div className={classes.item__info}>
				<div>{request.email}</div>
				<div>{request.login}</div>
			</div>
			<div className={classes.item__actions}>
				<button 
					onClick={() => handleAddClick(request)}
					className={classes.add}
				>add</button>
				<button 
					onClick={() => handleRejectClick(request.id)}
					className={classes.reject}
				>reject</button>
			</div>
		</li>
	)
}


export default RequestItem;