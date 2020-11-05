import { FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
  padding: 21px 14px 28px;
`;

export const FormContainer = styled.div`
  padding: 24px 16px 56px;
  border-radius: 6px;
  background: #181A1B;

  display: flex;
  flex-direction: column;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 6px;

  background: linear-gradient(91.23deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 100%), #181A1B;

  .back {
    width: 18%;

    .icon {
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Icon = styled(FiChevronLeft)`
  width: 18px;
  height: 18px;

  opacity: 0.5;
`;

export const CreateButton = styled.button`
  width: 82%;
  height: 56px;

  background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
  border: 1px solid #1E854A;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5F6E3;
`;
