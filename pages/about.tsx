import { ContactButton, Layout } from "../components";
import { Wrapper, Content } from "../components/shared";
import styled from "styled-components"
import Head from "next/head";

const AboutWrapper =styled(Wrapper)`
  background-color: ${({theme}) => theme.colors.senary};
`

const ExplainContainer = styled.div`
  margin: 0 auto;
  max-width: 850px;
`

const LongWindedExplaination = styled.p`
  margin: clamp(15px, 2rem, 25px) 0;
  font-size: clamp(20px, 1.5vw, 22px);
  line-height: clamp(22px, 2vw, 30px);
  color: ${({theme}) => theme.colors.primary};
`

export default function About({ setSelectedTheme }) {

  return (
    <>
    <Head>
      <title>
        About me
      </title>
      <meta property="og:title" content="About Jordan Booker" key="title" />
    </Head>
    <Layout updateTheme={setSelectedTheme}>
      <AboutWrapper>
        <Content >
          <ExplainContainer>
          <LongWindedExplaination>
            I am Frontend Web Developer with Full Stack dreams. I love so much
            about the web and want to do my best in building it out further into
            the unknown.
            </LongWindedExplaination>
            <LongWindedExplaination>
            My objective is to create thoughtful, long lasting, and inclusive web
            applications that help users share knowledge. If you have questions or
            would like to learn more about me, please reach out!
          </LongWindedExplaination>
          <ContactButton />
          </ExplainContainer>
        </Content>
      </AboutWrapper>
    </Layout>
    </>
  );
}
