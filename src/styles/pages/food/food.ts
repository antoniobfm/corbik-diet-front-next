import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
  padding: 21px 14px;

  h1 {

  }

  h3 {
    padding-left: 1px;
    margin-top: -11px;
    font-weight: 400;
    opacity: 0.5;
  }

  div {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
  }
`;

export const Details = styled.div`
  height: 40vh;
	padding: 32px 16px 33px;
	box-sizing: border-box;
  border-radius: 6px;
  background: #181A1B;

  position: relative;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

export const Menu = styled.div`
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
    background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;

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
`;
