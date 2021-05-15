import styled, { css } from 'styled-components';

interface ContainerProps {
	isErrored: boolean;
	isFocused: boolean;
	isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%);
border: 1.5px solid #222425;
box-sizing: border-box;
filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
border-radius: 6px;
padding-left: 16px;
margin-top: 8px;
margin-bottom: 16px;

display: flex;
justify-content: space-between;
align-items: center;

transition: 0.3s all;

svg {
	min-width: 20px;
	color: rgba(255, 255, 255, 1);
	opacity: 0.4;
	font-size: 14px;
}

input {
	flex: 1;
	padding: 16px 16px 16px 8px;
	background: none;
	border: none;
	outline: none;

	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 19px;
	text-align: left;

	color: var(--high-emphasis);
	-webkit-user-select: text; /* Chrome, Opera, Safari */
	-moz-user-select: text; /* Firefox 2+ */
	-ms-user-select: text; /* IE 10+ */
	user-select: text; /* Standard syntax */
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
		color: rgba(255, 255, 255, 0.95);
		border-color: rgba(255, 255, 255, 0.95);
		background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.06) 0%, rgba(24, 26, 27, 0.03) 62.45%);
		svg {
			color: rgba(255, 255, 255, 0.95);
			opacity: 1;
		}
	`}

${props =>
	props.isFilled &&
	css`
		color: rgba(255, 255, 255, 0.5);
		border-color: rgba(255, 255, 255, 0.4);
		svg {
			color: rgba(255, 255, 255, 0.95);
			opacity: 1;
		}
	`}

${props =>
	props.isFocused && props.isFilled &&
	css`
		color: rgba(255, 255, 255, 0.95);
		border-color: rgba(255, 255, 255, 0.95);
		background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.06) 0%, rgba(24, 26, 27, 0.03) 62.45%);
		svg {
			color: rgba(255, 255, 255, 0.95);
			opacity: 1;
		}
	`}
`;
