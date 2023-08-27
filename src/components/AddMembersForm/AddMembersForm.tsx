import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/selectors';
import Item from './Item';
import classes from './member-add.module.css';


const AddMembersForm: FC = () => {
	const user = useAppSelector(selectUser);

	return (
		<div className={classes.form}>
			<ul className={classes.list}>
				{user?.friends.map(friend => 
					<Item 
						key={friend.id} 
						friend={friend}
					/>
				)}
			</ul>
		</div>
	)
}

export default AddMembersForm;