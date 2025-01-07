import { FC, useEffect, useState, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectUser, selectMembersByTravelId } from 'redux/selectors/selectors';
import { removeMembersFromFriendList } from 'utils/utils';
import { useParams } from 'react-router-dom';
import { IFriend } from 'types/types';
import { useTranslation } from 'react-i18next';
import { Item } from './Item';
import classes from './member-add.module.css';

export const AddMembersSection: FC = memo(() => {
	const { t } = useTranslation();
	const { id } = useParams<{id? : string}>();
	const members = useAppSelector(state => selectMembersByTravelId(state, id!));
	const user = useAppSelector(selectUser);
	const [filteredFriends, setFilteredFriends] = useState<IFriend[]>([]);

	useEffect(() => {
		if (user) {
			setFilteredFriends(removeMembersFromFriendList(members, user.friends));
		}
	}, [members]);

	return (
		<div className={classes.section}>
			{filteredFriends.length 
				?	<>
						<h4 className={classes.helper_text}>
							{t('Drag friends and drop to members list or press button')}
						</h4>
						<ul className={classes.list}>
							{filteredFriends.map(friend => 
								<Item 
									key={friend.id} 
									friend={friend}
								/>
							)}
						</ul>
					</>
				: 	<div className={classes.empty_text}>
						{t('You have no friends to add')}
					</div>
			}
		</div>
	);
});