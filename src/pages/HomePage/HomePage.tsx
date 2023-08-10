import {FC} from 'react';
import {useAppSelector} from 'hooks/redux';
import {selectUser} from 'redux/selectors/selectors';

const HomePage: FC = () => {
	const user = useAppSelector(selectUser);

	return (
		<div>
			HomePage
		</div>
	)
}

export default HomePage;