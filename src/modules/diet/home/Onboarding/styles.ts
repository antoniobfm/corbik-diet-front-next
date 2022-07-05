import styled from "styled-components";

export const WideCardContainer = styled.div`
width: calc(100%);
height: auto;
margin-bottom: 16px;
padding: 0 0 16px;

background: #181A1B;
border: 1px solid #222425;
border-left: none;
border-right: none;

#test-chart {
	padding: 16px 4px 0px;
	max-height: 200px;
}
`;



export const CardContainer = styled.div`
	width: calc(100% - 16px);
	height: auto;
	margin: 16px auto;
	padding: 0 0 16px;

	background: #181A1B;
	border: 1px solid #222425;
	border-radius: 6px;

	#test-chart {
		padding: 16px 4px 0px;
		max-height: 200px;
	}
`;

export const CardHeader = styled.div`
	padding: 16px;

	h3 {
		font-size: 18px;
		line-height: 27px;
		color: var(--high-emphasis);
	}

	h2 {
		font-size: 1.414rem;
		line-height: 27px;
		color: var(--high-emphasis);
	}

	p {
		padding-top: 8px;
		color: var(--medium-emphasis);
	}
`;

export const CardContent = styled.div`
	padding: 0 16px;
	height: auto;

	h4 {
		font-size: 16px;
		line-height: 27px;
		color: var(--medium-emphasis);
	}

	#missions-container {
		height: auto;
	}
`;

interface MissionProps {
	isDone: boolean;
}

export const Mission = styled.div<MissionProps>`
	width: calc(100% - 32px);
	height: 48px;
	margin: 8px 0;

	background-color: ${props => props.isDone ? 'transparent' : 'var(--second-level-black)'};

	display: flex;
	align-items: center;

	padding: 0 16px;

	border: 1px solid ${props => props.isDone ? 'var(--second-level-black)' : 'transparent'};
	border-radius: 6px;

	.is-done {
		width: 12px;
		height: 12px;

		position: relative;

		border-radius: 6px;
		background-color: ${props => props.isDone ? 'var(--corbik-green)' : 'var(--first-level-black)'};

		box-shadow: 0px 0px 4px ${props => props.isDone ? 'var(--corbik-green)' : 'transparent'}, 0px 0px 12px ${props => props.isDone ? 'var(--corbik-green)' : 'transparent'};

		svg {
			opacity: ${props => props.isDone ? 1 : 0};
			position: absolute;
			margin-top: 1px;
			margin-left: 1px;
			font-size: 10px;
			filter: drop-shadow(0px 1px 1px #FFFFFF), drop-shadow(0px 1px 1px #FFFFFF);
		}
	}

	h5 {
		padding-left: 16px;
		font-size: 14px;
		font-weight: 400;
		color: ${props => props.isDone ? 'var(--disabled-color)' : 'var(--high-emphasis)'};
	}
`;
