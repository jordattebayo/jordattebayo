import styled from "styled-components";
import { Layout } from "../components"
import Head from "next/head";

const H1 = styled.h1`
    color: ${(props) => props.theme.colors.primary};
`

const Center = styled.div`
    width: 100%;
    height: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.primary};
`

export default function NotFound({ setSelectedTheme }) {
    return (
    <>    
    <Head>
        <title>
            About me
        </title>
        <meta property="og:title" content="About Jordan Booker" />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
        <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
    </Head>
    <Layout updateTheme={setSelectedTheme}> 
        <H1>404 - Page Not Found</H1>
        <Center>
            <p>┻━┻ ︵ ¯\ &#40;ツ&#41;/¯ ︵ ┻━┻</p>
        </Center>
    </Layout>
    </>
    )
  }