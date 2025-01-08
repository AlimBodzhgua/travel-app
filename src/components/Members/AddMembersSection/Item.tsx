import { FC, memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useAppDispatch } from 'hooks/redux';
import { CSS } from '@dnd-kit/utilities';
import { IFriend } from 'types/types';
import { useParams } from 'react-router-dom';
import { userActions } from 'redux/reducers/userSlice';
import { Button } from 'components/UI/Button/Button';

import classes from './member-add.module.css';

interface ItemProps {
	friend: IFriend;
}

export const Item: FC<ItemProps> = memo(({ friend }) => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{id? : string}>();
	const {
		attributes, 
		listeners, 
		setNodeRef, 
		transform,
		isDragging
	} = useDraggable({
	    id: friend.id,
	    data: { friend: friend },
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		opacity: isDragging ? '0' : '1',
	};	

	const onAdd = () => {
		dispatch(userActions.addMember({ travelId: id!, member: friend }));
	};

	return (
		<li 
			{...listeners} 
			{...attributes}
			style={style}
			ref={setNodeRef} 
			className={classes.item}
		>
			<div>
				<div>{friend.email}</div>
				<div>{friend.login}</div>
			</div>
			<Button onClick={onAdd} className={classes.addBtn}>&#43;</Button>
		</li>
	);  
});