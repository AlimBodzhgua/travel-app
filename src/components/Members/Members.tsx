import { FC, useState, useEffect } from 'react';
import { useAppSelector } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { selectMembersByTravelId } from 'redux/selectors/selectors';
import { IFriend } from 'types/types';
import { DndContext, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import AddMembersForm from 'components/AddMembersForm/AddMembersForm';
import MembersList from './MembersList/MembersList';
import DroppableMembersArea from 'components/AddMembersForm/DroppableMembersArea';
import Item from 'components/AddMembersForm/Item';

import classes from './members.module.css';

const Members: FC = () => {
	const { id } = useParams<{id?: string}>();
	const [showAddForm, setShowAddForm] = useState<boolean>(false);
	const [activeItem, setActiveItem] = useState<IFriend | null>(null)
	const members = useAppSelector(state => selectMembersByTravelId(state, Number(id)));

	const handleClick = ():void => setShowAddForm(true);
	const handleDragEnd = ():void => setActiveItem(null);

	const handleDragStart = (e: DragStartEvent) => {
		const item:IFriend = e.active.data.current?.friend;
		setActiveItem(item);
	}


	return (
		<div className={classes.members}>
			<div className={classes.members__header}>
				{members?.length
					? <h3 className={classes.title}>Members list</h3>
					: null
				}
				<button 
					onClick={handleClick}
					className={classes.add}
				>add members</button>
			</div>
			<DndContext 
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				{showAddForm &&
					<AddMembersForm />
				}
				{members?.length
					? 	<MembersList members={members} activeItem={activeItem}/>
					: 	activeItem && 
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
			</DndContext>
		</div>
	)
}

export default Members;