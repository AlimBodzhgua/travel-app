import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { selectAllUsers, selectUser } from 'redux/selectors/selectors';
import { fetchAllUsers } from 'redux/actions/allUsersActions';
import { removeFriendsFromAllUsers } from 'utils/utils';
import type { IPublicUser } from 'types/types';

export const useAllUsers = (): [IPublicUser[], boolean, string | undefined] => {
	const user = useAppSelector(selectUser);
	const users = useAppSelector(selectAllUsers);
	const {isLoading, errorMessage} = useAppSelector(state => state.allUsers);
	const [filteredUsers, setFilteredUsers] = useState<IPublicUser[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	useEffect(() => {
		if (users.length && user) {
			setFilteredUsers(removeFriendsFromAllUsers(user.friends, users));
		}
	}, [users, user]);

	return [filteredUsers, isLoading, errorMessage];
};