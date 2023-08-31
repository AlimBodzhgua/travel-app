import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/selectors';
import NavBar from 'components/Navbar/NavBar';
import FriendList from 'components/Friends/FriendList/FriendList';
import FriendRequests from 'components/Friends/FriendRequests/FriendRequests';
import classes from './friends.module.css';

const FriendsPage: FC = () => {
	const user = useAppSelector(selectUser);

	return (
		<div className={classes.container}>
			<NavBar />
			<h2 className={classes.title}>Friend requests</h2>
			{user?.friendRequests.length 
				? 	<FriendRequests friendRequests={user.friendRequests}/>
				:   <div className={classes.empty}>You have no friend requests</div>
			}
			<h2 className={classes.title}>Friend list</h2>
			{user?.friends.length 
				?	<FriendList friends={user.friends}/>
				:   <div className={classes.empty}>You have no friends</div>
			}
		</div>
	);
};


export default FriendsPage;