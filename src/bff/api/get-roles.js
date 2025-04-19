export const getRoles = () =>
	fetch('http://localhost:3001/roles').then((loadedRoles) => loadedRoles.json());
