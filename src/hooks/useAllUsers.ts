import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { memozedSelectAllUsers, selectUser } from 'redux/selectors/selectors';
import { fetchAllUsers } from 'redux/actions/allUsersActions';
import { removeFriendsFromAllUsers } from 'utils/utils';
import { IPublicUser } from 'types/types';



export const useAllUsers = (): [IPublicUser[], boolean, string | undefined] => {
	const user = useAppSelector(selectUser);
	const users = useAppSelector(memozedSelectAllUsers);
	const {isLoading, errorMessage} = useAppSelector(state => state.allUsersReducer);
	const [filteredUsers, setFilteredUsers] = useState<IPublicUser[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);


	useEffect(() => {
		if (users.length && user) {
			setFilteredUsers(removeFriendsFromAllUsers(user.friends, users));
		}
	}, [users]);

	return [filteredUsers, isLoading, errorMessage];
};