import {FC, lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';


const ProfilePage = lazy(() => import('pages/ProfilePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const TravelsPage = lazy(() => import('pages/LoginPage'));

const AppRouter: FC = () => {
	return (
		<>
			<Suspense fallback={<h1>Loading Page...</h1>}>
				<Routes>
					<Route path='/profile' 	element={<ProfilePage/>}/>
					<Route path='/register' element={<RegisterPage/>}/>
					<Route path='/login' 	element={<LoginPage/>}/>
					<Route path='/travels' 	element={<TravelsPage/>}/>
				</Routes>
			</Suspense>
		</>
	)
}

export default AppRouter;