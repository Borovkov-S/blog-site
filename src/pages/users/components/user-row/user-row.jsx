import { useState } from 'react';
import { Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(+target.value);
	};

	const onRoleSave = (userId, newRoleId) => {
		requestServer('updateUserRole', userId, newRoleId).then(() =>
			setInitialRoleId(newRoleId)
		);
	};

	const isSaveButtonDisabled = initialRoleId === selectedRoleId;

	return (
		<div className={className}>
			<div className="user-data">
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="select-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</div>
			<Icon id="fa-trash-o" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;

	& > .user-data {
		display: flex;
		align-items: center;
		border: 2px solid #1c1c1c;
		border-radius: 2px;
		margin-right: 11px;
		height: 56px;

		> .login-column {
			width: 202px;
			margin-left: 22px;
		}

		> .registered-at-column {
			width: 288px;
		}

		> .select-column {
			display: flex;
			justify-content: right;
			gap: 16px;
			margin-right: 16px;
			width: 213px;
		}
	}

	i {
		font-size: 28px;
	}

	select {
		font-size: 20px;
	}
`;
