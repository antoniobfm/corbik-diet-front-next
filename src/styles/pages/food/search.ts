import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
`;

export const Header = styled.header`
  padding: 21px 14px 20px;
`;

export const Foods = styled.div`
  padding-top: 8px;
  border-radius: 6px;
  background: #181A1B;
	border: 1px solid #222425;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

	::-webkit-scrollbar {
		display: none;
	}
`;

export const Food = styled.div`
  height: 64px;
  border-bottom: 1px solid #222425;
  padding: 4px 0 0 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  h4 {
    padding-right: 8px;
		font-weight: 400;
  }

	h5 {
		font-weight: 400;
		opacity: 0.5;
	}

  .when {
    width: 68px;
    text-align: center;
  }

  .name-maker-and-quantity {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .name-maker {
    position: relative;
    padding-left: 16px;

		h5 {
			width: 20rem;
			position: absolute;
			word-break: break-all;
			margin-top: -0.8rem;
			font-size: 0.707rem;
		}
  }

  .macros {
    padding-right: 16px;
  }
`;

export const Floating = styled.div`
  width: calc(100vw - 32px);
  height: 56px;
  margin: 0 16px;
  margin-bottom: 32px;

  position: fixed;
  z-index: 2;
	bottom: 0;

	::before {
		content: '';
		width: 150vw;
		height: 124px;
		position: fixed;
		bottom: -33px;
		left: -16px;
		z-index: 0;
		transform:scale(1.5);
		-webkit-mask: -webkit-linear-gradient(transparent, #181A1B 50%, #181A1B);
  -webkit-mask: linear-gradient(transparent, #181A1B 50%, #181A1B);
		background: linear-gradient(180deg, rgba(10, 10, 11, 0) 0%, #0A0A0B 100%);
		backdrop-filter: blur(5px);
	}

	> div {
		position: relative;
		border: 1px solid #222425;
		width: 100%;
		height: 100%;
  	border-radius: 6px;
		background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;

	}
	/* box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); */

`;

export const Menu = styled.div`
	position: relative;
	z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: row;


  .search {
		position: relative;
	z-index: 1;
		// pushes the barcode button over the border
    width: calc(65% + 1px);
    height: 56px;
    border-radius: 6px;

    display: flex;
    align-items: center;
    flex-direction: row;

    .icon {
      width: 50px;
      margin-left: 21px;
    }

    input {
			position: relative;
			z-index: 1;
      background: none;
      outline: none;
      border: none;
      height: 56px;

      padding-left: 16px;
      color: rgba(255, 255, 255, 0.95);
      font-size: 16px;
    }
  }
`;

export const Icon = styled(FiSearch)`
  display: block;
  opacity: 0.4;
`;

export const CreateButtonOld = styled.button`
  width: 35%;
  height: 56px;

  background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
  border: 1px solid #1E854A;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5F6E3;
`;

export const CreateButton = styled.button`
  width: 100%;
  height: 56px;

  background: transparent;
  border: none;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #444444;

	svg {
		color: #444444;
		font-size: 16px;
	}
`;

export const BarcodeButton = styled.button`
  width: 35%;
  height: 58px;
	margin-top: -1px;
	margin-right: -14px;
	position: relative;
	z-index: 1;

  background: linear-gradient(111.07deg, #2755AE 0%, rgba(39, 84, 174, 0.5) 100%), #181A1B;
	border: 1px solid #1E4085;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5E0F6;
`;
