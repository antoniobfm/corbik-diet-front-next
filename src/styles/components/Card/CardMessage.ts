import styled from 'styled-components';

interface IProps {
	borderBottom: boolean;
}

export const Container = styled.div<IProps>`
	flex: 1;
	border-bottom: ${props => props.borderBottom ? '1px' : '0'} solid #222425;

	h4 {
		text-align: center;
		font-weight: 400;
		color: #545454;
		padding: 24px 0;
	}

	button {
		flex: 1;
		height: 48px;
		background: none;
		border: none;
		outline: none;
		transition: 0.3s all;
		margin: auto;
		margin-top: 16px;
		margin-bottom: 8px;

		right: 0;
		border-radius: 24px;
		background: #27AE60;
		box-shadow: 0px 0px 3px #27AE60, 0px 0px 24px #27AE60;

		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0 21px 0 16px;

		> div {
			margin-right: 16px;

			svg {
				color: #D5F6E3;
				opacity: 1;
				padding-top: 3px;
				font-size: 16px;
				filter: drop-shadow(0px 2px 3px #D5F6E3);
			}
		}

		span {
			color: #D5F6E3;
			opacity: 1;
			filter: drop-shadow(0px 2px 3px #D5F6E3);
		}
	}
`;
