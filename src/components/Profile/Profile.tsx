import {FC, useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'hooks/redux';
import {useNavigate} from 'react-router-dom';
import {userSlice} from 'redux/reducers/userSlice';
import {selectUser} from 'redux/selectors/selectors';    
import classes from './profile.module.css';


const Profile: FC = () => {
	const user = useAppSelector(selectUser);
	const [login, setLogin] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [editable, setEditable] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setLogin(user.login);
			setEmail(user.email);
		}
	}, []);

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
		setLogin(e.target?.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
		setEmail(e.target?.value);
	};

	const handleEditClick = ():void => setEditable(!editable);

	const handleSaveClick = ():void => {
		if (window.confirm('Are you sure you want to save changes?')) {
			if (login.length && email.length) {
				if (login !== user?.login) {
					dispatch(userSlice.actions.changeLogin(login));
				}
				if (email !== user?.email) {
					dispatch(userSlice.actions.changeEmail(email));
				}
				setEditable(false);
			} else alert('Input value empty');
		}
	};

	const handleLogoutClick = ():void => {
		dispatch(userSlice.actions.logoutUser());
		localStorage.removeItem('user');
		navigate('/');
	};


	return (
		<div className={classes.profile}>
			<div className={classes.profile__header}>
				<h1 className={classes.profile__title}>Your profile</h1>
				<div className={classes.profile__actions}>
					{editable &&
						<button 
							onClick={handleSaveClick}
							className={classes.save}
						>&#x2714;</button>
					}
					<button 
						onClick={handleEditClick}
						className={editable ? classes.cancel : classes.edit}
					>{editable ? <>&#10005;</> : <>edit</>}
					</button>
				</div>
			</div>
			<input 
				disabled={editable ? false : true}
				type='text' 
				value={login}
				onChange={handleLoginChange}
				className={classes.profile__item}
			/>
			<input 
				disabled={editable ? false : true}
				type='email' 
				value={email}
				onChange={handleEmailChange}
				className={classes.profile__item}
			/>
			<button 
				className={classes.profile__btn}
				onClick={handleLogoutClick}
			>logout</button>
		</div>
	);
};


export default Profile;