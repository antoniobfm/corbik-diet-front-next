import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 24px;
    padding: 17px 16px 56px;
    border-radius: 6px;
    background: #181A1B;

    display: flex;
    flex-direction: column;

    h3 {
      padding-bottom: 24px;
    }
  }

  > button {
    align-self: center;
    background: none;
    border: none;
    outline: none;

    color: #f2f2f2;
    opacity: 0.5;
    font-family: Poppins;
    padding-bottom: 40px;
  }
`;
