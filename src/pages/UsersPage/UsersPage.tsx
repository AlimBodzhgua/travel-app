import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useDebounce } from 'hooks/useDebounce';
import { IPublicUser } from 'types/types';
import { useAllUsers } from 'hooks/useAllUsers';
import { useTranslation } from 'react-i18next';
import { UsersList } from 'components/UsersList/UsersList';
import classes from './users.module.css';
import { ReactComponent as SearchIcon} from 'assets/icons/search.svg';
import { Input } from 'components/UI/Input/Input';
import { Hotkey } from 'components/UI/Hotkey/Hotkey';

const UsersPage: FC = () => {
	const [users, isLoading, errorMessage] = useAllUsers();
	const [searchedUsers, setSearchedUsers] = useState<IPublicUser[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const { t } = useTranslation(); 
	const debouncedValue = useDebounce(searchQuery, 500);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onHotkeyPress = useCallback((e: KeyboardEvent) => {
		if (e.altKey === true && e.key === 'Enter') {
			if (document.activeElement === inputRef.current) {
				inputRef.current?.blur();
			} else {
				inputRef.current?.focus();
			}
		} else if (e.key === 'Escape') {
			inputRef.current?.blur();
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onHotkeyPress);

		return () => window.removeEventListener('keydown', onHotkeyPress);
	}, [onHotkeyPress]);

	useEffect(() => {
		const result = users.filter((user) => {
			if (user.login.toLowerCase().includes(debouncedValue.toLowerCase())) {
				return user;
			}
		});
		setSearchedUsers(result);
	}, [debouncedValue, users]);

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
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
						<Input
							addonBefore={<SearchIcon className={classes.searchIcon} />}
							addonAfter={
								<div className={classes.hotkeys}>
									<Hotkey>alt</Hotkey>+<Hotkey>enter</Hotkey>
								</div>
							}
							placeholder='Search users'
							className={classes.search}
							onChange={onSearchChange}
							ref={inputRef}
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