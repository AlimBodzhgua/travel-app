import { FC, memo } from 'react';
import { ITravel } from 'types/types';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { SortableContext } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext } from '@dnd-kit/core';

import { TravelItem } from '../TravelItem/TravelItem';
import classes from './travel.module.css';

interface TravelListProps {
	travels: ITravel[];
}

export const TravelList: FC<TravelListProps> = memo(({travels}) => {
	const dispatch = useAppDispatch();
	const sensors = useSensors(
		useSensor(PointerSensor, {
	    	activationConstraint: {
	      		distance: 8,
	    	},
	  	})
	);

	const handleDragEnd = (e: { active: any; over: any; }):void => {
		const {active, over} = e;
		if (active.id === over.id) {
			return;
		}
		dispatch(userActions.moveTravels({
			activeId: active.id, 
			overId: over.id
		}));		
	};

	return (
		<DndContext
			onDragEnd={handleDragEnd}
			sensors={sensors}
			modifiers={[restrictToParentElement]}
		>
			<SortableContext items={travels}>
				<ul className={classes.list}>
					{travels.map(travel => 
						<TravelItem 
							key={travel.id}
							id={travel.id}
							name={travel.name}
							dateStart={travel.dateStart}
							dateEnd={travel.dateEnd}
						/>
					)}
				</ul>
			</SortableContext>
		</DndContext>
	);
});