import styled from "styled-components"
import { BlogNavbar, BlogThemeShape, StickyFooter, BlogNav } from ".";
import Modal from "./dialog";
import ErrorBoundary from "./error-boundary";

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
  background-color:${(props) => props.theme.colors.senary};
  width: 100vw;
  max-width: 100%;
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
      <BlogNavbar />
      <Modal />
      <BlogThemeShape />
      <BlogNav />
      <Wrapper>
        <Content>
          <ErrorBoundary>
            {props.children}
          </ErrorBoundary>
        </Content>
      </Wrapper>
      <StickyFooter></StickyFooter>
      <BlogThemeShape bottomAligned/>
    </AppWrapper>
  );
}

