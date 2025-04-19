import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Link, Navigate } from 'react-router-dom';
import { Input, Button, H2, FormError } from '../../components';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин, допускаются только буквы и цыфры')
		.min(3, 'Минимальная длина логина - 3 символа')
		.max(15, 'Максимальная длина логина - 15 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цыфры, #, %')
		.min(8, 'Минимальная длина пароля - 8 символа')
		.max(30, 'Максимальная длина пароля - 30 символов'),
});

const StyledLink = styled(Link)`
	width: 100%;
	height: 56px;
	border: 1px solid #000;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 7px;
	font-size: 25px;
	margin-top: 40px;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res))
		});
	};

	const hasFormError = errors?.login?.message || errors?.password?.message;
	const errorMessage = hasFormError || serverError;

	const roleId = useSelector(selectUserRole)

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				></Input>
				<Button height="56px" type="submit" disabled={!!hasFormError}>
					Авторизоваться
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
	font-size: 28px;

	& > form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 347px;
	}
`;
