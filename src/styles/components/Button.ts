import styled from 'styled-components';
import { shade } from 'polished';

export const DisabledStyle = styled.button`
	width: 82%;
	height: 56px;

	background: linear-gradient(111.07deg, rgba(255, 255, 255, 0.03) 0%, rgba(24, 26, 27, 0) 100%), #181A1B;
	border: 1px solid #222425;
	border-radius: 6px;

	font-size: 12px;
	font-weight: 600;
	color: #8C8D8E;

	&:hover {
		/* background: ${shade(0.2, '#8C8D8E')}; */
	}
`;

export const GreenStyle = styled.button`
	width: 82%;
	height: 56px;

	background: linear-gradient(111.07deg, #27AE60 0%, rgba(39, 174, 96, 0.5) 100%), #181A1B;
	border: 1px solid #1E854A;
	border-radius: 6px;

	font-size: 12px;
	font-weight: 600;
	color: #D5F6E3;

	&:hover {
		/* background: ${shade(0.2, '#D5F6E3')}; */
	}
`;

export const RedStyle = styled.button`
	width: 82%;
	height: 56px;

	background: linear-gradient(111.07deg, #EB5757 0%, rgba(235, 87, 87, 0.5) 100%), #0A0A0B;
	border: 1px solid #EB5757;
	border-radius: 6px;

	font-size: 12px;
	font-weight: 600;
	color: #FAD1D1;

	&:hover {
		/* background: ${shade(0.2, '#EB5757')}; */
	}
`;

export const YellowStyle = styled.button`
	width: 82%;
	height: 56px;

  background: linear-gradient(111.07deg, #F2C94C 0%, rgba(242, 201, 76, 0.5) 100%), #181A1B;
  border: 1px solid #F2C94C;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #FDF8E7;

	&:hover {
		/* background: ${shade(0.2, '#F2C94C')}; */
	}
`;

export const BlueStyle = styled.button`
	width: 82%;
	height: 56px;

  background: linear-gradient(111.07deg, #2755AE 0%, rgba(39, 84, 174, 0.5) 100%), #181A1B;
	border: 1px solid #1E4085;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;
  color: #D5E0F6;

	&:hover {
		/* background: ${shade(0.2, '#1E4085')}; */
	}
`;
