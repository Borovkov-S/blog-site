import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalQuestion,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const question = useSelector(selectModalQuestion);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay">
				<div className="modal">
					<h3>
						{question}
					</h3>
					<div className="btn-box">
						<Button width="200px" height="50px" onClick={onConfirm}>
							Да
						</Button>
						<Button width="200px" height="50px" onClick={onCancel}>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;

	& .overlay {
		width: 100%;
		height: 100%;
		backdrop-filter: blur(8px) brightness(40%);
		display: flex;
		justify-content: center;
	}

	& .modal {
		position: relative;
		width: 700px;
		height: 400px;
		border: 2px solid #1c1c1c;
		border-radius: 20px;
		margin-top: 20vh;
		background-color: #fff;
		font-size: 25px;
		text-align: center;
		padding: 70px 30px 0;
	}

	& .btn-box {
		position: absolute;
		bottom: 60px;
		left: 0;
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
`;
