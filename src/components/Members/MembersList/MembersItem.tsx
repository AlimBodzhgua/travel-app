import {FC} from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { IFriend } from 'types/types';
import { useHover } from 'hooks/useHover';
import classes from './members-list.module.css';

interface MembersItemProps {
	member: IFriend;
}

const MembersItem: FC<MembersItemProps> = ({member}) => {
	const [hovering, hoverProps]  = useHover();

	return (
		<li className={classes.item} {...hoverProps}>
			<div>
				<div className={classes.email}>{member.email}</div>
				<div className={classes.login}>{member.login}</div>
			</div>
			<button 
				style={{transform: hovering ? 'scale(1.0)' : 'scale(0)'}}
				className={classes.cancel} 
			>&#10005;</button>
		</li>
	)
}

export default MembersItem;