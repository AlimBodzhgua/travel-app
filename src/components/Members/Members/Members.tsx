import { FC, useState, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { selectMembersByTravelId, selectTravelById } from 'redux/selectors/selectors';
import { IFriend } from 'types/types';
import { DndContext, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/UI/Button/Button';
import { addMember } from 'redux/actions/userActions';

import { AddMembersSection } from '../AddMembersSection/AddMembersSection';
import { MembersList } from '../MembersList/MembersList';
import classes from './members.module.css';

export const Members: FC = memo(() => {
	const { id } = useParams<{id?: string}>();
	const { t } = useTranslation();
	const [showAddSection, setShowAddSection] = useState<boolean>(false);
	const [activeItem, setActiveItem] = useState<IFriend | null>(null);
	const members = useAppSelector(state => selectMembersByTravelId(state, id!));
	const travel = useAppSelector(state => selectTravelById(state, id!));
	const dispatch = useAppDispatch();
	const sensors = useSensors(
		useSensor(PointerSensor, {
	    	activationConstraint: {
	      		distance: 8,
	    	},
	  	})
	);

	const onToggleShowAddSection = () => {
		setShowAddSection(prev => !prev);
	};

	const onDragStart = (e: DragStartEvent) => {
		const item: IFriend = e.active.data.current?.friend;
		setActiveItem(item);
	};

	const onDragEnd = (e: DragEndEvent):void => {
		if (e.over && travel) {
			const item: IFriend = e.active.data.current?.friend;

			dispatch(addMember({ travel: travel, member: item }));
		}
		setActiveItem(null);
	};

	return (
		<div>
			<div className={classes.header}>
				{!!members.length && (
					<h3 className={classes.title}>
						{t('Members list')}
					</h3>
				)}
				<Button onClick={onToggleShowAddSection} className={classes.addBtn}>
					{showAddSection ? t('close') : t('add members')}
				</Button>
			</div>
			<DndContext 
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				sensors={sensors}
			>
				{showAddSection && <AddMembersSection />}
				<MembersList 
					members={members} 
					activeItem={activeItem}
				/>
			</DndContext>
		</div>
	);
});
