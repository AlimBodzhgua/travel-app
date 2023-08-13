import {FC, useEffect} from 'react';
import {isUserLoggedIn, saveUserToLocalStorage} from 'utils/utils';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {userSlice} from 'redux/reducers/userSlice';
import {IUser} from 'types/types';
import {selectUser} from 'redux/selectors/selectors';
import UserService from 'API/UserService';
import AppRouter from 'router/AppRouter';
import './App.css';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const {isAuth, user} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (isUserLoggedIn()) {
            const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
            dispatch(userSlice.actions.setUser(user));
        }
    }, []);

    useEffect(() => {
        if (isAuth && user) {
            UserService.updateUser(user);
            saveUserToLocalStorage(user);
        }
    }, [user]);

    return <AppRouter/>;
};

export default App;