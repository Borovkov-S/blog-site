import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const Discription = styled.div`
	font-size: 25px;
	font-style: italic;
`;

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Discription>
				Веб-технологии <br></br>
				Написание кода <br></br>
				Разбор ошибок
			</Discription>
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	width: 1333px;
	height: 140px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 -7px 35px 9px #616161;
	position: fixed;
	top: 0;
	background-color: #fff;
	padding-inline: 50px;
`;
