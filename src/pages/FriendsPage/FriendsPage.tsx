import {FC, useState, useEffect} from 'react';
import {IFriend} from 'types/types';
import {useAppSelector} from 'hooks/redux';
import {selectUser} from 'redux/selectors/selectors';
import NavBar from 'components/Navbar/NavBar';
import FriendsList from 'components/FriendsList/FriendsList';
import UserService from 'API/UserService';
import classes from './friends.module.css';

const FriendsPage: FC = () => {
	const user = useAppSelector(selectUser);
	const [friendRequests, setFriendRequests] = useState<IFriend[]>([]);
	const [friends, setFriends] = useState<IFriend[]>([]);

	useEffect(() => {
		UserService.getFriendRequests(user?.id)
			.then(data => setFriendRequests(data));

		UserService.getFriends(user?.id)
			.then(data => setFriends(data));
	}, [])

	return (
		<div className={classes.container}>
			<NavBar />
			<h2>Friend requests</h2>
			{friendRequests.length 
				? 
					<ul>
						{friendRequests.map(request => 
							<li>
								{request.login}
								<button>reject</button>
							</li>
						)}
					</ul>
				:   <div>You have no friend requests</div>
			}
			<h2>Friends list</h2>
			{friends.length 
				? 
					<ul>
						{friends.map(friend => 
							<li>
								{friend.login}
								<button>delete</button>
							</li>
						)}
					</ul>
				:   <div>You have no friends</div>
			}
		</div>
	)
}


export default FriendsPage;