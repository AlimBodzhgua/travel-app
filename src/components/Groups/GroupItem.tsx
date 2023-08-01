import { FC, useState, useEffect } from 'react';
import { IGroup } from 'types/types';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import CardCreateForm from 'components/CreateForms/CardCreateForm/CardCreateForm';
import Modal from 'components/Modal/Modal';
import classes from './groups.module.css';
	
interface GroupItemProps {
	group: IGroup;
}

const GroupItem: FC<GroupItemProps> = ({group}) => {
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();
	const { id } = useParams<{id? : string}>()

	useEffect(() => {
		setValue(group.title);			
	}, [])

	const handleEditClick = ():void => setEditable(!editable);
	const handleDeleteClick = ():void => setShowModal(!showModal);

	const handleSaveClick = ():void => {
		dispatch(userSlice.actions.editGroup({
			travelId: Number(id),
			groupId: group.id,
			value
		}))
		setEditable(false);
	}

	const deleteGroup = ():void => {
		dispatch(userSlice.actions.deleteGroup({
			travelId: Number(id),
			groupId: group.id
		}))
	}

	return (
		<li className={classes.item}>
			<div className={classes.item__header}>
				{editable 
					? <input 
						autoFocus
						type="text" 
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder={group?.title} 
						className={classes.item__input}
					  />
					: <h2 className={classes.item__title}>{group?.title}</h2>
				}
				<div className={classes.item__actions}>
					{editable && 
						<button 
							onClick={handleSaveClick}
							className={classes.save}
						>&#x2714;</button>
					}
					<button 
						onClick={handleEditClick}
						className={classes.edit}
					>edit</button>
					<button 
						onClick={handleDeleteClick}
						className={classes.close}
					>&#10005;</button>
					{showModal && 
						<Modal 
							handleCancelClick={handleDeleteClick}
							handleDeleteClick={deleteGroup}
						/>
					}
				</div>
			</div>
			{group?.cards.length
				? 	<div>Cards</div>
				:   <div className={classes.item__empty}>
						<div className={classes.empty__text}>
							Nothing is planned<br/>
							Add something here or transher from backlog
						</div>
						{showCreateForm 
							? 
								<CardCreateForm 
									setShowCreateForm={setShowCreateForm}
									groupId={group.id}
								/>
							:
								<button 
									onClick={() => setShowCreateForm(true)}
									className={classes.add}
								>+ Add card</button>
						}
					</div>
			}
		</li>
	)
}

export default GroupItem;