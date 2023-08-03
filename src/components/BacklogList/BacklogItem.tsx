import {FC, useState, useRef, useEffect} from 'react';
import {IBacklog} from 'types/types';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import {useDrag} from 'react-dnd';
import classes from './backlog.module.css';

interface BacklogItemProps {
	backlog: IBacklog
}

const BacklogItem: FC<BacklogItemProps> = ({backlog}) => {
	const [value, setValue] = useState<string>('');
	const [editable, setEditable] = useState<boolean>(false);
	const { id } = useParams<{id?: string}>();
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null)

	const [{isDragging}, drag] = useDrag(() => ({
		type: 'backlog',
		item: backlog,
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	}))

	const handleEditClick = () => {
		setEditable(!editable);
	}

	useEffect(() => {
		if (editable === true) {
			inputRef.current?.focus();
			setValue(backlog.name);
		}
	}, [editable])

	const handleDeleteClick = () => {
		dispatch(userSlice.actions.deleteBacklog({
			travelId: Number(id), 
			backlogId: backlog.id,
		}))
	}

	const handleSaveClick = () => {
		dispatch(userSlice.actions.editBacklog({
			travelId: Number(id),
			backlogId: backlog.id,
			value: value,
		}))
		setEditable(false);
	}

	return (
		<li 
			className={classes.item}
			ref={drag}
			style={{
				transform: isDragging ? 'scale(1.1)' : 'scale(1)',
				cursor: isDragging ? 'grabbing' : 'grab'
			}}
		>
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