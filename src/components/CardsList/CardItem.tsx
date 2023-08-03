import {FC} from 'react';
import {ICard} from 'types/types';
import classes from './cards.module.css';

interface CardItemProps {
	card: ICard;
}


const CardItem:FC<CardItemProps> = ({card}) => {
	return (
		<li className={classes.card}>
			<div className={classes.card__left}>
				<h3 className={classes.card__title}>{card.title}</h3>
			</div>
			<span className={classes.card__separator}></span>
			<div className={classes.card__text}>{card.description}</div>
		</li>
	)
}


export default CardItem;