import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';
import { generateDate } from '../../../../bff/utils';

const PostFormContainer = ({
	className,
	post: { id, title, image_url, content, published_at, comments },
	setPost,
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(image_url);
	const [titleValue, setTitleValue] = useState(title);

	useLayoutEffect(() => {
		setImageUrlValue(image_url);
		setTitleValue(title);
	}, [image_url, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const contentRef = useRef(null);

	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		// dispatch(
		// 	savePostAsync(requestServer, {
		// 		id,
		// 		imageUrl: imageUrlValue,
		// 		title: titleValue,
		// 		content: newContent,
		// 	}),
		// ).then(({ id }) => navigate(`/post/${id}`));
		const posts = JSON.parse(sessionStorage.getItem('posts'));
		const postIndex = posts.findIndex((post) => post.id === id);

		if (postIndex >= 0) {
			const savedPost = {
				id,
				title: titleValue,
				image_url: imageUrlValue,
				content: newContent,
				published_at,
				comments,
			};

			setPost(savedPost);
			posts[postIndex] = savedPost;
			sessionStorage.setItem('posts', JSON.stringify(posts));
			navigate(`/post/${id}`);
		} else {
			const savedPost = {
				id : String(Math.random()).slice(2, 6),
				title: titleValue,
				image_url: imageUrlValue,
				content: newContent,
				published_at: generateDate(),
				comments: [],
			};
			sessionStorage.setItem(savedPost.id, JSON.stringify(savedPost.comments));
			posts.unshift(savedPost);
			sessionStorage.setItem('posts', JSON.stringify(posts));
			navigate(`/`);
		}

	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				className="image-url"
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={published_at}
				actionButton={<Icon id="fa-floppy-o" size="25px" onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	width: 1170px;
	margin: 0 auto;
	font-size: 25px;

	& .image-url {
		margin-bottom: 15px;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #1c1c1c;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
