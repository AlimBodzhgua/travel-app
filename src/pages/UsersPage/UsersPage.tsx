import {FC, useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { fetchAllUsers } from 'redux/actions/allUsersActions';
import { selectUser, selectAllUsers } from 'redux/selectors/selectors';
import NavBar from 'components/Navbar/NavBar';
import UsersList from 'components/UsersList/UsersList';
import classes from './users.module.css';

const UsersPage: FC = () => {
	const user = useAppSelector(selectUser);
	const users = useAppSelector(state => selectAllUsers(state, Number(user?.id)));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
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