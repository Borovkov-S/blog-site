import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 24px;
`;

const StyledLink = styled(Link)`
	color: #fff;
	background-color: #000;
	height: 100%;
	border-radius: 7px;
	padding-top: 3px;
	width: 100%;
	min-width: 100px;
`;

const UserName = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	gap: 10px;
	width: 100%;
	height: 40px;
	font-weight: 700;
	font-size: 25px;
	letter-spacing: -3%;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));

		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<StyledLink to="/login">Войти</StyledLink>
					</Button>
				) : (
					<UserName>
						<div>{login}</div>
						<Icon id="fa-sign-out" onClick={onLogout} />
					</UserName>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Icon id="fa-file-text-o" onClick={() => navigate('/post')} />
						{/* <Icon id="fa-users" onClick={() => navigate('/users')} /> */}
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
