import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { acceptFriendRequest } from 'redux/actions/userActions';
import { selectUser } from 'redux/selectors/selectors';
import { Button } from 'components/UI/Button/Button';
import type { IFriend } from 'types/types';

import classnames from 'classnames';
import classes from './Request.module.css';

interface RequestItemProps {
	request: IFriend; 
	className?: string;
}

export const RequestItem: FC<RequestItemProps> = memo((props) => {
	const { request, className } = props;
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const onAddFriend = () => {
		if (user) {
			const currentUser: IFriend = {
				id: user.id,
				login: user.login,
				email: user.email,
			};
			
			dispatch(acceptFriendRequest({
				requestUser: request,
				responseUser: currentUser,
			}));
		}
	};

	const onRejectRequest = () => {
		if (window.confirm('Are you sure you want to reject friend request?')) {
			dispatch(userActions.rejectFriendRequest(request.id));
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
					onClick={onAddFriend}
					className={classes.addBtn}
					theme='blue'
				>
					add
				</Button>
				<Button 
					onClick={onRejectRequest}
					className={classes.rejectBtn}
					theme='red'
				>
					reject
				</Button>
			</div>
		</li>
	);
});
