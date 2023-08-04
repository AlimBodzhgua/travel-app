import {FC, useState, useRef, useEffect} from 'react';
import {IBacklog} from 'types/types';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import classes from './backlog.module.css';

interface BacklogItemProps {
	backlog: IBacklog
}

const BacklogItem: FC<BacklogItemProps> = ({backlog}) => {
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
	}, [editable])

	const handleEditClick = ():void => setEditable(!editable);

	const handleDeleteClick = ():void => {
		dispatch(userSlice.actions.deleteBacklog({
			travelId: Number(id), 
			backlogId: backlog.id,
		}))
	}

	const handleSaveClick = ():void => {
		dispatch(userSlice.actions.editBacklog({
			travelId: Number(id),
			backlogId: backlog.id,
			value: value,
		}))
		setEditable(false);
	}


	return (
		<li className={classes.item}>
			{editable 
				?
					<input 
						type="text" 
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
					>&#x2714;</button>
				}
				<button 
					onClick={handleEditClick}
					className={classes.edit}
				>edit</button>
				<button 
					onClick={handleDeleteClick}
					className={classes.delete}
				>&#10005;</button>
			</div>
		</li>
	)
}

export default BacklogItem;