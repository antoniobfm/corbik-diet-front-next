import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */

  }
  body {
    background: #0A0A0B;
    color: rgba(255, 255, 255, 0.95);
    font-family: Poppins, Arial, Helvetica, sans-serif;

		::-webkit-scrollbar {
			display: none;
		}
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

	@keyframes breath-animation {
 0% { box-shadow: 0px 0px 4px #27AE60, 0px 0px 26px #27AE60; }
 30% { box-shadow: 0px 0px 8px #27AE60, 0px 0px 46px #27AE60; }
 40% { box-shadow: 0px 0px 6px #27AE60, 0px 0px 46px #27AE60;; }
 100% { box-shadow: 0px 0px 4px #27AE60, 0px 0px 26px #27AE60; }
}

	:root {
		font-size: 14px;

		--carbs-color: #EB5757;
		--protein-color: #2D9CDB;
		--fat-color: #F2C94C;
		--primary-color: aqua green;

		--corbik-green: #27AE60;

		--high-emphasis: #DEDEDE;
		--medium-emphasis: #999999;
		--low-emphasis: #616161;
		--disabled-color: #333333;

		--stroke-color: #222425;

		--zero-level-black: #0A0A0B;
		--first-level-black: #181A1B;
		--second-level-black: #222426;
	}

  h1 {
    font-size: 1.999rem;
  }

  h2 {
    font-size: 2.827rem;
  }

  h3 {
    font-size: 1.414rem;
  }

  p {
    font-size: 1rem;
    line-height: 17px;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 0.707rem;
  }

  a {
    color: var(--high-emphasis);
    text-decoration: none;
  }

  button {
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
	body:not(.user-is-tabbing) button:focus,
	body:not(.user-is-tabbing) input:focus,
	body:not(.user-is-tabbing) select:focus,
	body:not(.user-is-tabbing) textarea:focus {
		outline: none;
	}
  input[type="datetime-local"] {
    color: var(--high-emphasis);
    border: none;
    outline: none;
    font-size: 16px;
    padding: 16px;
    background-color: transparent;
    appearance: none;
  }

  .form__two__columns {
		width: 100%;
    display: flex;
    flex-direction: row;
		justify-content: space-between;

		div {
			:first-child {
				margin-right: 4px;
			}
			:nth-child(2) {
				margin-left: 4px;
			}
		}

    .form__field__container {
      :first-child {
        margin-right: 8px;
      }
    }

  }

  .form__three__columns {
		width: 100%;
    display: flex;
    flex-direction: row;

		div {
			:first-child {
				margin-right: 4px;
			}
			:nth-child(2) {
				margin-left: 4px;
				margin-right: 4px;
			}
			:nth-child(3) {
				margin-left: 4px;
			}
		}
  }

	.form__four__columns {
		width: 100%;
		display: flex;
		flex-direction: row;

		div {
			:first-child {
				margin-right: 4px;
			}
			:nth-child(2) {
				margin-left: 4px;
				margin-right: 4px;
			}
			:nth-child(3) {
				margin-left: 4px;
				margin-right: 4px;
			}
			:nth-child(4) {
				margin-left: 4px;
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

			color: var(--high-emphasis);

      :focus {
        ~ label {
    			color: var(--high-emphasis);
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
