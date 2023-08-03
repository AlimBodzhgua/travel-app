import {FC, useState} from 'react';
import { IBacklog } from 'types/types';
import BacklogItem from './BacklogItem';
import BacklogCreateForm from 'components/CreateForms/BacklogCreateForm/BacklogCreateForm';
import classes from './backlog.module.css';

interface BacklogListProps {
	backlogs: IBacklog[]
}

const BacklogList: FC<BacklogListProps> = ({backlogs}) => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

	const handleClick = () => {
		setShowCreateForm(true);
	}

	return (
		<div className={classes.backlog}>
			<h2 className={classes.backlog__title}>Backlog</h2>	
			<ul className={classes.backlog__list}>
					{backlogs.map(backlog => 
						<BacklogItem 
							key={backlog.id}
							backlog={backlog}
						/>
					)}
			</ul>
			{showCreateForm 
				?
					<BacklogCreateForm 
						setShowCreateForm={setShowCreateForm}
					/>
				:
					<div className={classes.backlog__footer}>
						<button 
							onClick={handleClick}
							className={classes.add}
						>+ Add card</button>
					</div>
			}
		</div>
	)
}

export default BacklogList;