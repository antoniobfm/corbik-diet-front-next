import styled from 'styled-components';
import { FiTrash } from 'react-icons/fi';

export const Container = styled.div`
  .delete {
    width: 100px;
    margin: auto;
    button {
      width: 100px;
      height: 64px;
      background: none;
      outline: none;
      border: none;

      svg {
        color: white;
        opacity: 0.5;
      }
    }
  }
`;

export const EditButton = styled.button`
  width: 35%;
  height: 56px;

  background: linear-gradient(111.07deg, #F2C94C 0%, rgba(242, 201, 76, 0.5) 100%), #181A1B;
  border: 1px solid #F2C94C;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #FDF8E7;
`;

export const Icon = styled(FiTrash)`
  width: 18px;
  height: 18px;

  opacity: 0.5;
`;

export const StaticMenu = styled.div`
  position: absolute;
  bottom: 0;
  background-color: red;
  height: 56px;
  margin: 24px 16px;
  width: calc(100% - 32px);

  background-color: #181A1B;
  border-radius: 6px;

  > div {
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
  }
`;

export const ConfirmDeletion = styled.div`
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

  > button {
    flex: 1;
    width: 100%; 
    background: transparent;
    outline: none;
    border: none;
  }

  > div {
    background: #0A0A0B;
    border: 1px solid #222425;
    box-sizing: border-box;
    border-radius: 6px;

    width: 90vw;

    padding: 14px 16px;

    h2 {
      text-align: center;
      padding-bottom: 30px;
    }
    
    > div {
      flex: 1;
      display: flex;
      justify-content: space-between;
  
      .button--cancel {
        flex: 1;
        height: 54px;
        background: none;
        outline: none;
        border: none;
        color: #FFFFFF; 
      }

      .button--confirm--deletion {
        flex: 1;
        height: 54px;
        background: linear-gradient(111.07deg, #EB5757 0%, rgba(235, 87, 87, 0.5) 100%), #0A0A0B;
        border: 1px solid #EB5757;
        border-radius: 6px;
        color: #FAD1D1;
      }

    }
  }
`;