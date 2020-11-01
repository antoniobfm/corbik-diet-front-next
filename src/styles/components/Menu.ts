import styled from 'styled-components';

interface Props {
	isSelected: boolean;
}

export const Container = styled.div`
	position: fixed;
	bottom: 0;
	z-index: 4;

	width: 100%;
	height:	48px;
	background: #0B0B0C;
	border-top: 1px solid #222425;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	#add {
		height: 100%;
		background: linear-gradient(113.21deg, rgba(39, 174, 96, 0.5) 0%, rgba(39, 174, 96, 0.25) 96.25%);

		svg {
			color: #D5F6E3;
		}
	}
`;

export const Button = styled.button<Props>`
	flex: 1;
	height: 100%;
	background: none;
	border: none;
	outline: none;

	svg {
		color: ${props => props.isSelected ? '#f2f2f2' : '#808080'};
		font-size: 1.125rem;
	}
`;
