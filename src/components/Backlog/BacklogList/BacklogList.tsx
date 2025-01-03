import { FC, useState, memo } from 'react';
import { useAppDispatch, useAppSelector} from 'hooks/redux';
import { selectBacklogsByTravelId} from 'redux/selectors/selectors';
import { userActions } from 'redux/reducers/userSlice';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BacklogCreateForm } from 'components/CreateForms';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext } from '@dnd-kit/core';
import classnames from 'classnames';

import { BacklogItem } from '../BacklogItem/BacklogItem';
import classes from './BacklogList.module.css';

interface BacklogListProps {
	className?: string;
}

export const BacklogList: FC<BacklogListProps> = memo(({ className }) => {
	const { t } = useTranslation();
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
	const handleClick = () => setShowCreateForm(true);

	const handleDragEnd = (e: { active: any; over: any; }) => {
		const {active, over} = e;
		if (active.id === over.id) {
			return;
		}
		dispatch(userActions.moveBacklogs({
			travelId: Number(id),
			activeId: active.id,
			overId: over.id,
		}));
	};


	return (
		<div className={classnames(classes.backlog, className)}>
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
						>
							+ {t('Add card')}
						</button>
					</div>
			}
		</div>
	);
});
