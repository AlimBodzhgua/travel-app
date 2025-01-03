import { FC, useState, useEffect, memo, useCallback } from 'react';
import { IGroup } from 'types/types';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CardCreateForm } from 'components/CreateForms';
import { CardsList } from 'components/CardsList';
import { Popup } from 'components/Popup/Popup';
import classes from './GroupItem.module.css';
	
interface GroupItemProps {
	group: IGroup;
}

export const GroupItem: FC<GroupItemProps> = memo(({ group }) => {
	const { t } = useTranslation();
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();
	const { id } = useParams<{id? : string}>();
	const { 
		attributes,
    	listeners,
    	setNodeRef,
    	transform,
    	transition
   	} = useSortable({id: group.id});

	const style = {
 		transform: CSS.Translate.toString(transform),
 		transition
	};

	useEffect(() => {
		setValue(group.title);			
	}, []);

	const handleEditClick = () => setEditable(!editable);

	const handleDeleteClick = useCallback(() => {
		setShowPopup(!showPopup);
	}, [showPopup]);

	const handleSaveClick = ():void => {
		dispatch(userActions.editGroup({
			travelId: Number(id),
			groupId: group.id,
			value
		}));
		setEditable(false);
	};

	const deleteGroup = useCallback(() => {
		dispatch(userActions.deleteGroup({
			travelId: Number(id),
			groupId: group.id
		}));
	}, [dispatch]);

	return (
		<li 
			className={classes.GroupItem}
			style={style}
			ref={setNodeRef}
			{...attributes} 
			{...listeners}
		>
			<div className={classes.item__header}>
				{editable 
					? <input 
						autoFocus
						type='text' 
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
						>
							&#x2714;
						</button>
					}
					<button 
						onClick={handleEditClick}
						className={classes.edit}
					>
						edit
					</button>
					<button 
						onClick={handleDeleteClick}
						className={classes.close}
					>
						&#10005;
					</button>
					{showPopup && 
						<Popup
							handleCancelClick={handleDeleteClick}
							handleDeleteClick={deleteGroup}
						/>
					}
				</div>
			</div>
			{group?.cards.length
				? 	<CardsList groupId={group.id} travelId={Number(id)}/>
				:   <div className={classes.item__empty}>
						<div className={classes.empty__text}>
							{t('Nothing is planned')}
						</div>
					</div>
			}
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
					>
						+ {t('Add card')}
					</button>
			}
		</li>
	);
});