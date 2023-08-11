import {FC} from 'react';
import {ICard} from 'types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classes from './cards.module.css';

interface CardItemProps {
	card: ICard;
}


const CardItem:FC<CardItemProps> = ({card}) => {
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


	return (
		<li 
			className={classes.card}
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
		</li>
	);
};


export default CardItem;