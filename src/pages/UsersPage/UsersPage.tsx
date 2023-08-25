import { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { fetchAllUsers } from 'redux/actions/allUsersActions';
import { selectUser, selectAllUsers } from 'redux/selectors/selectors';
import { RotatingLines } from 'react-loader-spinner';
import { IPublicUser } from 'types/types';
import NavBar from 'components/Navbar/NavBar';
import UsersList from 'components/UsersList/UsersList';
import {useDebounce} from 'hooks/useDebounce';
import classes from './users.module.css';

const UsersPage: FC = () => {
	const user = useAppSelector(selectUser);
	const users = useAppSelector(state => selectAllUsers(state, Number(user?.id)));
	const {isLoading, errorMessage} = useAppSelector(state => state.allUsersReducer);
	const [searchedUsers, setSearchedUsers] = useState<IPublicUser[]>([]);
	const [value, setValue] = useState<string>('');
	const debouncedValue = useDebounce(value, 500);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
		setSearchedUsers(users);
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
		setValue(e.target.value);
	}

	useEffect(() => {
		const result = users.filter((u) => {
			if (u.login.toLowerCase().startsWith(debouncedValue.toLowerCase())) {
				return u;
			}
		})
		setSearchedUsers(result);
	}, [debouncedValue])

	return (
		<div className={classes.container}>
			<NavBar />
			{errorMessage 
				?	<h2>Error loading users, reload the page or try later</h2>
				:	<>	
						<div className={classes.header}>
							<h2 className={classes.title}>Travelers</h2>
							<input 
								type="text" 
								placeholder='search users'
								value={value}
								onChange={handleChange}
								className={classes.search}
							/>
						</div>
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
								:	<UsersList users={searchedUsers} /> 
							: <h2>No users here yet</h2>
						}
					</>
			}
		</div>
	)
}

export default UsersPage;