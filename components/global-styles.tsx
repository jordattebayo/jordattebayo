import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body {
        color: ${({ theme }) => theme.colors.primary};
        padding: 0;
        margin: 0;
        font-family: ${(props) => props.theme.fonts.primary};
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

    p:has(img) {
        display: flex;
        justify-content: center;
    };

    @media only screen and (max-width: 680px){

    };
`;

export default GlobalStyle