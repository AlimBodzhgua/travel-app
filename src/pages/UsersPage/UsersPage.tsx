import { FC, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useDebounce } from 'hooks/useDebounce';
import { IPublicUser } from 'types/types';
import { useAllUsers } from 'hooks/useAllUsers';
import { useTranslation } from 'react-i18next';
import { UsersList } from 'components/UsersList/UsersList';
import classes from './users.module.css';

const UsersPage: FC = () => {
	const [users, isLoading, errorMessage] = useAllUsers();
	const [searchedUsers, setSearchedUsers] = useState<IPublicUser[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const { t } = useTranslation(); 
	const debouncedValue = useDebounce(searchQuery, 500);

	useEffect(() => {
		const result = users.filter((user) => {
			if (user.login.toLowerCase().includes(debouncedValue.toLowerCase())) {
				return user;
			}
		});
		setSearchedUsers(result);
	}, [debouncedValue, users]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			{errorMessage ? (
				<h2>Error loading users, reload the page or try later</h2>
			) : (
				<>
					<div className={classes.header}>
						<h2>{t('Other users')}</h2>
						<input
							type='text'
							placeholder={t('search users')}
							value={searchQuery}
							onChange={handleChange}
							className={classes.search}
						/>
					</div>
					{users.length ? (
						isLoading ? (
							<div className={classes.loader}>
								<RotatingLines
									strokeColor='grey'
									strokeWidth='5'
									animationDuration='0.75'
									width='55'
								/>
							</div>
						) : (
							<UsersList users={searchedUsers} />
						)
					) : (
						<h2>{t('No users here yet')}</h2>
					)}
				</>
			)}
		</>
	);
};

export default UsersPage;