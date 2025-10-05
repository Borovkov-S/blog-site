import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks/';
import { Icon } from '../../../../components';
import styled from 'styled-components';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';

const SpecialPanelContainer = ({ className, id, publishedAt, actionButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				question: 'Удалить статью?',
				onConfirm: () => {
					// dispatch(removePostAsync(requestServer, id)).then(() =>
					// 	navigate('/'),
					// );

					const posts = JSON.parse(sessionStorage.getItem('posts'));
					const postIndex = posts.findIndex((post) => post.id === id)
					posts.splice(postIndex, 1)
					sessionStorage.setItem('posts', JSON.stringify(posts))
					navigate('/')
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && <Icon id="fa-calendar-o" />}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="btn-box">
					{actionButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="25px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-block: 20px;
	height: 30px;

	.published-at {
		display: flex;
		gap: 10px;
	}

	.btn-box {
		display: flex;
		align-items: end;
		gap: 20px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	actionButton: PropTypes.node.isRequired,
};
