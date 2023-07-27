import {FC, useState} from 'react';
import GroupCreateForm from '../CreateForms/GroupCreateForm/GroupCreateForm';
import classes from './groups.module.css'

const Groups: FC = () => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

	return (
		<div className={classes.groups}>
			{showCreateForm 
				?	<GroupCreateForm setShowCreateForm={setShowCreateForm}/>
				: 	<button 
						className={classes.add}
						onClick={() => setShowCreateForm(true)}
					>+ Add group</button>
			}
		</div>
	)
}

export default Groups;