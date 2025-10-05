import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { H2, PrivateContent } from '../../components';
import { UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.res);
				setRoles(rolesRes.res.filter(({ name }) => name !== 'Гость'));
			},
		);
	}, [requestServer, shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		requestServer('removeUser', userId).then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<div className="table-header">
						<p className="login-column">Логин</p>
						<p className="registered-at-column">Дата регистрации</p>
						<p className="role-column">Роль</p>
					</div>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</PrivateContent>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 40px;
	font-size: 25px;
	width: 770px;
	margin: 0 auto;

	& > div {
		width: 100%;
	}

	& .table-header {
		display: flex;
		padding-left: 16px;

		> .login-column {
			margin-right: 141px;
		}

		> .registered-at-column {
			margin-right: 91px;
		}
	}
`;
