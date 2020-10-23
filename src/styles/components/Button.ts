import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.button`
  width: 82%;
  height: 56px;

  background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
  border: 1px solid #1E854A;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5F6E3;

	&:hover {
		background: shade(0.2, '#27AE60');
	}
`;
