import { Navbar, Footer } from ".";
import styled from "styled-components"
import ErrorBoundary from "./error-boundary";
import ThemeShape from "./theme-shape"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
`

export default function Layout({updateTheme , ...props}) {
  return (
    <AppWrapper>
        <Navbar updateTheme={updateTheme}  />
        <ThemeShape />
        <ErrorBoundary>
            {props.children}
        </ErrorBoundary>
      <Footer />
    </AppWrapper>
  );
}

