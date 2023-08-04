import {FC, useState} from 'react';
import { IBacklog } from 'types/types';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import {useParams} from 'react-router-dom';
import BacklogItem from './BacklogItem';
import BacklogCreateForm from 'components/CreateForms/BacklogCreateForm/BacklogCreateForm';
import {DndContext} from '@dnd-kit/core';
import {
	SortableContext, 
	verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
	restrictToVerticalAxis,
  	restrictToParentElement,
} from '@dnd-kit/modifiers';
import {useSensors, useSensor, PointerSensor} from '@dnd-kit/core';

import classes from './backlog.module.css';

interface BacklogListProps {
	backlogs: IBacklog[]
}

const BacklogList: FC<BacklogListProps> = ({backlogs}) => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const { id } = useParams<{id? : string}>();
	const dispatch = useAppDispatch();

	const handleClick = ():void => setShowCreateForm(true);

	const sensors = useSensors(
		useSensor(PointerSensor, {
	    	activationConstraint: {
	      		distance: 8,
	    	},
	  	})
	)

	const handleDragEnd = (e: { active: any; over: any; }):void => {
		const {active, over} = e;
		if (active.id === over.id) {
			return;
		}
		dispatch(userSlice.actions.moveBacklog({
			travelId: Number(id),
			activeId: active.id,
			overId: over.id,
		}))
	}


	return (
		<div className={classes.backlog}>
			<h2 className={classes.backlog__title}>Backlog</h2>	
			<DndContext
				sensors={sensors}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToParentElement]}
				onDragCancel={(e) => console.log(e)}
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
	)
}

export default BacklogList;