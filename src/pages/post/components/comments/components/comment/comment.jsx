import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentAsync, openModal, CLOSE_MODAL } from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import { Icon } from '../../../../../../components';
import styled from 'styled-components';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';

const CommentContainer = ({ className, id, postId, author, publishedAt, content, setComments }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				question: 'Удалить комментарий?',
				onConfirm: () => {
					// dispatch(removeCommentAsync(requestServer, postId, id));
					const newComments = JSON.parse(sessionStorage.getItem(postId));
					const indexDeleteComment = newComments.findIndex(
						(comment) => comment.id === id,
					);
					newComments.splice(indexDeleteComment, 1);
					sessionStorage.setItem(postId, JSON.stringify(newComments));
					setComments(newComments)
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="information">
					<div className="author">
						<Icon id="fa-user-circle-o" size="25px" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" size="23px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon id="fa-trash-o" onClick={() => onCommentRemove(id)} />
			)}{' '}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	width: 100%;
	gap: 15px;

	.comment-block {
		border: 2px solid #1c1c1c;
		width: 100%;
		max-width: 732px;
		padding: 10px;

		.information {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15px;

			.author {
				display: flex;
				align-items: end;
				gap: 5px;
				font-size: 19px;
				line-height: 17px;
			}

			.published-at {
				display: flex;
				align-items: end;
				gap: 5px;
				font-size: 19px;
				line-height: 17px;
			}
		}

		.comment-text {
			font-size: 25px;
		}
	}

	.fa.fa-trash-o {
		margin-top: 15px;
	}
`;

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	postId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
