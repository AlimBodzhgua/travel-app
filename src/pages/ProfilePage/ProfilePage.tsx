import { FC } from 'react';
import { Profile } from 'components/Profile/Profile';
import { Page } from 'components/UI/Page/Page';


const ProfilePage: FC = () => {
	return (
		<Page>
			<Profile />
		</Page>
	);
};


export default ProfilePage;