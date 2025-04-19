import PropTypes from 'prop-types';
import { H2 } from '../h2/h2';
import styled from 'styled-components';
import { PROP_TYPE } from '../../constants';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
`;

export const Error = ({ error }) => (
	<Div>
		<H2>Ошибка</H2>
		<div>{error}</div>
	</Div>
);

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
