import { useState, useEffect } from "react";
import styled from "styled-components";

const CaroselColumn = styled.div`
display: flex;
flex-direction: column;
padding-left: 2rem;
width: 29vw;
position: relative;
`

const CaroselSlideContainer = styled.ul`
padding: 0;
`

const CaroselHeader = styled.p`
text-decoration: underline;
font-weight: 700;
`

const CaroselText = styled.p`

`

const CaroselSlide = styled.li<{ active: boolean }>`
  list-style: none;
  display: ${({active}) => active ? "unset" : "none"};
`

const CaroselNav = styled.div`
display: flex;
flex-direction: row;
margin-top: auto;
`

const CNavItem = styled.div<{ active: boolean }>`
height: 10px;
width: 60px;
margin: 2rem 1rem;
background-color: ${({theme, active}) => active ? theme.colors.primary : theme.colors.octenary};
`

const CNavArrow = styled.button`
background: none;
border-left: none;
border-bottom: none;
width: 25px;
height: 25px;
transform: rotate(45deg);
border-radius: 2px;
position: absolute;
border-top: 2px solid ${({theme}) => theme.colors.octenary};
border-right: 2px solid ${({theme}) => theme.colors.octenary};
top: 28%;
right: -3%;
&:hover{
  border-top: 2px solid ${({theme}) => theme.colors.primary};
  border-right: 2px solid ${({theme}) => theme.colors.primary};
}
`

const CardCarousel = (props: {difficulties: string; solution: string; features: string;}) => {
 
    const [clearAutoScroll, setClearAutoScroll] = useState(false)
    const [slideOne, setSlideOne] = useState(true)
    const [slideTwo, setSlideTwo] = useState(false)
    const [slideThree, setSlideThree] = useState(false)
    const [currentSlide, setCurrentSlide] = useState<number>(1)

    const { difficulties, solution, features } = props
    function updateSlide(id: number): void {
        switch(id){
          case 1:
            setCurrentSlide(1)
            setSlideOne(true)
            setSlideTwo(false)
            setSlideThree(false)
            break;
          case 2:
            setCurrentSlide(2)
            setSlideOne(false)
            setSlideTwo(true)
            setSlideThree(false)
            break;
          case 3:
            setCurrentSlide(3)
            setSlideOne(false)
            setSlideTwo(false)
            setSlideThree(true)
            break;
          default: 
            setCurrentSlide(1)
            setSlideOne(true)
            setSlideTwo(false)
            setSlideThree(false)
            break;
        }
      }
    
      useEffect(() => {
        let timer 
        if (!clearAutoScroll){
          timer = setInterval(() => {
            updateSlide(currentSlide + 1)
          }, 3000)
        } else {
          timer = setInterval(() => {
            updateSlide(currentSlide + 1)
            setClearAutoScroll(false)
          }, 10000) 
        }
        return () => clearInterval(timer);
      },[currentSlide])

    return (
        <CaroselColumn>
        <CaroselSlideContainer>
          <CaroselSlide active={slideOne}>
            <CaroselHeader>
              Project Difficulties
            </CaroselHeader>
            <CaroselText>{difficulties}</CaroselText>
          </CaroselSlide>
          <CaroselSlide active={slideTwo}>
            <CaroselHeader>
              Solution
            </CaroselHeader>
            <CaroselText>{solution}</CaroselText>
          </CaroselSlide>
          <CaroselSlide active={slideThree}>
            <CaroselHeader>
              Features
            </CaroselHeader>
            <CaroselText>{features}</CaroselText>
          </CaroselSlide>
        </CaroselSlideContainer>
        <CaroselNav>
          <CNavItem active={slideOne} onClick={(e) => {updateSlide(1); setClearAutoScroll(true)}}></CNavItem>
          <CNavItem active={slideTwo} onClick={(e) => {updateSlide(2); setClearAutoScroll(true)}}></CNavItem>
          <CNavItem active={slideThree} onClick={(e) => {updateSlide(3); setClearAutoScroll(true)}}></CNavItem>
          <CNavArrow onClick={() => {updateSlide(currentSlide + 1); setClearAutoScroll(true)}}></CNavArrow>
        </CaroselNav>
      </CaroselColumn>
    )
}

export default CardCarousel;