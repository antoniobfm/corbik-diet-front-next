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
	::-webkit-scrollbar {
		display: none;
	}
`;

export const Header = styled.header`
  padding: 21px 14px 28px;

  button {
    background: none;
    outline: none;
    border: none;
    font-size: 1.999rem;
    color: white;
    font-weight: 600;
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

  color: #27AE60;

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
      background: linear-gradient(90.14deg, rgba(24, 26, 27, 0.03) 0%, #27AE60 100%), #27AE60;
      border-radius: 9px;
    }
  }
`;

export const Logs = styled.div`
  padding-bottom: 33px;
  // border-radius: 6px;
  background: #181A1B;

  display: flex;
  flex-direction: column;

  h3 {
    padding: 16px 16px 16px;
  }

  .add-log {
    padding: 16px 16px 0 0;
    align-self: flex-end;

    a {
      font-size: 13px;
      opacity: 0.5;
      font-weight: 600;
      color: #ffffff;

      text-decoration: none;
    }
  }
`;

export const Log = styled.div`
  height: 64px;
  border-bottom: 1px solid #222425;
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
