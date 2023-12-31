import { FC, useState, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor, DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useParams } from 'react-router-dom';
import { selectGroupsByTravelId } from 'redux/selectors/selectors';
import { GroupItem } from './GroupItem/GroupItem';
import { useTranslation } from 'react-i18next';

import GroupCreateForm from '../CreateForms/GroupCreateForm/GroupCreateForm';
import classes from './groups.module.css';

const Groups: FC = memo(() => {
	const { t } = useTranslation();
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { id } = useParams<{id? : string}>();
	const groups = useAppSelector(state => selectGroupsByTravelId(state, Number(id)));
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
		dispatch(userActions.moveGroups({
			travelId: Number(id),
			activeId: active.id,
			overId: over.id,
		}));
	};

	return (
		<div className={classes.groups}>
			<DndContext
				onDragEnd={handleDragEnd}
				sensors={sensors}
				modifiers={[restrictToParentElement]}
			>
				<SortableContext 
					items={groups}
					strategy={verticalListSortingStrategy}
				>
					<ul className={classes.list}>
							{groups.map(group => 
								<GroupItem
									key={group.id}
									group={group}
								/>
							)}
					</ul>
				</SortableContext>
			</DndContext>
			{showCreateForm 
				?	<GroupCreateForm setShowCreateForm={setShowCreateForm}/>
				: 	<button 
						className={classes.add}
						onClick={() => setShowCreateForm(true)}
					>
						+ {t('Add group')}
					</button>
			}
		</div>
	);
});

export default Groups;