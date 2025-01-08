import { FC, memo } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { useParams } from 'react-router-dom';
import { userActions } from 'redux/slices/userSlice';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as DeleteIcon } from 'assets/icons/close.svg';

import type { IFriend } from 'types/types';

import classes from './members-list.module.css';

interface MembersItemProps {
	member: IFriend;
}

export const MembersItem: FC<MembersItemProps> = memo(({ member }) => {
	const { id } = useParams<{id?: string}>();
	const dispatch = useAppDispatch();

	const onRemove = () => {
		dispatch(userActions.deleteMember({ travelId: id!, memberId: member.id }));
	};

	return (
		<li className={classes.item}>
			<div>
				<div className={classes.email}>{member.email}</div>
				<div className={classes.login}>{member.login}</div>
			</div>
			<Button onClick={onRemove} className={classes.removeBtn}>
				<DeleteIcon className={classes.removeIcon}/>
			</Button>
		</li>
	);
});
