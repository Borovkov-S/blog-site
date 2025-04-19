export const deleteUser = async (userId) =>
	await fetch(`http://localhost:3001/users/${userId}`, {
		method: 'DELETE',
	});
