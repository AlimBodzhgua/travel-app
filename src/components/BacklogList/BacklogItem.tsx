import {FC} from 'react';
import classes from './backlog.module.css'

const BacklogItem: FC = () => {
	return (
		<li className={classes.item}>
			<div>Drive to hotel</div>
			<div className={classes.item__actions}>
				<button className={classes.edit}>edit</button>
				<button className={classes.delete}>&#10005;</button>
			</div>
		</li>
	)
}

export default BacklogItem;