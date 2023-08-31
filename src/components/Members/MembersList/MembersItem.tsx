import {FC} from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { IFriend } from 'types/types';
import { useHover } from 'hooks/useHover';
import { userSlice } from 'redux/reducers/userSlice';
import classes from './members-list.module.css';

interface MembersItemProps {
	member: IFriend;
}

const MembersItem: FC<MembersItemProps> = ({member}) => {
	const { id } = useParams<{id?: string}>();
	const [hovering, hoverProps]  = useHover();
	const dispatch = useAppDispatch();

	const handleClick = ():void => {
		dispatch(userSlice.actions.deleteMember({
			travelId: Number(id),
			memberId: member.id
		}));
	};

	return (
		<li className={classes.item} {...hoverProps}>
			<div>
				<div className={classes.email}>{member.email}</div>
				<div className={classes.login}>{member.login}</div>
			</div>
			<button 
				style={{transform: hovering ? 'scale(1.0)' : 'scale(0)'}}
				className={classes.cancel} 
				onClick={handleClick}
			>&#10005;</button>
		</li>
	);
};

export default MembersItem;