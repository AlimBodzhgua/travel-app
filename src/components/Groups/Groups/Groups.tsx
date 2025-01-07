import { FC, useState, memo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { DragEndEvent } from '@dnd-kit/core';
import { userActions } from 'redux/reducers/userSlice';
import { useParams } from 'react-router-dom';
import { selectGroupsByTravelId } from 'redux/selectors/selectors';
import { useTranslation } from 'react-i18next';
import { GroupCreateForm } from 'components/CreateForms/';
import { SortableList } from 'lib/components';

import { GroupItem } from '../GroupItem/GroupItem';
import classes from './groups.module.css';

export const Groups: FC = memo(() => {
	const { t } = useTranslation();
	const { id } = useParams<{id? : string}>();
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const groups = useAppSelector(state => selectGroupsByTravelId(state, Number(id)));

	const onToggleShowForm = useCallback(() => {
		setShowCreateForm(prev => !prev);
	}, []);

	const handleDragEnd = (e: DragEndEvent):void => {
		const { active, over } = e;

		if (active.id !== over!.id) {
			dispatch(userActions.moveGroups({
				travelId: Number(id),
				activeId: Number(active.id),
				overId: Number(over!.id),
			}));
		}
	};

	return (
		<div className={classes.groups}>
			
			<SortableList
				onDragEnd={handleDragEnd}
				items={groups}
			>
				<ul className={classes.list}>
					{groups.map((group) => (
						<GroupItem key={group.id} group={group} />
					))}
				</ul>
			</SortableList>

			{showCreateForm ? (
				<GroupCreateForm onCancel={onToggleShowForm} />
			) : (
				<button
					className={classes.addBtn}
					onClick={onToggleShowForm}
				>
					+ {t('Add group')}
				</button>
			)}
		</div>
	);
});

export default Groups;