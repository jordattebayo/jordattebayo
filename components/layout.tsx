import { Navbar, Footer } from ".";
import styled from "styled-components"
import ErrorBoundary from "./error-boundary";
import ThemeShape from "./theme-shape"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`

export default function Layout(props) {
  return (
    <AppWrapper>
        <Navbar />
        <ThemeShape />
        <ErrorBoundary>
            {props.children}
        </ErrorBoundary>
      <Footer />
    </AppWrapper>
  );
}

