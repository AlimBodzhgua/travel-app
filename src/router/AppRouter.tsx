import {FC, lazy, Suspense} from 'react';
import {useAppSelector} from 'hooks/redux';
import {Routes, Route} from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner';
import {selectUser} from 'redux/selectors/selectors';

const ProfilePage = lazy(() => import('pages/ProfilePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const TravelsPage = lazy(() => import('pages/TravelsPage'));
const TravelDetailsPage = lazy(() => import('pages/TravelDetailsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const AppRouter: FC = () => {
	const user = useAppSelector(selectUser);

	return (
		<>
			<Suspense fallback={
				<div className='spinner'>
					<RotatingLines
	                    strokeColor="grey"
	                    strokeWidth="5"
	                    animationDuration="0.75"
	                    width="55"
	                    visible={true}
	                />
                </div>
           	}>
				<Routes>
					<Route path='/register' element={<RegisterPage/>}/>
					<Route path='/login' 	element={<LoginPage/>}/>
					<Route path='/profile' 	element={<ProfilePage/>}/>
					<Route path='/travels' 	element={<TravelsPage/>}/>
					<Route path='/travels/:id' element={<TravelDetailsPage/>} />
					<Route path='*' element={<NotFoundPage/>} />
				</Routes>
			</Suspense>
		</>
	)
}

export default AppRouter;