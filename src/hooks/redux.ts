import { TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import { AppDispatch } from 'redux/config/store';
import { StateSchema } from 'redux/config/StateSchema';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;  