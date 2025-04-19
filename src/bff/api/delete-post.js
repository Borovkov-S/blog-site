export const deletePost = async (postId) =>
	await fetch(`http://localhost:3001/posts/${postId}`, {
		method: 'DELETE',
	});
