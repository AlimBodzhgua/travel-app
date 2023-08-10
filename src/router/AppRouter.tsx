import {FC, lazy, Suspense} from 'react';
import {useAppSelector} from 'hooks/redux';
import {Routes, Route} from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner';
import {selectUser} from 'redux/selectors/selectors';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const TravelsPage = lazy(() => import('pages/TravelsPage/TravelsPage'));
const TravelDetailsPage = lazy(() => import('pages/TravelDetailsPage/TravelDetailsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

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
					<Route path='/' element={<HomePage/>}/>
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