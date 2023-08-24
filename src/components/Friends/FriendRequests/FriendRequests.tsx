import { FC } from 'react';
import { IFriend } from 'types/types';
import RequestItem from './RequestItem';
import classes from './friend-requests.module.css';


interface FriendRequestsProps {
	friendRequests: IFriend[]; 
}

const FriendRequests:FC<FriendRequestsProps> = ({friendRequests}) => {
	
	return (
		<ul className={classes.list}>
			{friendRequests.map(request => 
				<RequestItem
					key={request.id}
					request={request}
				/>
			)}
		</ul>
	)
}

export default FriendRequests;