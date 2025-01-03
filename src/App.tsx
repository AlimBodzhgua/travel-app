import { FC, useEffect } from 'react';
import { isUserLoggedIn, saveUserToLocalStorage } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userSlice } from 'redux/reducers/userSlice';
import { IUser } from 'types/types';
import UserService from 'services/UserService';
import AppRouter from 'router/AppRouter';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const {isAuth, authData} = useAppSelector(state => state.user);

    useEffect(() => {
        if (isUserLoggedIn()) {
            const user: IUser = JSON.parse(localStorage.getItem('user') || '');
            dispatch(userSlice.actions.setUser(user));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isAuth && authData) {
            UserService.updateUser(authData);
            saveUserToLocalStorage(authData);
        }
    }, [authData, isAuth]);

    return <AppRouter/>;
};

export default App;