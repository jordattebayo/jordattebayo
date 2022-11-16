import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 330px;
    width: 100vw;
    max-width: ${(props) => props.theme.widths.desktop};
    padding: 2rem;
`

export {
    Content,
    Wrapper
};