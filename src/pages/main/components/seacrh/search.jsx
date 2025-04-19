import styled from 'styled-components';
import { Input, Icon } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Введите заголовок..."
				onChange={onChange}
			/>
			<Icon id="fa-search" size="28px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	border: 2px solid #1c1c1c;
	border-radius: 7px;
	width: 450px;
	padding-right: 17px;
	margin: 0 auto 40px;

	& input {
		border: none;
	}

	& :focus {
		outline: none;
	}
`;
