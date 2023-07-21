import {FC, useEffect} from 'react';
import {isUserLoggedIn} from 'utils/utils';
import {useAppDispatch} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import {IUser} from 'types/types';
import AppRouter from 'router/AppRouter';
import "./App.css";

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isUserLoggedIn()) {
            const user: IUser = JSON.parse(localStorage.getItem('user') || '{}')
            dispatch(userSlice.actions.setUser(user));
        }
    }, [])

    return (
        <>
            <AppRouter />
        </>
    )
}

export default App;