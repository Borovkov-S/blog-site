import styled from 'styled-components';

const InputContainer = ({ className, ...props }) => {
	return <input className={className} {...props} />;
};

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 56px;
	font-size: 25px;
	padding-inline: 17px;
`;
