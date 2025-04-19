import styled from 'styled-components';

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({width = '100%'}) => width};
	height: ${({ height = '40px' }) => height};
	border: 1px solid #000;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 7px;
	background-color: ${({ disabled }) => disabled ? '#ccc' : '#fff'};
	font-size: 25px;
	cursor:  ${({ disabled }) => disabled ? 'default' : 'pointer'};
`;
