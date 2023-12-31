import { FC, memo } from 'react';
import { IFriend } from 'types/types';
import { DragOverlay } from '@dnd-kit/core';
import MembersItem from './MembersItem';
import Item from '../AddMembersSection/Item';
import DroppableMembersArea from '../AddMembersSection/DroppableMembersArea';

import classes from './members-list.module.css';

interface MembersListProps {
	members: IFriend[];
	activeItem: IFriend | null
}

const MembersList: FC<MembersListProps> = memo(({members, activeItem}) => {
	return (
		<ul className={classes.list}>
			{members.map(member => 
				<MembersItem 
					key={member.id}
					member={member}
				/>
			)}
			{activeItem && 	
				<>
					<DragOverlay>
						{activeItem 
							? 	<Item friend={activeItem} />
							: 	null
						}
					</DragOverlay>
					<DroppableMembersArea />
				</>
			}
		</ul>
	);
});

export default MembersList;