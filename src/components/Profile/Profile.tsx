import { FC, useState, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from 'redux/slices/userSlice';
import { selectUser } from 'redux/selectors/selectors';    
import { useTranslation } from 'react-i18next';
import { Button } from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input/Input';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';

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
						<Button 
							onClick={onSave}
							className={classes.saveBtn}
							theme='clear'
						>
							<SuccessIcon className={classes.saveIcon}/>
						</Button>
					}
					<Button 
						onClick={onToggleEdit}
						className={classes.editBtn}
						theme='clear'
					>
						{editable
							? <CloseIcon className={classes.closeIcon}/>
							: <EditIcon className={classes.editIcon}/>
						}
					</Button>
				</div>
			</div>
			<Input 
				value={login}
				onChange={onLoginChange}
				disabled={!editable}
				className={classes.input}
				type='text' 
				size='lg'
			/>
			<Input 
				value={email}
				onChange={onEmailChange}
				disabled={!editable}
				className={classes.input}
				type='email' 
				size='lg'
			/>
			<Button
				className={classes.logoutBtn}
				onClick={onLogout}
				theme='blue'
				size='md'			
				square
			>
				{t('logout')}
			</Button>
		</div>
	);
});
