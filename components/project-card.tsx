import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import amplifier from '../public/assets/projects/amplifierScreenshot.png';
import blog from "../public/assets/projects/blogScreenshot.jpg";
import chart from "../public/assets/projects/chartScreenshot.png";
import lee from "../public/assets/projects/desktopLeeIndigoodMock.png"
import travel from "../public/assets/projects/travel-app.gif"
import news from "../public/assets/projects/languageScreenshot.jpg"

interface BoxProps {
  image?: any;
  open: boolean;
}

interface RoleProps {
  open: boolean;
}

interface ButtonProps {
  open: boolean;
}

const Wrapper = styled.li`
  position: relative;
`

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({open}) => open ? "center" : "start"};
  margin: 2em 0;
  height: ${({open}) => open ? "clamp(400px, 80vw, 1044px)" : "clamp(200px, 40vw, 522px)"};
  width: ${({open}) => open ? "clamp(400px, 80vw, 1044px)" : "clamp(250px, 48vw, 626px)"};
  box-shadow: -16px 16px ${(props) => props.theme.colors.quaternary};
  padding: 2em;
  background-color: ${(props) => props.theme.colors.senary};
  transition: height 0.25s, width 0.25s, box-shadow 0.25s;
  &:hover {
    box-shadow: 16px -16px ${(props) => props.theme.colors.septenary};
    cursor: ${({open}) => open ? "unset" : "pointer"};
  }
`

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  position: relative;
` 
const RoleCircle = styled.div<RoleProps>`
  display: ${({open}) => open ? "none" : "flex"};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 175px;
  height: 175px;
  background-color: ${(props) => props.theme.colors.quaternary};
  transition: background-color 0.25s;
  ${Box}:hover &{
    background-color: ${(props) => props.theme.colors.septenary};
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 686px;
  height: 514px;
  border: 3px solid ${(props) => props.theme.colors.primary};
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: -16px 16px ${(props) => props.theme.colors.septenary};
  border: 1px solid ${(props) => props.theme.colors.primary};
`

const RoleText = styled.p`
  font-size: 32px;
  color: ${(props) => props.theme.colors.senary};
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
`

const H3 = styled.h3`
  font-size: 48px;
  max-width: 300px;
  text-decoration: underline;
  margin-bottom: 1rem;
  color:  ${(props) => props.theme.colors.primary};
  ${Box}:hover & {

  }
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
`

const TechColumn = styled.div`
  text-align: center;
  border-right: 1px solid ${({theme}) => theme.colors.primary};
  padding: 0 3rem;
`

const TechHeader = styled.p`
  text-decoration: underline;
  font-weight: 700;
`

const TechList = styled.ul`
  margin: 0;
  padding: 0;
`

const TechListItem = styled.li`
  list-style: none;
`

const TechText = styled.p`
  text-decoration: none;
  margin: .5rem;
`

const CaroselColumn = styled.ul`
  padding-left: 2rem;
`

const CaroselHeader = styled.p`
  text-decoration: underline;
  font-weight: 700;
`

const CaroselText = styled.p`
  
`

const ToggleDetails = styled.button<ButtonProps>`
  font-size: 20px;
  background: none;
  border: none;
  align-self: flex-end;
  margin-top: auto;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  ${Box}:hover & {
    cursor: ${({open}) => open ? "unset" : "pointer"};
    text-decoration: ${({open}) => open ? "unset" : "underline"};
  }

`
interface CNavProps {
  active: boolean;
}

const CaroselSlide = styled.li<CNavProps>`
  list-style: none;
  display: ${({active}) => active ? "unset" : "none"};
`

const CaroselNav = styled.div`
  display: flex;
  flex-direction: row;

`

const CNavItem = styled.div<CNavProps>`
  height: 10px;
  width: 60px;
  margin: 2rem 1rem;
  background-color: ${({theme, active}) => active ? theme.colors.primary : theme.colors.octenary};
`

function matchPhotoSource(id: string): StaticImageData{
  switch(id){
    case "0":
      return amplifier;
    case "1":
      return chart;
    case "2":
        return travel;
    case "3":
        return lee;
    case "4":
      return news;
    case "5":
      return blog;
    default: 
      return amplifier;
  }
}

function CreateTechList(tech: string){
  const techArray = tech.split(",")
  return (
    <TechList>{techArray.map((item, index) => {
      return (
        <TechListItem key={index}>
          <TechText>{item}</TechText>
        </TechListItem>
      )
    })}</TechList>
  )
}

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}

function checkActive(id): boolean{
  let active;
  switch(id){
    case 0:
      active = false
      break;
    case 2:
      active = true
      break;
    case 3:
      active = false
    default: 
      active = false
      break;
  }
  return active;
}

export default function ProjectCard ({ data }) {
  const { id, title, image, role, difficulties, solution, features, tech, live, git,  } = data

  const ref = useRef();
  useOnClickOutside(ref, () => setViewDetails(false));

  const [viewDetails, setViewDetails] = useState(false)
  const [slideOne, setSlideOne] = useState(true)
  const [slideTwo, setSlideTwo] = useState(false)
  const [slideThree, setSlideThree] = useState(false)

  function toggleDetails(): void{
    if(!viewDetails){
      setViewDetails(!viewDetails)
    }
  }

  function updateSlide(id: number): void {
    switch(id){
      case 1:
        setSlideOne(true)
        setSlideTwo(false)
        setSlideThree(false)
        break;
      case 2:
        setSlideOne(false)
        setSlideTwo(true)
        setSlideThree(false)
        break;
      case 3:
        setSlideOne(false)
        setSlideTwo(false)
        setSlideThree(true)
        break;
      default: 
        setSlideOne(true)
        setSlideTwo(false)
        setSlideThree(false)
        break;
    }
  }

  return (
    <Wrapper>
        <Box onClick={() => toggleDetails()} open={viewDetails} ref={ref}>
           <CardContentWrapper>
           <H3>{title}</H3>
           {viewDetails &&
           <ImageWrapper>
           <ImageContainer>
           <Image 
            placeholder={title}
            src={matchPhotoSource(id)} 
            alt={image.placeholder} 
            height={image.dimensions.height}
            width={image.dimensions.width}
            />
           </ImageContainer>
           </ImageWrapper>
           }
           <RoleCircle open={viewDetails}>
              <RoleText open={viewDetails}>
                {role}
              </RoleText>
           </RoleCircle>
           {viewDetails && 
           <Details>
            <TechColumn>
              <TechHeader>Tech:</TechHeader>
              {CreateTechList(tech)}
            </TechColumn>
            <CaroselColumn>
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
              <CaroselNav>
                <CNavItem active={slideOne} onClick={(e) => {updateSlide(1)}}></CNavItem>
                <CNavItem active={slideTwo} onClick={(e) => {updateSlide(2)}}></CNavItem>
                <CNavItem active={slideThree} onClick={(e) => {updateSlide(3)}}></CNavItem>
              </CaroselNav>
            </CaroselColumn>
           </Details>
           }
           </CardContentWrapper>

           <ToggleDetails open={viewDetails} onClick={() => setViewDetails(!viewDetails)}>
              { viewDetails ? "Hide Details -" : "See Details +"}
           </ToggleDetails>
        </Box>
    </Wrapper>

  );
}

