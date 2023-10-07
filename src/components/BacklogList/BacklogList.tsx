import { FC, useState, memo } from 'react';
import { useAppDispatch, useAppSelector} from 'hooks/redux';
import { selectBacklogsByTravelId} from 'redux/selectors/selectors';
import { userSlice } from 'redux/reducers/userSlice';
import { useParams } from 'react-router-dom';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext } from '@dnd-kit/core';
import { BacklogItem } from './BacklogItem/BacklogItem';

import BacklogCreateForm from 'components/CreateForms/BacklogCreateForm/BacklogCreateForm';

import classes from './backlog.module.css';

const BacklogList: FC = memo(() => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const { id } = useParams<{id? : string}>();
	const backlogs = useAppSelector(state => selectBacklogsByTravelId(state, Number(id)));
	const dispatch = useAppDispatch();

	const sensors = useSensors(
		useSensor(PointerSensor, {
	    	activationConstraint: {
	      		distance: 8,
	    	},
	  	})
	);
	const handleClick = ():void => setShowCreateForm(true);

	const handleDragEnd = (e: { active: any; over: any; }):void => {
		const {active, over} = e;
		if (active.id === over.id) {
			return;
		}
		dispatch(userSlice.actions.moveBacklogs({
			travelId: Number(id),
			activeId: active.id,
			overId: over.id,
		}));
	};


	return (
		<div className={classes.backlog}>
			<h2 className={classes.backlog__title}>Backlog</h2>	
			<DndContext
				sensors={sensors}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToParentElement]}
			>
				<SortableContext 
					items={backlogs}
			        strategy={verticalListSortingStrategy}
				>
					<ul className={classes.backlog__list}>
						{backlogs.map(backlog => 
							<BacklogItem
								key={backlog.id}
								backlog={backlog}
							/>
						)}
					</ul>
				</SortableContext>
			</DndContext>
			{showCreateForm 
				?
					<BacklogCreateForm 
						setShowCreateForm={setShowCreateForm}
					/>
				:
					<div className={classes.backlog__footer}>
						<button 
							onClick={handleClick}
							className={classes.add}
						>+ Add card</button>
					</div>
			}
		</div>
	);
});

export default BacklogList;