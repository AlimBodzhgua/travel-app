import { FC, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { SortableItem } from 'lib/components';
import { Divider } from 'components/UI/Divider/Divider';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import classnames from 'classnames';
import type { ICard } from 'types/types';

import classes from './CardItem.module.css';

interface CardItemProps {
	card: ICard;
	groupId: string;
	travelId: string;
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

	const onDelete = () => {
		dispatch(userActions.deleteCard({
			cardId: card.id,
			groupId: groupId,
			travelId: travelId, 
		}));
	};

	return (
		<SortableItem id={card.id}>
			<li className={classnames(classes.CardItem, className)}>
				<div className={classes.titleWrapper}>
					<h3 className={classes.title}>{card.title}</h3>
				</div>
				<Divider orientation='vertical'/>
				<div className={classes.description}>
					{card.description}
				</div>
				<Button 
					onClick={onDelete}
					className={classes.deleteBtn}
					theme='clear'
				>
					<CloseIcon />
				</Button>
			</li>
		</SortableItem>
	);
});