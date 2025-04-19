import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	publishedAt,
	commentsCount,
	imageUrl,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h3>{title}</h3>
					<div className={'post-card-info'}>
						<div className="published-at">
							<Icon id="fa-calendar-o" size="28px" />
							{publishedAt}
						</div>
						<div className="comments">
							<Icon id="fa-comment-o" size="25px;" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 379px;
	border: 2px solid #1c1c1c;
	font-size: 22px;

	img {
		border-bottom: 2px solid #1c1c1c;
	}

	& .post-card-footer {
		padding: 0 10px 20px;
		}

		& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	& .published-at,
	.comments {
		display: flex;
		align-items: end;
		gap: 8px;
		line-height: 20px;
	}
`;
