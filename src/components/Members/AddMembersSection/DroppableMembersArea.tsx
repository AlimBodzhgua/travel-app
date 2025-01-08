import { FC, memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import classes from './member-add.module.css';

export const DroppableMembersArea: FC = memo(() => {
	const { setNodeRef, isOver } = useDroppable({ id: 'droppable-members' });

	return (
		<div
			ref={setNodeRef}
			style={{
				backgroundColor: isOver ? 'lightblue' : 'white',
				color: isOver ? 'white' : 'black',
			}}
			className={classes.droppable}
		>
			drop here
		</div>
	);
});