import {FC, Suspense} from 'react';
import {useAppSelector} from 'hooks/redux';
import {Routes, Route} from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner';
import {privateRoutes, publicRoutes} from './routes';

const AppRouter: FC = () => {
	const {isAuth} = useAppSelector(state => state.userReducer);

	return (
		<>
			<Suspense fallback={
				<div className='spinner'>
					<RotatingLines
	                    strokeColor='grey'
	                    strokeWidth='5'
	                    animationDuration='0.75'
	                    width='55'
	                    visible={true}
	                />
                </div>
           	}>
           		<Routes>
           			{isAuth 
           				? 	privateRoutes.map(route => 
           						<Route
           							path={route.path}
           							element={route.component}
           						/>
           					)
           				:   publicRoutes.map(route => 
           						<Route
           							path={route.path}
           							element={route.component}
           						/>
           					)
           			}
				</Routes>
			</Suspense>
		</>
	);
};

export default AppRouter;