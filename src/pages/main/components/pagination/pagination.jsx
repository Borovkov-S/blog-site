import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage, posts }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				{'<<'}
			</Button>
			<Button className="current-page">{page}</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				{'>>'}
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	gap: 5px;
	margin-block: ${({ posts }) => (posts.length > 3 ? '50px 10px' : '240px 10px')};

	& button {
		width: 130px;
	}

	& .current-page {
		font-size: 30px;
		border: 2px solid #1c1c1c;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
}
