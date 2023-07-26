import {FC} from 'react';
import {IBacklog} from 'types/types';
import classes from './backlog.module.css'

interface BacklogItemProps {
	backlog: IBacklog
}

const BacklogItem: FC<BacklogItemProps> = ({backlog}) => {
	return (
		<li className={classes.item}>
			<div>{backlog.name}</div>
			<div className={classes.item__actions}>
				<button className={classes.edit}>edit</button>
				<button className={classes.delete}>&#10005;</button>
			</div>
		</li>
	)
}

export default BacklogItem;