import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import { RequestItem } from './RequestItem/RequestItem';

import classnames from 'classnames';
import classes from './friend-requests.module.css';

interface FriendRequestsProps {
	friendRequests: IFriend[]; 
	className?: string;
}

const FriendRequests:FC<FriendRequestsProps> = memo(({friendRequests, className}) => {
	
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

export default FriendRequests;