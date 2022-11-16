import { useState, useEffect } from "react"
import styled from "styled-components";


const Intro = styled.p`
    max-width: 850px;
`

function greet(time): string{
    switch(true){
        case (time < 12):
            return "Good morning";
        case (time < 18 && time >= 12):
            return "Afternoon";
        case (time >= 18):
            return "Good evening";
        default:
            return "Hello"
    }
}

function Hero(){
    const [date, setDate] = useState<number>()

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
        <>
            <h2>{greet(date)},</h2>
            <Intro>My name is Jordan, I'm a Frontend Web Developer. My big dream is to create thoughtful, inclusive, and durable web applications that help people. Feel free to check out some of my projects I've made below.</Intro>
        </>
    )
}

export default Hero