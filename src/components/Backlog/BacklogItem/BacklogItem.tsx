import { FC, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { SortableItem } from 'lib/components';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import classNames from 'classnames';
import type { IBacklog } from 'types/types';

import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

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
					<Input
						value={value}
						onChange={onChangeValue}
						className={classes.input}
						autoFocus
						type='text'
						size='sm'
						placeholder='Enter backlog name...'
						addonAfter={
							<Button onClick={onSave} theme='clear' className={classes.successBtn}>
								<SuccessIcon className={classes.successIcon}/>
							</Button>
						}
					/>
				) : (
					<div className={classes.name}>{backlog.name}</div>
				)}

				<div className={classes.actions}>
					<Button onClick={onToggleEdit} theme='clear' className={classes.editBtn}>
						<EditIcon className={classes.editIcon}/>
					</Button>
					<Button onClick={onDelete} theme='clear' className={classes.closeBtn}>
						<CloseIcon className={classes.closeIcon}/>
					</Button>
				</div>
			</li>
		</SortableItem>
	);
});