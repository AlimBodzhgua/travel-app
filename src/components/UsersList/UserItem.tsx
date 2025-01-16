import { FC, useState, useEffect, memo } from 'react';
import { IPublicUser } from 'types/types';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useHover } from 'hooks/useHover';
import { selectUser } from 'redux/selectors/selectors';
import { sendFriendRequest, cancelFriendRequest } from 'redux/actions/allUsersActions';
import { Button } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import classes from './users-list.module.css';

interface UserItemProps {
	user: IPublicUser;
}

export const UserItem: FC<UserItemProps> = memo(({ user }) => {
	const { t } = useTranslation();
	const [hovering, hoverProps]  = useHover();
	const [requestSended, setRequestSended] = useState<boolean>(false);
	const currentUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		user.friendRequests.forEach(request => {
			if (request.id === currentUser?.id) {
				setRequestSended(true);
			}
		});
	}, []);

	const onCancel = () => {
		if (currentUser && hovering && requestSended) {
			dispatch(cancelFriendRequest({
				receivedUserId: user.id,
				canceledUserId: currentUser.id,
			}));
			setRequestSended(!requestSended);
		}
	};

	const onAdd = () => {
		if (currentUser) {
			const requestingUserData = {
				id: currentUser.id,
				login: currentUser.login,
				email: currentUser.email,
			};
			dispatch(sendFriendRequest({ receivingId: user.id, requestingUser: requestingUserData }));
			setRequestSended(!requestSended);
		}
	};

	return (
		<li className={classes.UserItem}>
			<div>
				<h3>{user.email}</h3>
				<div>{user.login}</div>
			</div>
			{requestSended ? (
				<Button
					{...hoverProps}
					onClick={onCancel}
					theme='blue'
					size='sm'
					square
				>
					{hovering ? t('cancel request') : t('request sended')}
				</Button>
			) : (
				<Button
					{...hoverProps}
					onClick={onAdd}
					theme='blue'
					size='sm'
					square
				>
					{t('add friend')}
				</Button>
			)}
		</li>
	);
});