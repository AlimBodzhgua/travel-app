import {FC, useState, useEffect} from 'react';
import {IUser} from 'types/types';
import {useAppSelector} from 'hooks/redux';
import {useHover} from 'hooks/useHover';
import {selectUser} from 'redux/selectors/selectors';
import UserService from 'API/UserService';
import classes from './users-list.module.css';

interface UserItemProps {
	user: IUser;
}

const UserItem: FC<UserItemProps> = ({user}) => {
	const currentUser = useAppSelector(selectUser);
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
				console.log('cancel friend request');
			} else {
				console.log('send friend request');
				/*const fromData = {
					id: currentUser.id,
					login: currentUser.login,
					email: currentUser.email
				}
				UserService.sendFriendRequest(user.id, fromData);*/
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