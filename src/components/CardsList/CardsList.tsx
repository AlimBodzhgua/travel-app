import {FC} from 'react';
import {useAppSelector} from 'hooks/redux';
import { selectCards } from 'redux/selectors/selectors';
import CardItem from './CardItem';
import classes from './cards.module.css';

interface CardsListProps {
	travelId: number;
	groupId: number;
}

const CardsList:FC<CardsListProps> = ({travelId, groupId}) => {
	const cards = useAppSelector(state => selectCards(state, travelId, groupId));

	return (
		<ul className={classes.list}>
			{cards && 
				cards.map(card => 
					<CardItem 
						key={card.id}
						card={card}
					/>
				)
			}
		</ul>
	)
}

export default CardsList;