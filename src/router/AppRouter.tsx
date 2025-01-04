import { FC, Suspense } from 'react';
import { useAppSelector } from 'hooks/redux';
import { Routes, Route } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { privateRoutes, publicRoutes } from './routes';
import { Layout } from 'components/UI/Layout/Layout';

const AppRouter: FC = () => {
	const { isAuth } = useAppSelector(state => state.user);

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
					<Route path='/' element={<Layout />}>
						{isAuth 
							? 	privateRoutes.map(route => 
									<Route
										key={route.path}
										path={route.path}
										element={route.component}
									/>
								)
							:   publicRoutes.map(route => 
									<Route
										key={route.path}
										path={route.path}
										element={route.component}
									/>
								)
						}
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default AppRouter;