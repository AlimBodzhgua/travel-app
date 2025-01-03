import { FC, useState, useRef, useEffect, memo } from 'react';
import { IBacklog } from 'types/types';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { SortableItem } from 'components/SortableItem/SortableItem';
import classes from './BacklogItem.module.css';
import classNames from 'classnames';

interface BacklogItemProps {
	backlog: IBacklog;
	className?: string;
}

export const BacklogItem: FC<BacklogItemProps> = memo((props) => {
	const { backlog, className } = props;
	const [value, setValue] = useState<string>('');
	const [editable, setEditable] = useState<boolean>(false);
	const { id } = useParams<{id?: string}>();
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if (editable === true) {
			inputRef.current?.focus();
			setValue(backlog.name);
		}
	}, [editable]);

	const handleEditClick = ():void => setEditable(!editable);

	const handleDeleteClick = ():void => {
		dispatch(userActions.deleteBacklog({
			travelId: Number(id), 
			backlogId: backlog.id,
		}));
	};

	const handleSaveClick = ():void => {
		dispatch(userActions.editBacklog({
			travelId: Number(id),
			backlogId: backlog.id,
			value: value,
		}));
		setEditable(false);
	};

	return (
		<SortableItem id={backlog.id}>
			<li className={classNames(classes.BacklogItem, className)}>
				{editable 
					?
						<input 
							type='text' 
							ref={inputRef}
							placeholder={backlog.name}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className={classes.item__input}
						/>
					:   <div className={classes.item__name}>{backlog.name}</div>
				}
				
				<div className={classes.item__actions}>
					{editable && 
						<button 
							onClick={handleSaveClick}
							className={classes.delete}
						>
							&#x2714;
						</button>
					}
					<button 
						onClick={handleEditClick}
						className={classes.edit}
					>
						edit
					</button>
					<button 
						onClick={handleDeleteClick}
						className={classes.delete}
					>
						&#10005;
					</button>
				</div>
			</li>
		</SortableItem>
	);
});