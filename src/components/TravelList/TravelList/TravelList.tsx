import { FC, memo } from 'react';
import { ITravel } from 'types/types';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { SortableList } from 'lib/components';

import { TravelItem } from '../TravelItem/TravelItem';
import classes from './travel.module.css';

interface TravelListProps {
	travels: ITravel[];
}

export const TravelList: FC<TravelListProps> = memo(({travels}) => {
	const dispatch = useAppDispatch();

	const handleDragEnd = (e: { active: any; over: any; }):void => {
		const {active, over} = e;

		if (active.id !== over.id) {
			dispatch(userActions.moveTravels({
				activeId: active.id, 
				overId: over.id
			}));		
		}
	};

	return (
		<SortableList
			onDragEnd={handleDragEnd}
			items={travels}
		>
				<ul className={classes.list}>
					{travels.map(travel => 
						<TravelItem 
							key={travel.id}
							travel={travel}
						/>
					)}
				</ul>
		</SortableList>
	);
});