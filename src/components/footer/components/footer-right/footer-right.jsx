import styled from 'styled-components';

const Weather = styled.div`
	margin-top: 8px;
`;

export const FooterRight = ({ city, temperature, weather }) => {
	return (
		<div>
			<div>{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}</div>
			<Weather>
				{city}, {temperature} градусов, <br></br> {weather}
			</Weather>
		</div>
	);
};
