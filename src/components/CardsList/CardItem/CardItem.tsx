import { FC, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/reducers/userSlice';
import { ICard } from 'types/types';
import { SortableItem } from 'components/SortableItem/SortableItem';
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

	const handleDeleteClick = ():void => {
		dispatch(userActions.deleteCard({
			cardId: card.id,
			groupId: groupId,
			travelId: travelId, 
		}));
	};

	return (
		<SortableItem id={card.id}>
			<li className={classnames(classes.CardItem, className)}>
				<div className={classes.card__left}>
					<h3 className={classes.card__title}>{card.title}</h3>
				</div>
				<span className={classes.card__separator}></span>
				<div className={classes.card__text}>
					{card.description}
				</div>
				<button 
					onClick={handleDeleteClick}
					className={classes.delete}
				>
					&#10005;
				</button>
			</li>
		</SortableItem>
	);
});