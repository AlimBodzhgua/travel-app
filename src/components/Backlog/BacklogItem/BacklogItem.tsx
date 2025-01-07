import { FC, useState, memo } from 'react';
import { IBacklog } from 'types/types';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { SortableItem } from 'lib/components';
import classNames from 'classnames';
import classes from './BacklogItem.module.css';

interface BacklogItemProps {
	backlog: IBacklog;
	className?: string;
}

export const BacklogItem: FC<BacklogItemProps> = memo((props) => {
	const { backlog, className } = props;
	const { id } = useParams<{id?: string}>();
	const [value, setValue] = useState<string>(backlog.name);
	const [editable, setEditable] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	
	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onToggleEdit = () => {
		setEditable(prev => !prev);
	};

	const onDelete = () => {
		dispatch(userActions.deleteBacklog({
			travelId: id!, 
			backlogId: backlog.id,
		}));
	};

	const onSave = () => {
		dispatch(userActions.editBacklog({
			travelId: id!,
			backlogId: backlog.id,
			value: value,
		}));
		setEditable(false);
	};

	return (
		<SortableItem id={backlog.id}>
			<li className={classNames(classes.BacklogItem, className)}>
				{editable ? (
					<input
						autoFocus
						type='text'
						placeholder='Enter backlog name...'
						value={value}
						onChange={onChangeValue}
						className={classes.input}
					/>
				) : (
					<div className={classes.name}>{backlog.name}</div>
				)}

				<div className={classes.actions}>
					{editable && (
						<button onClick={onSave} className={classes.delete}>
							&#x2714;
						</button>
					)}
					<button onClick={onToggleEdit} className={classes.edit}>
						edit
					</button>
					<button onClick={onDelete} className={classes.delete}>
						&#10005;
					</button>
				</div>
			</li>
		</SortableItem>
	);
});