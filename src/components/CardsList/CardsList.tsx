import { FC, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { selectCards } from 'redux/selectors/selectors';
import { userSlice } from 'redux/reducers/userSlice';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor, DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { CardItem } from './CardItem/CardItem';
import classes from './cards.module.css';

interface CardsListProps {
	travelId: number;
	groupId: number;
}

const CardsList:FC<CardsListProps> = memo(({travelId, groupId}) => {
	const cards = useAppSelector(state => selectCards(state, travelId, groupId));
	const dispatch = useAppDispatch();

	const handleDragEnd = (e: {active: any, over: any}):void => {
		const {active, over} = e;
		if (active.id === over.id) {
			return;
		}
		dispatch(userSlice.actions.moveCards({
			travelId: travelId,
			groupId: groupId,
			activeId: active.id,
			overId: over.id
		}));
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
	    	activationConstraint: {
	      		distance: 8,
	    	},
	  	})
	);

	return (
		<>
		{cards && 
			<DndContext
				onDragEnd={handleDragEnd}
				sensors={sensors}
				modifiers={[restrictToParentElement]}
			>
				<SortableContext
					items={cards}
					strategy={verticalListSortingStrategy}
				>
					<ul className={classes.list}>
							{cards.map(card => 
								<CardItem 
									key={card.id}
									card={card}
									groupId={groupId}
									travelId={travelId}
								/>
							)}
					</ul>
				</SortableContext>
			</DndContext>
		}
		</>
	);
});

export default CardsList;