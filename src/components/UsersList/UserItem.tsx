import { FC, useState, useEffect } from 'react';
import { IPublicUser } from 'types/types';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useHover } from 'hooks/useHover';
import { selectUser } from 'redux/selectors/selectors';
import { sendFriendRequest, cancelFriendRequest } from 'redux/actions/allUsersActions';
import classes from './users-list.module.css';

interface UserItemProps {
	user: IPublicUser;
}

const UserItem: FC<UserItemProps> = ({user}) => {
	const currentUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const [hovering, hoverProps]  = useHover();
	const [requestSended, setRequestSended] = useState<boolean>(false);

	useEffect(() => {
		user.friendRequests.forEach(request => {
			if (request.id === currentUser?.id) {
				setRequestSended(true);
			}
		})
	}, [])

	const handleClick = ():void => {
		if (currentUser) {
			if (hovering && requestSended) {
				dispatch(cancelFriendRequest({toId: user.id, fromId: currentUser.id}));
			} else {
				const fromData = {
					id: Number(currentUser.id),
					login: currentUser.login,
					email: currentUser.email
				}
				dispatch(sendFriendRequest({id: user.id, data: fromData}));
			}
			setRequestSended(!requestSended);
		}
	}

	return (
		<li className={classes.user}>
			<div>
				<h2>{user.email}</h2>
				<div>{user.login}</div>
			</div>
			<button
				{...hoverProps}
				onClick={handleClick}
				className={classes.button}
			>
				{requestSended 
					? <>
						{hovering 
							? <>cancel request</>
							: <>request sended</>
						}
					  </>
					: <>add friend</>
				}
			</button>
		</li>
	)
}


export default UserItem;