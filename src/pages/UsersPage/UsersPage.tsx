import {FC, useEffect, useState} from 'react';
import NavBar from 'components/Navbar/NavBar';
import UsersList from 'components/UsersList/UsersList';
import UserService from 'API/UserService';
import {IUser} from 'types/types';
import classes from './users.module.css';

const UsersPage: FC = () => {
	const [users, setUsers] = useState<IUser[] | []>([]);

	useEffect(() => {
		UserService.getAllUsers().then(data => setUsers(data));
	}, [])

	return (
		<div className={classes.container}>
			<NavBar />
			<h2 className={classes.title}>Travelers</h2>
			{users.length 
				? <UsersList users={users} />
				: <h2>No users here yet</h2>
			}
		</div>
	)
}

export default UsersPage;