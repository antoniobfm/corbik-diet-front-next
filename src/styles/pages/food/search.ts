import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
`;

export const Header = styled.header`
  padding: 21px 14px 20px;
`;

export const Foods = styled.div`
  height: 75vh;
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
  width: 92.5%;
  height: 56px;
  margin: auto;
  margin-top: -28px;
  margin-bottom: 12px;

  position: relative;
  z-index: 3;

  background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;
  border-radius: 6px;

	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	border: 1px solid #222425;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  .search {
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

  background: linear-gradient(111.07deg, #2755AE 0%, rgba(39, 84, 174, 0.5) 100%), #181A1B;
	border: 1px solid #1E4085;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5E0F6;
`;
