import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Header = styled.header`
  padding: 21px 14px 28px;
`;

export const Foods = styled.div`
  height: 74vh;
  padding-top: 8px;
  border-radius: 6px;
  background: #181A1B;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
`;

export const Food = styled.div`
  height: 64px;
  border-bottom: 1px solid #222425;
  padding: 4px 0 0 0;

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

  h6 {
    position: absolute;
    font-weight: 400;
    opacity: 0.5;
    margin-top: -8px;
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
  margin-bottom: 24px;

  position: relative;
  z-index: 3;

  background-color: #181A1B;
  border-radius: 6px;

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  .search {
    width: 65%;
    height: 56px;
    border-radius: 6px;
    background: linear-gradient(92.01deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 62.45%), #181A1B;
  
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

export const CreateButton = styled.button`
  width: 35%;
  height: 56px;

  background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
  border: 1px solid #1E854A;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5F6E3;
`;