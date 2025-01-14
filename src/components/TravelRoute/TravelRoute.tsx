import { FC, memo, useCallback } from 'react';
import { AppMap } from 'components/AppMap/AppMap';
import { Places } from 'components/Places/Places';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userActions } from 'redux/slices/userSlice';
import { useParams } from 'react-router-dom';
import { selectPlaces } from 'redux/selectors/selectors';
import classnames from 'classnames';
import classes from './TravelRoute.module.css'

interface TravelRouteProps {
	className?: string;
}

export const TravelRoute: FC<TravelRouteProps> = memo(({ className }) => {
	const { id } = useParams<{id? : string}>();
	const places = useAppSelector((state) => selectPlaces(state, id!));
	const dispatch = useAppDispatch();

	const onLocationSelect = useCallback((address: string) => {
		dispatch(userActions.addPlace({ travelId: id!, place: address }));
	}, []);

	const onClearPlaces = useCallback(() => {
		dispatch(userActions.clearPlaces({ travelId: id! }));
	}, []);


	return (
		<div className={classnames(classes.TravelRoute, className)}>
			<AppMap onLocationSelect={onLocationSelect} onMapClear={onClearPlaces} />
			<Places places={places} />
		</div>
	);
});