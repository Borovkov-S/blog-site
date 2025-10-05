import { getComments, getUsers } from "../api";

import * as db from '../../db.json'

export const getPostCommentsWithAuthor = async (postId) => {
	// const comments = await getComments(postId);
	const comments = db.comments.filter((comment) => comment.post_id === postId)

	// const users = await getUsers();

	const users = db.users

	return comments.map((comment) => {
		// const user = users.find(({ id }) => id === comment.authorId);
		const user = users.find(({ id }) => id === comment.author_id);

		return {
			...comment,
			author: user?.login,
		};
	});
};
