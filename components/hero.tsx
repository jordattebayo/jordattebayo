import { useState, useEffect, useContext  } from "react"
import styled, { ThemeContext  } from "styled-components";
import { Wrapper, Content } from "./shared";
import { themeTwo } from "../pages/_app"

const HomeContent= styled(Content)`
    width: 100%;
    min-height: 38vh;
    max-width: 900px;
    @media(max-width: ${(props) => props.theme.widths.tablet}) {
        min-height: fit-content;
        overflow: hidden;
  }
`

const H2 = styled.h2`
  font-size: clamp(20px, 3vw, 48px);
  margin-bottom: 0;
  color:  ${(props) => props.theme.colors.secondary};
`
const Intro = styled.p`
    max-width: 850px;
    font-size: clamp(20px, 1.5vw, 22px);
    line-height: clamp(22px, 2vw, 30px);
`

function greet(time): string{
    switch(true){
        case (time < 12):
            return "Morning";
        case (time < 18 && time >= 12):
            return "Afternoon";
        case (time >= 18):
            return "Evening";
        default:
            return "Hello"
    }
}

function Hero({ updateTheme }){
    const [date, setDate] = useState<number>()

    const themeContext = useContext(ThemeContext)
    
    useEffect(() => {
        if(!date) {
            const currentTime = new Date().getHours()
            setDate(currentTime)
        }
        () => {
            setDate(null)
        }
    },[])

    return (
        <Wrapper>
            <HomeContent>
                <H2>{greet(date)},</H2>
                <Intro>My name is Jordan, I'm a Frontend Web Developer. My big dream is to create thoughtful, inclusive, and durable web applications that help people. Feel free to check out some of my projects I've made below.</Intro>
                {/* <button onClick={() => {updateTheme(); console.log("theme context: ", themeContext)}}>Change theme</button> */}
            </HomeContent>
        </Wrapper>

    )
}

export default Hero