import { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { selectMembersByTravelId } from 'redux/selectors/selectors';
import { IFriend } from 'types/types';
import { DndContext, DragStartEvent, DragOverlay, DragEndEvent } from '@dnd-kit/core';
import { userSlice } from 'redux/reducers/userSlice';
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
	const dispatch = useAppDispatch();

	const handleClick = ():void => setShowAddForm(true);

	const handleDragStart = (e: DragStartEvent) => {
		const item:IFriend = e.active.data.current?.friend;
		setActiveItem(item);
	}

	const handleDragEnd = (e: DragEndEvent):void => {
		if (e.over) {
			const item:IFriend = e.active.data.current?.friend;
			dispatch(userSlice.actions.addMember({
				id: Number(id),
				member: item
			}));
		}
		setActiveItem(null);
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
					? 	<MembersList 
							members={members} 
							activeItem={activeItem}
						/>
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