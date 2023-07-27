import {FC} from 'react';
import {IBacklog} from 'types/types';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import classes from './backlog.module.css'

interface BacklogItemProps {
	backlog: IBacklog
}

const BacklogItem: FC<BacklogItemProps> = ({backlog}) => {
	const { id } = useParams<{id?: string}>();
	const dispatch = useAppDispatch();

	const handleEditClick = () => {
		console.log('edit', backlog.id);
	}

	const handleDeleteClick = () => {
		dispatch(userSlice.actions.deleteBacklog({
			travelId: Number(id), 
			backlogId: backlog.id,
		}))
		console.log('delete', backlog.id);
	}

	return (
		<li className={classes.item}>
			<div>{backlog.name}</div>
			<div className={classes.item__actions}>
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