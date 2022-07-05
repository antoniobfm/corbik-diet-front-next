import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
	padding: 16px 14px 0px;
	margin-bottom: 16px;
	height: 42px;

	display: flex;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

  #diet--home--change--date {
		flex: 1;
		min-width: 50%;
		height: 100%;
    background: none;
    outline: none;
    border: none;
		text-align: left;
    color: var(--high-emphasis);
    font-size: 2rem;
    font-weight: 600;
		letter-spacing: calc(1.999rem / 100 * 3 * -1);
  }

	#diet--home--settings--button {
		flex: 1;
		height: 100%;
		background: none;
		outline: none;
		border: none;
		text-align: right;
		color: var(--low-emphasis);

		font-family: "Poppins";
		font-weight: 600;
		font-size: 1.125rem;
	}
`;
