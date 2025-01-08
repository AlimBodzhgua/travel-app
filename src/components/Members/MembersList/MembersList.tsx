import { FC, memo } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import type { IFriend } from 'types/types';

import { Item } from '../AddMembersSection/Item';
import { DroppableMembersArea } from '../AddMembersSection/DroppableMembersArea';
import { MembersItem } from './MembersItem';
import classes from './members-list.module.css';

interface MembersListProps {
	members: IFriend[];
	activeItem: IFriend | null;
}

export const MembersList: FC<MembersListProps> = memo((props) => {
	const { members, activeItem } = props;

	return (
		<ul className={classes.list}>
			{members.map((member) => (
				<MembersItem key={member.id} member={member} />
			))}
			{activeItem && (
				<>
					<DragOverlay>
						{!!activeItem && <Item friend={activeItem} />}
					</DragOverlay>
					<DroppableMembersArea />
				</>
			)}
		</ul>
	);
});