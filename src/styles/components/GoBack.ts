import styled from 'styled-components';

export const Container = styled.button`
	position: fixed;
	bottom: 0;
	right: 0;
	margin-bottom: 10vh;
	z-index: 11;

	width: 56px;
	height: 56px;

	background: linear-gradient(91.23deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 100%), #181A1B;
	border: 1px solid #222425;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	border-radius: 6px 0px 0px 6px;

	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		font-size: 16px;
		color: #8C8D8E;
	}
`;
