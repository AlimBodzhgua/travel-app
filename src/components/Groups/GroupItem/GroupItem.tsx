import { FC, useState, useEffect, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useInputHotkeys } from 'hooks/useInputHotkeys';
import type { IGroup } from 'types/types';

import { CardCreateForm } from 'components/CreateForms';
import { CardsList } from 'components/CardsList';
import { Popup } from 'components/Popup/Popup';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';

import { ReactComponent as NoteIcon } from 'assets/icons/note.svg';
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

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
	};
	
	const onTogglePopup = useCallback(() => {
		setShowPopup(prev => !prev);
	}, []);

	const onSave = () => {
		dispatch(userActions.editGroup({
			travelId: id!,
			groupId: group.id,
			value
		}));
		setEditable(false);
	};

	const inputRef = useInputHotkeys({ onSave, onCancel: onToggleEdit });

	const deleteGroup = useCallback(() => {
		dispatch(userActions.deleteGroup({
			travelId: id!,
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
					<Input
						value={value}
						onChange={onChangeValue}
						className={classes.input}
						ref={inputRef}
						autoFocus
						type='text'
						size='sm'
						placeholder='Enter group name'
						addonAfter={
							<Button
								onClick={onSave}
								theme='clear'
								className={classes.saveBtn}
							>
								<SuccessIcon />
							</Button>
						}
					/>
				) : (
					<h2 className={classes.title} onDoubleClick={onToggleEdit}>{group?.title}</h2>
				)}
				<div className={classes.actions}>
					<Button onClick={onToggleEdit} size='sm' className={classes.editBtn}>
						<EditIcon className={classes.editIcon}/>
					</Button>
					<Button onClick={onTogglePopup} size='sm' className={classes.closeBtn}>
						<CloseIcon className={classes.closeIcon}/>
					</Button>

					{showPopup && <Popup onCancel={onTogglePopup} onDelete={deleteGroup}/>}
				</div>
			</div>
			{group?.cards.length ? (
				<CardsList groupId={group.id} travelId={id!} />
			) : (!showCreateForm && (
					<div className={classes.emptyMsg}>
						<NoteIcon className={classes.noteIcon} />
						<h3 className={classes.emptyTitle}>{t('Nothing is planned')}</h3>
					</div>
				)
			)}
			{showCreateForm ? (
				<CardCreateForm onClose={onToggleShowForm} groupId={group.id} />
			) : (
				<Button onClick={onToggleShowForm} size='sm' className={classes.addBtn}>
					+ {t('Add card')}
				</Button>
			)}
		</li>
	);
});