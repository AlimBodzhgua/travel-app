import { FC } from 'react';
import {IFriend} from 'types/types';
import MembersItem from './MembersItem';
import classes from './members-list.module.css';

interface MembersListProps {
	members: IFriend[];
}

const MembersList: FC<MembersListProps> = ({members}) => {
	return (
		<ul className={classes.list}>
			{members.map(member => 
				<MembersItem 
					key={member.id}
					member={member}
				/>
			)}
		</ul>
	)
}

export default MembersList;