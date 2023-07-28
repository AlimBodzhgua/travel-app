import {FC, useState} from 'react';
import {useAppSelector} from 'hooks/redux';
import { useParams } from 'react-router-dom';
import GroupCreateForm from '../CreateForms/GroupCreateForm/GroupCreateForm';
import GroupItem from './GroupItem';
import classes from './groups.module.css'

const Groups: FC = () => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const { id } = useParams<{id? : string}>()
	const groups = useAppSelector(state => 
		state.userReducer.user?.travels.find(travel => travel.id === Number(id))?.groups
	);

	return (
		<div className={classes.groups}>
			<ul className={classes.list}>
				{groups && 
					groups.map(group => 
						<GroupItem group={group}/>
					)
				}
			</ul>
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