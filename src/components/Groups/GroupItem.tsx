import {FC} from 'react';
import { IGroup } from 'types/types';
import classes from './groups.module.css';

interface GroupItemProps {
	group?: IGroup;
}

const GroupItem: FC<GroupItemProps> = ({group}) => {

	const handleEditClick = () => {
		console.log('edit');
	}

	const handleDeleteClick = () => {
		console.log('delete');
	}

	return (
		<li className={classes.item}>
			<div className={classes.item__header}>
				<h2 className={classes.item__title}>{group?.title}</h2>
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
			</div>
			{group?.cards.length
				? 	<div>Cards</div>
				:   <div className={classes.item__text}>Nothing is planned<br/>
						Add something here or transher from backlog
					</div>
			}
		</li>
	)
}

export default GroupItem;