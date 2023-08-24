import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { fetchAllUsers } from 'redux/actions/allUsersActions';
import { selectUser, selectAllUsers } from 'redux/selectors/selectors';
import { RotatingLines } from 'react-loader-spinner';
import NavBar from 'components/Navbar/NavBar';
import UsersList from 'components/UsersList/UsersList';
import classes from './users.module.css';

const UsersPage: FC = () => {
	const user = useAppSelector(selectUser);
	const users = useAppSelector(state => selectAllUsers(state, Number(user?.id)));
	const {isLoading, errorMessage} = useAppSelector(state => state.allUsersReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [])

	return (
		<div className={classes.container}>
			<NavBar />
			{errorMessage 
				?	<h2>Error loading users, reload the page or try later</h2>
				:	<>	
						<h2 className={classes.title}>Travelers</h2>
						{users.length 
							? isLoading 
								? 	<div className={classes.loader}>
										<RotatingLines
						                    strokeColor='grey'
						                    strokeWidth='5'
						                    animationDuration='0.75'
						                    width='55'
						                />
						            </div>
								:	<UsersList users={users} /> 
							: <h2>No users here yet</h2>
						}
					</>
			}
		</div>
	)
}

export default UsersPage;