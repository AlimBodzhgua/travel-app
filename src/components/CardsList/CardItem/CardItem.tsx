import { FC, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import { ICard } from 'types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classnames from 'classnames';
import classes from './CardItem.module.css';

interface CardItemProps {
	card: ICard;
	groupId: number;
	travelId: number;
	className?: string;
}


export const CardItem:FC<CardItemProps> = memo((props) => {
	const {
		card,
		groupId,
		travelId,
		className,
	} = props;
	const dispatch = useAppDispatch();
	const { 
		attributes,
    	listeners,
    	setNodeRef,
    	transform,
    	transition
   	} = useSortable({id: card.id});

   	const style = {
 		transform: CSS.Translate.toString(transform),
 		transition
	};

	const handleDeleteClick = ():void => {
		dispatch(userSlice.actions.deleteCard({
			cardId: card.id,
			groupId: groupId,
			travelId: travelId, 
		}));
	};

	return (
		<li 
			className={classnames(classes.CardItem, className)}
			style={style}
			ref={setNodeRef}
			{...attributes} 
			{...listeners}
		>
			<div className={classes.card__left}>
				<h3 className={classes.card__title}>{card.title}</h3>
			</div>
			<span className={classes.card__separator}></span>
			<div className={classes.card__text}>{card.description}</div>
			<button 
				onClick={handleDeleteClick}
				className={classes.delete}
			>&#10005;</button>
		</li>
	);
});