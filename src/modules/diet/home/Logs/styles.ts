import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
  padding-bottom: 16px;
	margin-bottom: 16px;
  // border-radius: 6px;
  background: #181A1B;
	border-top: 1px solid var(--stroke-color);
	border-bottom: 1px solid var(--stroke-color);

  display: flex;
  flex-direction: column;

  .add-log {
		z-index: 2;
    padding: 16px 16px 0 0;
    align-self: flex-end;

    button {
      /* background: linear-gradient(113.21deg, rgba(39, 174, 96, 1) 0%, rgba(39, 174, 96, 0.5) 100%); */
			background: none;
			border: none;
			outline: none;
			padding: 4px 8px;
			border-radius: 6px;
      font-size: 13px;
      opacity: 1;
      font-weight: 600;
			color: var(--high-emphasis);
      /* color: ${darken(0.1, '#D5F6E3')}; */

      text-decoration: none;
    }
  }

	canvas {
		opacity: 0.5;
		position: absolute;
		bottom: 0;
		max-height: 50px;
		max-width: 100vw;
	}
`;
