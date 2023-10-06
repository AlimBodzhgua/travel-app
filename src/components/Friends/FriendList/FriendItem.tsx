import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/selectors';
import { deleteFriend } from 'redux/actions/userActions';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import classes from './friend-list.module.css';

interface FriendItemProps {
	friend: IFriend;
}

const FriendItem: FC<FriendItemProps> = memo(({friend}) => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const handleClick = ():void => {
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
		<li className={classes.item}>
			<div className={classes.item__info}>
				<div>{friend.email}</div>
				<div>{friend.login}</div>
			</div>
			<Button 
				onClick={handleClick}
				className={classes.delete}
				theme={ButtonTheme.RED}
			>
				delete
			</Button>
		</li>
	);
});

export default FriendItem;