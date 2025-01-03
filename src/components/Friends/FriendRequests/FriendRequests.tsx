import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import classnames from 'classnames';

import { RequestItem } from '../RequestItem/RequestItem';
import classes from './friend-requests.module.css';

interface FriendRequestsProps {
	friendRequests: IFriend[]; 
	className?: string;
}

export const FriendRequests:FC<FriendRequestsProps> = memo((props) => {
	const { friendRequests, className } = props;
	
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
