import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { acceptFriendRequest } from 'redux/actions/userActions';
import { selectUser } from 'redux/selectors/selectors';
import { IFriend } from 'types/types';
import { Button } from 'components/UI/Button/Button';

import classnames from 'classnames';
import classes from './Request.module.css';

interface RequestItemProps {
	request: IFriend; 
	className?: string;
}

export const RequestItem: FC<RequestItemProps> = memo(({request, className}) => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const handleRejectClick = (id:number):void => {
		if (window.confirm('Are you sure you want to reject friend request?')) {
			dispatch(userActions.rejectFriendRequest(id));
		}
	};

	const handleAddClick = (friend: IFriend) => {
		if (user) {
			const currentUser: IFriend = {
				id: user.id,
				login: user.login,
				email: user.email,
			};
			
			dispatch(acceptFriendRequest({
				requestUser: friend,
				responseUser: currentUser,
			}));
		}
	};

	return (
		<li className={classnames(classes.RequestItem, className)}>
			<div className={classes.info}>
				<div>{request.email}</div>
				<div>{request.login}</div>
			</div>
			<div className={classes.actions}>
				<Button 
					onClick={() => handleAddClick(request)}
					className={classes.add}
					theme='blue'
				>
					add
				</Button>
				<Button 
					onClick={() => handleRejectClick(request.id)}
					className={classes.reject}
					theme='red'
				>
					reject
				</Button>
			</div>
		</li>
	);
});
