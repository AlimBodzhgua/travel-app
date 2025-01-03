import { FC, useState, memo } from 'react';
import { useAppDispatch, useAppSelector} from 'hooks/redux';
import { selectBacklogsByTravelId} from 'redux/selectors/selectors';
import { userActions } from 'redux/reducers/userSlice';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BacklogCreateForm } from 'components/CreateForms';
import { SortableList } from 'lib/components';
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

			<SortableList
				onDragEnd={handleDragEnd}
				items={backlogs}
			>
				<ul className={classes.backlog__list}>
					{backlogs.map((backlog) => (
						<BacklogItem key={backlog.id} backlog={backlog} />
					))}
				</ul>
			</SortableList>
			
			{showCreateForm ? (
				<BacklogCreateForm setShowCreateForm={setShowCreateForm} />
			) : (
				<div className={classes.backlog__footer}>
					<button
						onClick={handleClick}
						className={classes.add}
					>
						+ {t('Add card')}
					</button>
				</div>
			)}
		</div>
	);
});
