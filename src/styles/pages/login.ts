import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 30vh;
`;

export const LoginContainer = styled.main`
  flex: 1;
  margin: 0 16px;
  padding: 0 16px 24px;


  display: flex;
  flex-direction: column;

  background: #181A1B;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: 1px solid #222425;

  h2 {
    padding: 17px 0 0;
  }

  h5 {
    padding-top: 12px;
    align-self: flex-end;
    opacity: 0.5;
  }

  > div {
    position: relative;
    padding-top: 24px;
  }
`;

export const CreateAccount = styled.aside`
  margin: 24px 16px 0;

  box-shadow: 0px 4px 24px rgba(39, 174, 96, 0.25);
`;
