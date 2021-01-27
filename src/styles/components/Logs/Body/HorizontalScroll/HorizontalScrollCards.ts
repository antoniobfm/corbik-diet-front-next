import styled from 'styled-components';

interface IProps {
	carbPerc?: number;
	protsPerc?: number;
	fatPerc?: number;
}

export const Container = styled.div<IProps>`
	min-width: 104px;
	max-width: 104px;
	height: 80px;
	background: #181A1B;
	border: 1px solid #222425;
	border-radius: 6px;
	box-sizing: border-box;
	padding: 8px;
	margin: 0 4px;

	display: flex;
	flex-direction: column;
	transition: 0.3s all;

	:active {
  	filter: brightness(1.6);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		height: auto;
		h1 {
			flex: 1;
			min-width: 77%;
			font-size: 9.9px;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* number of lines to show */
			-webkit-box-orient: vertical;
		}
		span {
			flex: 1;
			color: #747676;
			min-width: 23%;
			font-size: 7px;
			font-weight: 400;
			text-align: right;
			padding-top: 2px;
		}
	}

	.details2 {
		flex: 1;
		margin-top: -8px;
		span {
			height: auto;
			flex: 1;
			color: #747676;
			min-width: 23%;
			font-size: 7px;
			font-weight: 400;
			text-align: right;
		}
	}

	.card--macros {
		opacity: 0.5;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		h4 {
			flex: 1;
			text-align: center;
			font-size: 7px;
			height: auto;
			font-weight: 400;
			color: #747676;
		}
		.pie {
			position: relative;
			margin-left: 4px;
			width: 10px;
			height: 10px;
			background-image: conic-gradient(#EB5757 0deg, #EB5757 ${props => props.carbPerc}deg, #2D9CDB ${props => props.carbPerc}deg, #2D9CDB ${props => props.protsPerc}deg,  #F2C94C ${props => props.protsPerc}deg, #F2C94C 360deg);
			border-radius: 50%;

			::before {
				content: "";
				position: absolute;
				width: 7px;
				height: 7px;
				background: #181A1B;
				border-radius: 6px;
				margin-top: 1.5px;
				margin-left: 1.5px;
			}
		}
	}
`;
