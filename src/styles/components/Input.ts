import styled, { css } from 'styled-components';

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
	isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
	flex: 1;
	min-height: 56px;
	border-radius: 6px;

	display: flex;
	flex-direction: row;

	position: relative;
	padding: 0 16px;
	margin-bottom: 16px;

	border: 1px solid #222425;

	input {
		width: 100%;
    -webkit-user-select: text; /* Chrome, Opera, Safari */
    -moz-user-select: text; /* Firefox 2+ */
    -ms-user-select: text; /* IE 10+ */
    user-select: text; /* Standard syntax */

		font-size: 18px;
		font-weight: 400;
		background-color: transparent;
		border: none;
		outline: none;

		color: white;

		:focus {
			~ label {
				color: white;
			}
		}
	}

	label {
		top: -7px;
		position: absolute;
		background-color: #181A1B;
		padding: 0 10px;
		margin-left: -10px;

		font-size: 9px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.5);

		transition: 0.2s;
	}

	${props =>
		props.isErrored &&
		css`
			color: #c53030;
			border-color: #c53030;
		`}

	${props =>
		props.isFocused &&
		css`
			color: white;
			border-color: white;
		`}

	${props =>
		props.isFilled &&
		css`
			color: white;
		`}
`;
