import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`

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
      margin-left: 14px;
    }

    input {
			position: relative;
			z-index: 1;
      background: none;
      outline: none;
      border: none;
      height: 56px;
			width: 100%;

      padding-left: 16px;
			padding-right: 24px;
      color: rgba(255, 255, 255, 0.95);
      font-size: 16px;

			-webkit-user-select: text; /* Chrome, Opera, Safari */
			-moz-user-select: text; /* Firefox 2+ */
			-ms-user-select: text; /* IE 10+ */
			user-select: text; /* Standard syntax */
    }
  }
	.lds-dual-ring {
		display: inline-block;
		width: 16px;
		height: 14px;
		transition: 0.2s;
  	opacity: 0.4;
	}
	.lds-dual-ring:after {
		content: " ";
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 1.5px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;


export const Icon = styled(FiSearch)`
  display: block;
  opacity: 0.4;
`;
