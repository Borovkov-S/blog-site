import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Comments, PostContent, PostForm } from './components';
import { Error, PrivateContent } from '../../components';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import * as db from '../../db.json';
import { generateDate } from '../../bff/utils';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = !!useMatch('post/:id/edit');
	const isCreating = !!useMatch('/post');
	const requestServer = useServerRequest();
	// const post = useSelector(selectPost);

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	//для gh-pages
	const [post, setPost] = useState({});
	const [comments, setComments] = useState(null);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		// dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
		// 	setError(postData.error);
		// 	setIsLoading(false);
		// });
		const posts = JSON.parse(sessionStorage.getItem('posts'));

		posts.forEach((post) => (post.id === params.id ? setPost(post) : null));
		setComments(
			JSON.parse(sessionStorage.getItem(params.id)) ||
				db.comments.filter(({ post_id }) => post_id === params.id),
		);
		setIsLoading(false);
	}, [dispatch, params.id, requestServer, isCreating]);

	if (isLoading) {
		return null;
	}

	// if (!post.id) {
	// 	setPost({
	// 		id: String(Math.random()).slice(2, 6),
	// 		title: '',
	// 		image_url: '',
	// 		content: '',
	// 		published_at: generateDate(),
	// 		comments:[]
	// 	});

	// 	// sessionStorage.setItem(post.id, JSON.stringify(post.comments))
	// 	setComments(post.comments)
	// }

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} setPost={setPost} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments
					comments={comments}
					postId={post.id}
					setComments={setComments}
				/>
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)``;
