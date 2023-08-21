import {FC} from 'react';
import {IUser} from 'types/types';
import {useAppSelector} from 'hooks/redux';
import {selectUser} from 'redux/selectors/selectors';
import UserService from 'API/UserService';
import classes from './users-list.module.css';

interface UserItemProps {
	user: IUser;
}

const UserItem: FC<UserItemProps> = ({user}) => {
	const currentUser = useAppSelector(selectUser);

	const handleClick = () => {
		if (currentUser) {
			const fromData = {
				id: currentUser.id,
				login: currentUser.login,
				email: currentUser.email
			}
			console.log('Request to', user.id);
			console.log('Request from', fromData)
			UserService.sendFriendRequest(user.id, fromData);
		}
	}

	return (
		<li className={classes.user}>
			<div>
				<h2>{user.email}</h2>
				<div>{user.login}</div>
			</div>
			<button 
				onClick={handleClick}
				className={classes.button}
			>add friend</button>
		</li>
	)
}


export default UserItem;