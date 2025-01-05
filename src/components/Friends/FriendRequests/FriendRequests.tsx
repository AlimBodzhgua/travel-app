import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import { ReactComponent as FriendsIcon } from 'assets/icons/friends.svg';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { RequestItem } from '../RequestItem/RequestItem';
import classes from './friend-requests.module.css';

interface FriendRequestsProps {
	friendRequests: IFriend[]; 
	className?: string;
}

export const FriendRequests:FC<FriendRequestsProps> = memo((props) => {
	const { friendRequests, className } = props;
	const { t } = useTranslation();

	if (!friendRequests.length) {
		return (
			<div className={classes.emptyMsg}>
				<FriendsIcon className={classes.icon}/>
				<h2>{t('You have no friend requests')}</h2>
			</div>
		);
	}
	
	return (
		<ul className={classnames(classes.list, className)}>
			{friendRequests.map(request => 
				<RequestItem
					key={request.id}
					request={request}
				/>
			)}
		</ul>
	);
});
