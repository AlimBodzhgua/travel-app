import {FC} from 'react';
import {useDroppable} from '@dnd-kit/core';
import classes from './member-add.module.css';

const DroppableMembersArea: FC = () => {
	const {setNodeRef, isOver} = useDroppable({
		id: 'droppable-members'
	})

	return (
		<div 
		    ref={setNodeRef}
		    style={{color: isOver ? 'red' : 'blue'}}
		    className={classes.droppable}
		>drop area</div>
	)
}


export default DroppableMembersArea;