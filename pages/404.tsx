import styled from "styled-components";
import { Layout } from "../components"

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

export default function NotFound() {
    return (
    <Layout> 
        <H1>404 - Page Not Found</H1>
        <Center>
            <p>┻━┻ ︵ ¯\ &#40;ツ&#41;/¯ ︵ ┻━┻</p>
        </Center>
    </Layout>
    )
  }