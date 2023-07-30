import {FC, useState} from 'react';
import {useAppSelector} from 'hooks/redux';
import { useParams } from 'react-router-dom';
import GroupCreateForm from '../CreateForms/GroupCreateForm/GroupCreateForm';
import GroupItem from './GroupItem';
import classes from './groups.module.css'
import { selectTravelGroupsById } from 'redux/selectors/selectors';

const Groups: FC = () => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const { id } = useParams<{id? : string}>()
	const groups = useAppSelector(state => selectTravelGroupsById(state, Number(id)));


	return (
		<div className={classes.groups}>
			<ul className={classes.list}>
				{groups && 
					groups.map(group => 
						<GroupItem 
							key={group.id}
							group={group}
						/>
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