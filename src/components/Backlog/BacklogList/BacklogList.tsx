import { FC, useState, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector} from 'hooks/redux';
import { selectBacklogsByTravelId} from 'redux/selectors/selectors';
import { userActions } from 'redux/reducers/userSlice';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BacklogCreateForm } from 'components/CreateForms';
import { SortableList } from 'lib/components';
import { ReactComponent as EmptyBox } from 'assets/icons/empty-box.svg';
import { DragEndEvent } from '@dnd-kit/core';
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
	const backlogs = useAppSelector(state => selectBacklogsByTravelId(state, id!));
	const dispatch = useAppDispatch();

	const onToggleShowFormForm = useCallback(() => {
		setShowCreateForm(prev => !prev);
	}, []);

	const onDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over?.id) {
			dispatch(userActions.moveBacklogs({
				travelId: id!,
				activeId: String(active.id),
				overId: String(over!.id),
			}));
		}
	};


	return (
		<div className={classnames(classes.backlog, className)}>
			<h2 className={classes.title}>Backlog</h2>

			{backlogs.length ? (
				<SortableList onDragEnd={onDragEnd} items={backlogs}>
					<ul className={classes.list}>
						{backlogs.map((backlog) => (
							<BacklogItem key={backlog.id} backlog={backlog} />
						))}
					</ul>
				</SortableList>
			) : (
				!showCreateForm && (
					<div className={classes.emptyMsg}>
						<EmptyBox className={classes.boxIcon} />
						<h4>No planned tasks</h4>
					</div>
				)
			)}

			{showCreateForm ? (
				<BacklogCreateForm onClose={onToggleShowFormForm} />
			) : (
				<div className={classes.footer}>
					<button onClick={onToggleShowFormForm} className={classes.addBtn}>
						+ {t('Add card')}
					</button>
				</div>
			)}
		</div>
	);
});
