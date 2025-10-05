import { Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, image_url, content, published_at },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={image_url} alt={title}></img>
			<h2>{title}</h2>
			<SpecialPanel
				id={id}
				publishedAt={published_at}
				actionButton={
					<Icon
						id="fa-pencil-square-o"
						size="23px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	width: 1170px;
	margin: 0 auto;
	font-size: 25px;

	img {
		display: inline;
		float: left;
		margin: 15px 40px 20px 0;
	}

	h2 {
		font-size: 43px;
		margin-top: 0;
	}

	& .post-text {
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired
}
