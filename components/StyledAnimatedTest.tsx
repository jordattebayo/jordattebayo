import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { useState } from "react"

//This is the cleanest pattern for using react-spring with styled-components

const NewWrapper = (props) => {

    const wrapperStyles = useSpring({
      loop: true, 
      to: [
      {opacity: 1},
      {opacity: 0}
    ], 
    from: {opacity: 0},
    config: { mass: 1, tension: 280, friction: 120, precision: .1 },
  })
  
    return (
      <animated.div style={{...wrapperStyles, ...props.otherStyles}}>
        {props.children}
      </animated.div>
    )
} 

const Text = styled.p`
  font-size: 20px;
  color: red;
`

  export default function StyledAnimatedTest(){
    return (
        <NewWrapper otherStyles={{ height: "10vw", width: "10vw", backgroundColor: "#000" }}>
          <Text>Some text here</Text>
        </NewWrapper>
    )
  }
  