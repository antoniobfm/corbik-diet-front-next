import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;


  --carbs-color: #EB5757;
  --protein-color: #2D9CDB;
  --fat-color: #F2C94C;
  }
  body {
    background: #0A0A0B;
    color: rgba(255, 255, 255, 0.95);
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }

  .blurred__background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;

    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    h1 {
      text-align: center;
    }
  }

  h1 {
    font-size: 31px;
  }

  h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 16px;
    line-height: 17px;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 13px;
  }

  h6 {
    font-size: 9px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  button {
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }

  input[type="datetime-local"] {
    color: #f2f2f2;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 16px;
    background-color: transparent;
    appearance: none;
  }

  .form__quantity {
    display: flex;
    flex-direction: row;

    .form__field__container {
      :first-child {
        margin-right: 8px;
      }
    }

  }

  .form__macros {
    display: flex;
    flex-direction: row;

    .macro {
      :nth-child(2) {
      margin: 0 8px;
    }
    }
  }

  .form__field__container {
    height: 56px;
    border-radius: 6px;

    display: flex;
    flex-direction: row;

    position: relative;
    padding: 0 16px;
    margin-bottom: 16px;

    border: 1px solid #222425;

    input {
      width: 100%;

      font-size: 18px;
      font-weight: 400;
      background-color: transparent;
      border: none;
      outline: none;

      color: white;

      :focus {
        ~ label {
          color: white;
        }
      }
    }

    label {
      top: -7px;
      position: absolute;
      background-color: #181A1B;
      padding: 0 10px;
      margin-left: -10px;

      font-size: 9px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);

      transition: 0.2s;
    }
  }
`;
