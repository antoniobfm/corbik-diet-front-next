import styled, { css } from 'styled-components';
import { FiSettings, FiTrash } from 'react-icons/fi';

export const Container = styled.div`
	background: linear-gradient(346.65deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 100%), #0A0A0B;
	min-height: 100vh;
`;

interface IDetails {
	hasContent?: boolean
}

export const Details = styled.div<IDetails>`
	margin-bottom: 16px;
  height: auto;
	padding: 16px 16px 32px;

	${props =>
		props.hasContent &&
		css`
			padding: 16px 16px 16px;
	`}

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

	.history__container {
		.history__item {
			height: 48px;

			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			border-bottom: 1px solid #222425;



			.history__item__title {
				font-family: "Poppins";
				font-size: 14px;
			}

			.history__item__subtitle {
				font-family: "Poppins";
				font-size: 10px;
				font-weight: 400;
				color: #7E7E7F;
			}
		}
		.history__item:last-child {
			border-bottom: none;
		}
	}

	.header {
		padding-bottom: 16px;

		${props =>
			props.hasContent &&
			css`
				padding-bottom: 0px;
		`}

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

		h4 {
			text-align: right;
			font-weight: 400;
			font-size: 10px;
			color: #545454;
			text-transform: uppercase;
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

export const EditButton = styled.button`
  width: 35%;
  height: 56px;

  background: linear-gradient(111.07deg, #F2C94C 0%, rgba(242, 201, 76, 0.5) 100%), #181A1B;
  border: 1px solid #F2C94C;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #FDF8E7;
`;

export const StaticMenu = styled.div`
  position: relative;
  bottom: 0;
  height: 56px;
  width: calc(100%);

  background-color: #181A1B;
  border-radius: 6px;

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;

    border-radius: 6px;
    box-shadow: inset 0 0 1px #222425, inset 0 0 1px #222425, inset 0 0 1px #222425;

    .amount {
      width: 35%;
      border-right: 1px solid #222425;
      height: 55px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

      display: flex;
      align-items: center;
      flex-direction: row;
      margin-left: 1px;

      input {
        background: none;
        outline: none;
        border: none;
        height: 56px;

        padding-left: 16px;
        color: rgba(255, 255, 255, 0.95);
        font-size: 16px;

				-webkit-user-select: text; /* Chrome, Opera, Safari */
				-moz-user-select: text; /* Firefox 2+ */
				-ms-user-select: text; /* IE 10+ */
				user-select: text; /* Standard syntax */
      }
    }

    .unit {
      width: 30%;
      height: 56px;

      display: flex;
      align-items: center;
      flex-direction: row;

      select {
        background: none;
        outline: none;
        border: none;
        height: 56px;

        padding-left: 16px;
        color: rgba(255, 255, 255, 0.95);
        font-size: 16px;

        opacity: 0.5;

        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }
    }
  }
`;

export const ConfirmDeletion = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  > button {
    flex: 1;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
  }

  > div {
    background: #0A0A0B;
    border: 1px solid #222425;
    box-sizing: border-box;
    border-radius: 6px;

    width: 90vw;

    padding: 14px 16px;

    h2 {
      text-align: center;
      padding-bottom: 30px;
    }

    > div {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .button--cancel {
        flex: 1;
        height: 54px;
        background: none;
        outline: none;
        border: none;
        color: #FFFFFF;
      }

      .button--confirm--deletion {
        flex: 1;
        height: 54px;
        background: linear-gradient(111.07deg, #EB5757 0%, rgba(235, 87, 87, 0.5) 100%), #0A0A0B;
        border: 1px solid #EB5757;
        border-radius: 6px;
        color: #FAD1D1;
      }

    }
  }
`;

export const Footer = styled.footer`
	display: flex;
	flex-direction: row;
	justify-content: center;

	button {
		width: 100px;
		height: 64px;
		background: none;
		outline: none;
		border: none;
		color: var(--low-emphasis);

		svg {
			color: var(--high-emphasis);
			opacity: 0.5;
		}
	}
`;


export const DeleteIcon = styled(FiTrash)`
  width: 18px;
  height: 18px;

  opacity: 0.5;
`;

export const SettingsIcon = styled(FiSettings)`
  width: 18px;
  height: 18px;

  opacity: 0.5;
`;
