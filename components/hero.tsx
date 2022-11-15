import { useState, useEffect } from "react"


function greet(time): string{
    console.log(time)
    switch(true){
        case (time < 12):
            return "Good morning";
        case (time < 18 && time >= 12):
            return "Afternoon";
        case (time >= 18):
            console.log("good evening should be returned")
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
        <div>
            <h2>{greet(date)},</h2>
            <p>My name is Jordan, I'm a Frontend Web Developer. My big dream is to create thoughtful, inclusive, and durable web applications that help people. Feel free to check out some of my projects I've made below.</p>
        </div>
    )
}

export default Hero