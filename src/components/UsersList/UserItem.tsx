import { FC, useState, useEffect, memo } from 'react';
import { IPublicUser } from 'types/types';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useHover } from 'hooks/useHover';
import { selectUser } from 'redux/selectors/selectors';
import { sendFriendRequest, cancelFriendRequest } from 'redux/actions/allUsersActions';
import { Button, ButtonSize, ButtonTheme } from 'components/UI/Button/Button';
import classes from './users-list.module.css';

interface UserItemProps {
	user: IPublicUser;
}

const UserItem: FC<UserItemProps> = memo(({user}) => {
	const currentUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const [hovering, hoverProps]  = useHover();
	const [requestSended, setRequestSended] = useState<boolean>(false);

	useEffect(() => {
		user.friendRequests.forEach(request => {
			if (request.id === currentUser?.id) {
				setRequestSended(true);
			}
		});
	}, []);

	const handleCancelClick = ():void => {
		if (currentUser && hovering && requestSended) {
			dispatch(cancelFriendRequest({
				toId: user.id,
				fromId: currentUser.id
			}));
			setRequestSended(!requestSended);
		}
	};

	const handleAddClick = ():void => {
		if (currentUser) {
			const fromData = {
				id: currentUser.id,
				login: currentUser.login,
				email: currentUser.email
			};
			dispatch(sendFriendRequest({id: user.id, data: fromData}));
			setRequestSended(!requestSended);
		}
	};

	return (
		<li className={classes.item}>
			<div>
				<h3>{user.email}</h3>
				<div>{user.login}</div>
			</div>
			{requestSended 
				?	<Button 
						{...hoverProps}
						onClick={handleCancelClick}
						theme={ButtonTheme.BLUE}
						size={ButtonSize.SMALL}
						square={true}
					>
						{hovering ? <>cancel request</> : <>request sended</>}
					</Button>
				:   <Button 
						{...hoverProps}
						onClick={handleAddClick}
						theme={ButtonTheme.BLUE}
						size={ButtonSize.SMALL}
						square={true}
					>
						add friend
					</Button>
			}
		</li>
	);
});


export default UserItem;