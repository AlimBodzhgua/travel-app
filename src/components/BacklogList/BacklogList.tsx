import {FC, useState} from 'react';
import BacklogItem from './BacklogItem';
import BacklogCreateForm from 'components/CreateForms/BacklogCreateForm/BacklogCreateForm';
import classes from './backlog.module.css';

interface BacklogListProps {
	backlogs: string[]
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
				<BacklogItem/>
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