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
import { ReactComponent as NoteIcon } from 'assets/icons/note.svg'
import classes from './GroupItem.module.css';
	
interface GroupItemProps {
	group: IGroup;
}

export const GroupItem: FC<GroupItemProps> = memo(({ group }) => {
	const { t } = useTranslation();
	const { id } = useParams<{id? : string}>();
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>(group.title);
	const dispatch = useAppDispatch();
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

	const onToggleEdit = () => {
		setEditable(prev => !prev);
	};

	const onToggleShowForm = () => {
		setShowCreateForm(prev => !prev);
	};

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}
	
	const onTogglePopup = useCallback(() => {
		setShowPopup(prev => !prev);
	}, []);

	const onSave = () => {
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
			<div className={classes.header}>
				{editable ? (
					<input
						autoFocus
						type='text'
						value={value}
						onChange={onChangeValue}
						placeholder={group?.title}
						className={classes.input}
					/>
				) : (
					<h2 className={classes.title}>{group?.title}</h2>
				)}
				<div className={classes.actions}>
					{editable && 
						<button 
							onClick={onSave}
							className={classes.save}
						>
							&#x2714;
						</button>
					}
					<button onClick={onToggleEdit} className={classes.edit}>
						edit
					</button>
					<button onClick={onTogglePopup} className={classes.close}>
						&#10005;
					</button>

					{showPopup && <Popup onCancel={onTogglePopup} onDelete={deleteGroup}/>}

				</div>
			</div>
			{group?.cards.length ? (
				<CardsList groupId={group.id} travelId={Number(id)} />
			) : (!showCreateForm && (
					<div className={classes.emptyMsg}>
						<NoteIcon className={classes.icon} />
						<h3 className={classes.emptyTitle}>{t('Nothing is planned')}</h3>
					</div>
				)
			)}
			{showCreateForm ? (
				<CardCreateForm onClose={onToggleShowForm} groupId={group.id} />
			) : (
				<button onClick={onToggleShowForm} className={classes.add}>
					+ {t('Add card')}
				</button>
			)}
		</li>
	);
});