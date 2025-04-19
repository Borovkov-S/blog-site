import { getUser, addUser } from "../api";
import { sessions } from "../sessions";

export const register = async (regLogin, regPassword) => {
	const hasUser = await getUser(regLogin);

	if (hasUser) {
		return {
			error: 'Пользователь с таким логином уже существует',
			res: null,
		};
	}

	const user = await addUser(regLogin, regPassword);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: sessions.create(user),
		},
	};
}
