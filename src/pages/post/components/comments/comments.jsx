import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useServerRequest } from '../../../../hooks';
import { selectUserId } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			{userId && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						onClick={() => {
							onNewCommentAdd(postId, userId, newComment);
						}}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						id={id}
						postId={postId}
						author={author}
						content={content}
						publishedAt={publishedAt}
						key={id}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 766px;
	margin: 25px auto 0;

	.new-comment {
		display: flex;
		align-items: start;
		gap: 10px;
		margin-bottom: 18px;

		textarea {
			width: 100%;
			height: 160px;
			padding: 12px;
			resize: none;
			font-size: 25px;
			border: 3px solid #8c8c8c;
		}

		i {
			margin-top: 15px;
		}
	}

	.comments {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
