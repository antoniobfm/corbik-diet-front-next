import { darken } from 'polished';
import styled from 'styled-components';

interface Macros {
  macro: 'carb' | 'protein' | 'fat';
}

export const Container = styled.div`
  --carbs-color: #EB5757;
  --protein-color: #2D9CDB;
  --fat-color: #F2C94C;
	background: linear-gradient(346.65deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 100%), #0A0A0B;
	min-height: 100vh;
	padding-bottom: 80px;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const Header = styled.header`
	padding: 16px 14px 0px;
	margin-bottom: 16px;
	height: 42px;

	display: flex;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

  #diet--home--change--date {
		flex: 1;
		min-width: 50%;
		height: 100%;
    background: none;
    outline: none;
    border: none;
		text-align: left;
    color: var(--high-emphasis);
    font-size: 2rem;
    font-weight: 600;
		letter-spacing: calc(1.999rem / 100 * 3 * -1);
  }

	#diet--home--settings--button {
		flex: 1;
		height: 100%;
		background: none;
		outline: none;
		border: none;
		text-align: right;
		color: var(--low-emphasis);

		font-family: "Poppins";
		font-weight: 600;
		font-size: 1.125rem;
	}
`;

export const Macros = styled.div`
  padding: 0 16px 16px;

  display: flex;
  justify-content: space-between;
  justify-content: row;
`;

const colors = {
  carb: '#EB5757',
  protein: '#2D9CDB',
  fat: '#F2C94C'
};


const colorsShade = {
  carb: 'rgba(24, 26, 27, 0.03)',
  protein: 'rgba(24, 26, 27, 0.03)',
  fat: 'rgba(24, 26, 27, 0.03)'
};

export const Macro = styled.div<Macros>`
  flex: 1 0 28%;
  max-width: 28%;

  color: ${props => colors[`${props.macro}`]};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

	> div {
	display: flex;
	justify-content: space-between;
	flex-direction: row;

	h4 {
		line-height: 27px;
	}

	> span {
		font-size: 1rem;
		line-height: 27px;
		align-self: flex-end;

		> span {
			font-size: 0.7rem;
			line-height: 27px;
			align-self: flex-end;
		}
  }
	}

  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    width: 100%;

    ::-webkit-progress-bar {
      opacity: 0.5;
      background-color: ${props => colors[`${props.macro}`]}50;
      border-radius: 9px;
    }

    ::-webkit-progress-value {
      background: linear-gradient(90.14deg, ${props => colorsShade[`${props.macro}`]} 0%, ${props => colors[`${props.macro}`]} 100%), ${props => colors[`${props.macro}`]};
      border-radius: 9px;
    }
  }
`;

export const Calories = styled.div`
  padding: 0 16px 24px;

  color: var(--corbik-green);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      font-size: 1rem;
      line-height: 27px;

      > span {
        font-size: 0.7rem;
        line-height: 27px;
        margin-top: 4px;
        align-self: flex-end;
      }
    }
}

  progress[value] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    width: 100%;

    ::-webkit-progress-bar {
      opacity: 0.5;
      background-color: #27AE6050;
      border-radius: 9px;
    }

    ::-webkit-progress-value {
      background: linear-gradient(90.14deg, rgba(24, 26, 27, 0.03) 0%, var(--corbik-green) 100%), var(--corbik-green);
      border-radius: 9px;
    }
  }
`;

export const Logs = styled.div`
	position: relative;
  padding-bottom: 16px;
  // border-radius: 6px;
  background: #181A1B;
	border-top: 1px solid var(--stroke-color);
	border-bottom: 1px solid var(--stroke-color);

  display: flex;
  flex-direction: column;

  .add-log {
		z-index: 2;
    padding: 16px 16px 0 0;
    align-self: flex-end;

    button {
      /* background: linear-gradient(113.21deg, rgba(39, 174, 96, 1) 0%, rgba(39, 174, 96, 0.5) 100%); */
			background: none;
			border: none;
			outline: none;
			padding: 4px 8px;
			border-radius: 6px;
      font-size: 13px;
      opacity: 1;
      font-weight: 600;
			color: var(--high-emphasis);
      /* color: ${darken(0.1, '#D5F6E3')}; */

      text-decoration: none;
    }
  }

	canvas {
		opacity: 0.5;
		position: absolute;
		bottom: 0;
		max-height: 50px;
		max-width: 100vw;
	}

	.search-first {
		flex: 1;

		h4 {
			font-size: 13px;
			text-align: center;
			font-weight: 600;
			color: var(--low-emphasis);
			padding: 24px 0;
		}
	}
`;

interface IBigCardHeader {
	isHorizontal?: boolean;
}

export const BigCardHeader = styled.div<IBigCardHeader>`
	display: flex;
	justify-content: space-between;
	padding: 16px 16px 16px;

	button {
		background: none;
		outline: none;
		border: none;

		svg {
			color: var(--medium-emphasis);

			font-size: 1rem;
			height: 100%;
		}
	}
	div {
		min-width: 30%;
		float: 1;
		text-align: right;

		svg {
			transition: 0.3s all;
			color: var(--low-emphasis);
			transform: ${props => props.isHorizontal && `rotate(-90deg)`};
			font-size: 1rem;
			height: 100%;
		}
	}
`;

export const Log = styled.div`
  height: 64px;
  border-bottom: 1px solid var(--stroke-color);
  padding: 0 0 0 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  h4 {
    font-weight: 400;
    padding-right: 8px;
  }

  h5 {
    font-weight: 400;
    opacity: 0.5;
  }

  .when {
    width: 68px;
    text-align: center;
  }

  .name-and-quantity {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .macros {
    padding-right: 16px;
  }
`;

export const Calendar = styled.aside`
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

  padding-top: 24px;
  padding-bottom: 24px;

  > button {
    flex: 1;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
  }

  .DayPicker {
    background: #0A0A0B;
    border-radius: 6px;
  }

  .DayPicker-wrapper {
    outline: none;
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    margin: 0;
    border-collapse: separate;
    border-spacing: 8px 8px;
  }

  .DayPicker-Body {
    margin-left: 8px solid red;
  }

  .DayPicker-Caption {
    padding: 0;

    div {
      font-family: Poppins, Arial, Helvetica, sans-serif;
      font-weight: 600;
      font-size: 25px;
      margin: 16px 13px 0 16px;
    }
  }

  .DayPicker-NavBar {
    position: absolute;
    right: 0;
    top: 4px;

    .DayPicker-NavButton {
      filter: brightness(100%);
    }
  }


  .DayPicker-Day {

    -webkit-tap-highlight-color: transparent;
    outline: none;
    border-radius: 16px;
    font-size: 16px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 400;
    opacity: 0.5;
    background-color: #181A1B;
    padding: 6px 10px;
  }

  .DayPicker-Day--outside {
    background: transparent;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: transparent;
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #FFFFFF;
    border-radius: 42px;
    box-shadow: inset 0 0 1px white, inset 0 0 1px white, inset 0 0 1px white;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #05151E !important;
    color: #2D9CDB !important;
    box-shadow: inset 0 0 1px #2D9CDB, inset 0 0 1px #2D9CDB, inset 0 0 1px #2D9CDB;
    opacity: 1;
  }

  abbr {
    color: white;
    opacity: 0.25;
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
