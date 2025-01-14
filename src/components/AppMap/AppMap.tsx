import { FC, useEffect, useRef, useState, memo } from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/UI/Button/Button';
import { defaultControls } from './controls';
import classes from './AppMap.module.css';

const initialPlaces = [
	'Москва, улица Лужники', // [55.719130, 37.557834]
	'Москва, Беговая улица, 22', // [55.778765, 37.559388]
	'Москва, Измайловский парк культуры и отдыха', // [55.76713959111698, 37.7601008370564]
]

const initialCoords = [
	[55.719130, 37.557834],
	[55.778765, 37.559388],
	[55.76713959111698, 37.7601008370564],
]

interface AppMapProps {
	onLocationSelect?: (address: string) => void;
	onMapClear?: () => void;
	initialPlaces?: string[];
	initialCoords?: number[][];
	mapControls?: string[];
}

export const AppMap: FC<AppMapProps> = memo((props) => {
	const {
		onLocationSelect,
		onMapClear,
		initialPlaces,
		initialCoords,
		mapControls = defaultControls,
	} = props;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [lineCoords, setLineCoords] = useState<number[][]>([]); 

	const ymaps = useYMaps(['Map']);
	const map = useRef<ymaps.Map | null>(null);
	const mapRef = useRef<HTMLDivElement | null>(null);

	const placemarkRef = useRef<ymaps.Placemark | null>(null);
	const polylineRef = useRef<ymaps.Polyline | null>(null);

	const createPlacemark = (coords: number[], caption?: string) => {
		return new ymaps!.Placemark(coords, {
			iconCaption: caption ? caption : 'Searching...'
		}, {
			preset: 'islands#violetDotIconWithCaption',
			draggable: true
		});
	};

	const createPolyline = (coords: number[][]) => {
		return new ymaps!.Polyline(coords, {
			options: {
				strokeWidth: 4,
				strokeOpacity: 0.5,
			}
		});
	}

	const getCoordinates = async (address: string): Promise<number[] | undefined> => {
		const geocodeResult = await ymaps?.geocode(address);

		if (geocodeResult) {
			const firstGeoObject = geocodeResult.geoObjects.get(0);
			// @ts-expect-error property _coordinates does not exist
			const coordinates = firstGeoObject.geometry._coordinates;
			return coordinates;
		}
		return;
	}

	const getAddress = async (coords: number[]): Promise<string | undefined> => {
		const geocodeResult = await ymaps?.geocode(coords);

		if (geocodeResult) {
			const firstGeoObject = geocodeResult.geoObjects.get(0);
			const metaData = firstGeoObject.properties.get('metaDataProperty', {}); 
			// @ts-expect-error property GeocoderMetaData does not exist
			const resultAddress: string = metaData.GeocoderMetaData.text;
			return resultAddress;
		}
		return;
	};

	const onAddPolyline = (coords: number[]) => {
		if (!polylineRef.current) {
			polylineRef.current = createPolyline(lineCoords);
			map.current!.geoObjects.add(polylineRef.current);
			polylineRef.current.geometry?.setCoordinates([coords]);
		} else {
			const prevCoords = polylineRef.current.geometry?.getCoordinates();
			if (prevCoords) {
				polylineRef.current.geometry?.setCoordinates([...prevCoords, coords]);
			}
		}
	};

	const onAddPlacemark = async (coords: number[], caption?: string) => {
		const address = await getAddress(coords);
		placemarkRef.current = createPlacemark(coords, address);
		map.current!.geoObjects.add(placemarkRef.current);
		
		if (onLocationSelect && address) {
			onLocationSelect(address);
		}
	};

	const onMapClick = (e: ymaps.IEvent<MouseEvent>) => {
		const coords = e.get('coords');
		onAddPlacemark(coords);
		onAddPolyline(coords);
	};

	const onClear = () => {
		map.current?.geoObjects.removeAll();
		placemarkRef.current = null;
		polylineRef.current = null;

		if (onMapClear) {
			onMapClear();
		}
	};

	const initPlaces = (places: string[]) => {
		places.forEach(async (place) => {
			const coordinates = await getCoordinates(place);
			if (coordinates) {
				onAddPlacemark(coordinates);
				onAddPolyline(coordinates);
			}
		});
	}

	useEffect(() => {
		if (!ymaps || !mapRef.current) {
			return;
		}

		map.current = new ymaps.Map(mapRef.current, {
			center: [55.76, 37.64],
			zoom: 10,
			controls: mapControls,
		});

		setIsLoading(false);

		if (initialCoords) {
			initialCoords.forEach((coord) => {
				onAddPlacemark(coord);
				onAddPolyline(coord);
			})
		} else if (initialPlaces) {
			initPlaces(initialPlaces);
		}

		map.current.events.add('click', onMapClick);

		return () => {
			placemarkRef.current = null;
			polylineRef.current = null;
			map.current!.destroy();
		};
	}, [ymaps]);

	return (
		<div className={classes.MapWrapper}>
			{isLoading ? (
				<div className={classes.spinner}>
					<RotatingLines
						strokeColor='grey'
						strokeWidth='5'
						animationDuration='0.75'
						width='55'
						visible={true}
					/>
				</div>
			) : (
				<Button
					theme='blue'
					className={classes.clearBtn}
					onClick={onClear}
				>
					clear
				</Button>
			)}
			<div className={classes.Map} ref={mapRef} />
		</div>
	);
});