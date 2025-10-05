import { sessions } from "../sessions";
import * as db from '../../db.json'
import { getUser } from "../api";

export const authorize = async (authLogin, authPassword) => {
	// const user = await getUser(authLogin);
	const user = db.users.filter((user) => user.login === authLogin)[0]

	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			res: null,
		};
	}

	const {id, login, password, role_id} = user

	if (authPassword !== password) {
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			login,
			roleId: role_id,
			session: sessions.create(user),
		},
	};
}
