import { FC, useState, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/reducers/userSlice';
import { selectUser } from 'redux/selectors/selectors';    
import { useTranslation } from 'react-i18next';
import { Button } from 'components/UI/Button/Button';
import classes from './profile.module.css';

export const Profile: FC = memo(() => {
	const user = useAppSelector(selectUser);
	const { t } = useTranslation();
	const [login, setLogin] = useState<string | undefined>(user?.login);
	const [email, setEmail] = useState<string | undefined>(user?.email);
	const [editable, setEditable] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target?.value);
	};

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target?.value);
	};

	const onToggleEdit = () => {
		setEditable(prev => !prev);
	};

	const onSave = () => {
		const saveConfirmed = window.confirm(t('Are you sure you want to save changes?')); 

		if (saveConfirmed) {
			if (login?.length && email?.length) {
				if (login !== user?.login) {
					dispatch(userActions.changeLogin(login));
				}
				if (email !== user?.email) {
					dispatch(userActions.changeEmail(email));
				}
				setEditable(false);
			} else alert(t('Input value empty'));
		}
	};

	const onLogout = () => {
		const logoutConfirmed = window.confirm(t('Are you sure you want to logout?'));

		if (logoutConfirmed) {
			dispatch(userActions.logoutUser());
			localStorage.removeItem('user');
			navigate('/');
		}
	};

	return (
		<div className={classes.profile}>
			<div className={classes.header}>
				<h1 className={classes.title}>
					{t('Your profile')}
				</h1>
				<div className={classes.actions}>
					{editable &&
						<button 
							onClick={onSave}
							className={classes.save}
						>
							&#x2714;
						</button>
					}
					<button 
						onClick={onToggleEdit}
						className={editable ? classes.cancel : classes.edit}
					>
						{editable ? <>&#10005;</> : 'edit'}
					</button>
				</div>
			</div>
			<input 
				type='text' 
				disabled={editable ? false : true}
				value={login}
				onChange={onLoginChange}
				className={classes.input}
			/>
			<input 
				type='email' 
				disabled={editable ? false : true}
				value={email}
				onChange={onEmailChange}
				className={classes.input}
			/>
			<Button
				className={classes.logout}
				theme='blue'
				size='md'			
				onClick={onLogout}
				square={true}
			>
				{t('logout')}
			</Button>
		</div>
	);
});
