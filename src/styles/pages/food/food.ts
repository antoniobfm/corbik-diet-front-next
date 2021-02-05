import styled from 'styled-components';

export const Container = styled.div`
	background: linear-gradient(346.65deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 100%), #0A0A0B;
	min-height: 100vh;
	padding-bottom: 120px;
`;

export const Header = styled.header`
  padding: 21px 14px 16px;

  h1 {
  }

  h3 {
		color: #7E7E7F;
		line-height: 0px;
    padding-left: 1px;
		padding-bottom: 4px;
		padding-top: 8px;
    font-weight: 400;
  }

  div {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
  }
`;

export const Details = styled.div`
  height: auto;
	padding: 32px 16px 33px;
	box-sizing: border-box;
  background: #181A1B;
	border: 1px solid #222425;
	border-left: none;
	border-right: none;

  position: relative;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

export const Floating = styled.div`
  width: 92.5%;
  max-height: 56px;
  margin: auto;
  margin-top: -28px;
  margin-bottom: 12px;

  position: relative;
  z-index: 3;

  background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;
  border-radius: 6px;
`;

export const Menu = styled.div`
	max-height: 56px;
  display: flex;
  align-items: center;
  flex-direction: row;
	box-sizing: border-box;
	border-radius: 6px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	background: linear-gradient(91.23deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 50%), #181A1B;

  .amount {
    min-width: 35%;
		border: none;
    border-right: 1px solid #222425;
    min-height: 56px;

    display: flex;
    align-items: center;
    flex-direction: row;

    input {
      background: none;
      outline: none;
      border: none;

      height: 56px;

      padding-left: 24px;
      color: rgba(255, 255, 255, 0.95);
      font-size: 16px;
    }
  }

  .unit {
		// pushes log button over the border
    min-width: calc(30% + 0px);
    min-height: 56px;

    display: flex;
    align-items: center;
    flex-direction: row;

    select {
      background: none;
      outline: none;
      border: none;

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

export const CreateButton = styled.button`
  min-width: 35%;
  height: 56px;

  background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
  border: 1px solid #1E854A;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5F6E3;
`;
