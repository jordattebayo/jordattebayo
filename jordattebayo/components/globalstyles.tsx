import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body {
        color: ${({ theme }) => theme.colors.primary};
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    };
    a {
        color: inherit;
        text-decoration: none;
    };
    * {
        box-sizing: border-box;
    };

    a {
        text-decoration: none;
        outline: none;
    };


    button {
        outline: none;
    };

    img {
        max-width: 100%;
        display: block;
    };

    input {
        color: white;
    };

    .layout-style {
        display: grid;
        grid-template-areas: "nav" "main" "footer";
        position: relative;
        min-height: 100vh;
    };


    .mainB {
        grid-area: main;
    };

    .hero-container {
        margin: 0 10%;
        margin-bottom: 25px;
    };

    .hero-heading {
        font-family: var(--hd-font);
        font-size: 130px;
        font-style: normal;
        font-weight: bold;
        letter-spacing: -6.5px;
        line-height: 130px;
        text-transform: none;
        color: var(--color-secondary);
        margin-top: 25px;
    };


    .hero-subheading--container {
        margin: auto;
    };

    .hero-subheading {
        font-family: var(--main-font);
        font-size: 24px;
        font-style: normal;
        font-weight: normal;
        letter-spacing: normal;
        line-height: 35px;
        text-transform: none;
        color: var(--primary-color);
        margin: auto;
        margin-bottom: 40px;
        max-width: 700px;
    };

    .hide {
        display: none;
    };

    .altText {
        color: var(--color-tertiary);
        font-family: var(--main-font);
        font-size: 24px;
        font-style: normal;
        font-weight: normal;
        letter-spacing: normal;
        line-height: 35px;
        text-transform: none;
        margin: auto;
        margin-bottom: 40px;
        max-width: 700px;
    };

    @media only screen and (max-width: 680px){
        .hero-heading {
            font-size: 65px;
            letter-spacing: -3.5px;
            line-height: 65px;
        };
        .hero-subheading{
            font-size: 16px;
            line-height: 25px;
        };
    };
`;

export default GlobalStyle