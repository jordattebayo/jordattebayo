import styled from "styled-components"
import { Navbar, Footer } from ".";
import ErrorBoundary from "./error-boundary";
import ThemeShape from "./theme-shape"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
`

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

export default function BlogLayout(props) {
  return (
    <AppWrapper>
      <Navbar />
      <ThemeShape />
      <Wrapper>
        <Content>
          <ErrorBoundary>
            {props.children}
          </ErrorBoundary>
        </Content>
      </Wrapper>
      <Footer />
    </AppWrapper>
  );
}

