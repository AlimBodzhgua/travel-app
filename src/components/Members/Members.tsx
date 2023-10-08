import { FC, useState, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { selectMembersByTravelId } from 'redux/selectors/selectors';
import { IFriend } from 'types/types';
import { DndContext, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { userActions } from 'redux/reducers/userSlice';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import AddMembersSection from './AddMembersSection/AddMembersSection';
import MembersList from './MembersList/MembersList';

import classes from './members.module.css';

const Members: FC = memo(() => {
	const { id } = useParams<{id?: string}>();
	const { t } = useTranslation();
	const [showAddSection, setShowAddSection] = useState<boolean>(false);
	const [activeItem, setActiveItem] = useState<IFriend | null>(null);
	const members = useAppSelector(state => selectMembersByTravelId(state, Number(id)));
	const dispatch = useAppDispatch();
	const sensors = useSensors(
		useSensor(PointerSensor, {
	    	activationConstraint: {
	      		distance: 8,
	    	},
	  	})
	);

	const handleClick = ():void => setShowAddSection(!showAddSection);

	const handleDragStart = (e: DragStartEvent) => {
		const item:IFriend = e.active.data.current?.friend;
		setActiveItem(item);
	};

	const handleDragEnd = (e: DragEndEvent):void => {
		if (e.over) {
			const item:IFriend = e.active.data.current?.friend;
			dispatch(userActions.addMember({
				id: Number(id),
				member: item
			}));
		}
		setActiveItem(null);
	};

	return (
		<div className={classes.members}>
			<div className={classes.members__header}>
				{members.length
					? 	<h3 className={classes.title}>
							{t('Members list')}
						</h3>
					: null
				}
				<button 
					onClick={handleClick}
					className={classes.add}
				>
					{showAddSection 
						? t('close')
						: t('add members')
					}
				</button>
			</div>
			<DndContext 
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				{showAddSection &&
					<AddMembersSection />
				}
				<MembersList 
					members={members} 
					activeItem={activeItem}
				/>
			</DndContext>
		</div>
	);
});

export default Members;