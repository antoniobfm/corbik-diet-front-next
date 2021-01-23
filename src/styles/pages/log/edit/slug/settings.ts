import styled from "styled-components";

export const Details = styled.div`
	margin-bottom: 16px;
	height: auto;
	padding: 16px 16px 33px;
	box-sizing: border-box;
	background: #181A1B;
	border: 1px solid #222425;
	border-left: none;
	border-right: none;

	position: relative;
	z-index: 0;

	display: flex;
	flex-direction: column;

	.Special__Select {
		padding: 0 0 0 16px;
		border: 1px solid #222425;
		background: linear-gradient(92.97deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
		height: 68px;

		border-radius: 6px;

		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 8px;

		.Special__Select__DropdownIndicator {
			height: 100%;
			width: 10%;
			color: #828282;
			border-left: 1px solid #222425;

			display: flex;
			align-items: center;
			justify-content: center;
		}

		h3 {
			font-size: 14px;
		}
		h5 {
			font-size: 9.9px;
			font-weight: 400;
			color: #828282;
		}
	}

	.header {
		padding-bottom: 16px;
		height: 32px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		h3 {
			span {
				padding-left: 8px;
				font-size: 10px;
				color: #7E7E7E;
			}
		}

		button {
			outline: none;
			border: none;
			background: none;
			color: #7E7E7F;

			font-family: "Poppins";
			font-weight: 600;
			font-size: 10px;
			height: 100%;

			svg {
				font-size: 16px;
			}
		}
	}
`;
