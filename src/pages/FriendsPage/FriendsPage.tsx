import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/selectors';
import { useTranslation } from 'react-i18next';
import { FriendList } from 'components/Friends';
import { FriendRequests } from 'components/Friends';
import classes from './friends.module.css';

const FriendsPage: FC = () => {
	const user = useAppSelector(selectUser);
	const { t } = useTranslation();

	return (
		<>
			<h2 className={classes.title}>{t('Friend requests')}</h2>

			{user?.friendRequests.length ? (
				<FriendRequests friendRequests={user.friendRequests} />
			) : (
				<div className={classes.empty}>{t('You have no friend requests')}</div>
			)}

			<h2 className={classes.title}>{t('Friend list')}</h2>
			{user?.friends.length ? (
				<FriendList friends={user.friends} />
			) : (
				<div className={classes.empty}>{t('You have no friends')}</div>
			)}
		</>
	);
};


export default FriendsPage;