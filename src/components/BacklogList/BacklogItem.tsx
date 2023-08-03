import {FC, useState, useRef, useEffect} from 'react';
import {IBacklog} from 'types/types';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import {useDrag, useDrop} from 'react-dnd';
import { XYCoord } from 'react-dnd';
import classes from './backlog.module.css';

interface BacklogItemProps {
	backlog: IBacklog
}

const BacklogItem: FC<BacklogItemProps> = ({backlog}) => {
	const [value, setValue] = useState<string>('');
	const [editable, setEditable] = useState<boolean>(false);
	const { id } = useParams<{id?: string}>();
	const inputRef = useRef<HTMLInputElement>(null);
	const itemRef = useRef<HTMLLIElement>(null);
	const dispatch = useAppDispatch();

	const [{isDragging}, drag] = useDrag(() => ({
		type: 'backlog',
		item: backlog,
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	}))

	const [{isOver}, drop] = useDrop<
		IBacklog, 
		void,
		{isOver: boolean}
	>(() => ({
		accept: 'backlog',
		collect: (monitor) => ({
			isOver: monitor.isOver()
		}),
		hover: (item, monitor) => {
			if (!itemRef.current) {
				return;
			}
			const dragId = item.id;
			const hoverId = backlog.id;

			if (dragId === hoverId) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = itemRef.current?.getBoundingClientRect(); 
			//Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()

			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

			if (dragId < hoverId && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragId > hoverId && hoverClientY > hoverMiddleY) {
				return;
			}
		}
	}))

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

	drag(drop(itemRef))

	return (
		<li 
			className={classes.item}
			ref={itemRef}
			style={{
				transform: isDragging ? 'scale(1.1)' : 'scale(1)',
				opacity: isDragging ? '0' : '1',
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