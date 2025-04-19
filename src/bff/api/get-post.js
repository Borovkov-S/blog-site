import { transformPost } from '../transformers';

export const getPost = (idToFind) =>
	fetch(`http://localhost:3001/posts/${idToFind}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте ещё раз позднее';

			return Promise.reject(error);
		})
		.then((postData) => postData.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
