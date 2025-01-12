import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/selectors';
import { deleteFriend } from 'redux/actions/userActions';
import { Button } from 'components/UI/Button/Button';
import type { IFriend } from 'types/types';
import classnames from 'classnames';
import classes from './FriendItem.module.css';

interface FriendItemProps {
	friend: IFriend;
	className?: string;
}

export const FriendItem: FC<FriendItemProps> = memo((props) => {
	const { friend, className } = props;
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const onDelete = () => {
		if (window.confirm('Are you sure you want to delete friend?')) {
			if (user) {
				dispatch(deleteFriend({
					firstUserId: user.id,
					secondUserId: friend.id
				}));
			}
		}
	};

	return (
		<li className={classnames(classes.FriendItem, className)}>
			<div>
				<div>{friend.email}</div>
				<div>{friend.login}</div>
			</div>
			<Button 
				onClick={onDelete}
				className={classes.deleteBtn}
				theme='red'
				size='sm'
			>
				delete
			</Button>
		</li>
	);
});