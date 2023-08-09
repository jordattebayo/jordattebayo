import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import styled, { DefaultTheme } from "styled-components";
import amplifier from '../public/assets/projects/amplifierScreenshot.png';
import blog from "../public/assets/projects/blogScreenshot.jpg";
import chart from "../public/assets/projects/chartScreenshot.png";
import lee from "../public/assets/projects/desktopLeeIndigoodMock.png";
import travel from "../public/assets/projects/travel-app.gif";
import news from "../public/assets/projects/languageScreenshot.jpg";
import CardCarousel from './card-carousel';


interface ImageContainerProps {
  maxWidth: string;
  maxHeight: string;
  id: string;
}

const Wrapper = styled.li`
  position: relative;
`

const Box = styled.div<{ open: boolean, id: string}>`
  display: flex;
  flex-direction: column;
  align-items: ${({open}) => open ? "center" : "start"};
  margin: 2em 0;
  height: ${({open}) => open ? "clamp(400px, 80vw, auto)" : "clamp(200px, 40vw, 522px)"};
  width: ${({open}) => open ? "clamp(300px, 80vw, 1044px)" : "clamp(250px, 48vw, 626px)"};
  box-shadow: -16px 16px ${(props) => choosePrimaryColor(props.id, props.theme)};
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.senary};
  transition: height 0.25s, width 0.25s, box-shadow 0.25s;
  &:hover {
    box-shadow: 16px -16px ${(props) => (chooseSecondaryColor(props.id, props.theme))};
    cursor: ${({open}) => open ? "unset" : "pointer"};
  }
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding: 1rem;
    &:hover {
    box-shadow: -16px 16px ${(props) => (chooseSecondaryColor(props.id, props.theme))};
  } 
  }

`

const CardContentWrapper = styled.div<{ open: boolean}>`
  display: flex;
  flex-direction: column;
  width: clamp(100px, 100%, 686px);
  position: relative;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding: 0;
  }
` 

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`

const CardLinkContainer = styled(CardHeader)`
  justify-content: normal;
`

const CardLinks = styled.a<{strikethrough: boolean}>`
  font-size: clamp(18px, 2vw, 24px);
  text-decoration: ${({strikethrough}) => strikethrough ? "" : "line-through"};
`

const CardLinkSeperator = styled.p`
  font-size: clamp(18px, 2vw, 24px);
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    margin: 0;
  }
`

const RoleCircle = styled.div<{ open: boolean, id: string}>`
  display: ${({open}) => open ? "none" : "flex"};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 175px;
  height: 175px;
  background-color: ${(props) => choosePrimaryColor(props.id, props.theme)};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: none;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(300px, 100%, 686px);
  height: 514px;
  border: 3px solid ${(props) => props.theme.colors.primary};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    display: none;
  }
`

const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  box-shadow: -16px 16px ${(props) => choosePrimaryColor(props.id, props.theme)};
  border: 1px solid ${(props) => props.theme.colors.primary};
  width: ${({maxWidth}) => `clamp(100px, 100%, ${maxWidth}px)`};
  height: ${({maxHeight}) => `clamp(200px, 100%, ${maxHeight}px)`};
  position: relative;

`

const RoleText = styled.p`
  font-size: 32px;
  color: ${(props) => props.theme.colors.senary};
`

const H3 = styled.h3`
  font-size: clamp(20px, 3vw, 48px);
  max-width: clamp(200px, 50vw, 300px);
  text-decoration: underline;
  margin-bottom: 1rem;
  color:  ${(props) => props.theme.colors.primary};
  ${Box}:hover & {

  }
`

const DesktopDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: none;
  }
`
const MobileDetails = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: flex;
  }
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


const ToggleDetails = styled.button<{ open: boolean}>`
  font-size: clamp(16px, 2vw, 20px);
  background: none;
  border: none;
  align-self: flex-end;
  margin-top: auto;
  color: ${({theme}) => theme.colors.primary};
  &:hover{
    cursor: pointer !important;
    text-decoration: underline !important;
  }
  ${Box}:hover & {
    cursor: ${({open}) => open ? "unset" : "pointer"};
    text-decoration: ${({open}) => open ? "unset" : "underline"};
  }

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

export function useOnClickOutside(ref, handler) {
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

function choosePrimaryColor(id: string, theme: DefaultTheme): DefaultTheme {
  let n = parseInt(id)
  if(theme){
    if( n % 2 == 0){
      return theme.colors.secondary
    } else {
      return theme.colors.tertiary
    }
  }
}

function chooseSecondaryColor(id: string, theme: DefaultTheme): DefaultTheme {
  let n = parseInt(id)
  if(theme){
    if( n % 2 == 0){
      return theme.colors.quinary
    } else {
      return theme.colors.septenary
    }
  }
}

export default function ProjectCard ({ data }) {
  const { id, title, image, role, difficulties, solution, features, tech, live, git  } = data
  const ref = useRef();
  useOnClickOutside(ref, () => setViewDetails(false));

  const [viewDetails, setViewDetails] = useState(false)

  function toggleDetails(): void{
    if(!viewDetails){
      setViewDetails(!viewDetails)
    }
  }

  return (
    <Wrapper>
        <Box onClick={() => toggleDetails()} open={viewDetails} ref={ref} id={id}>
           <CardContentWrapper open={viewDetails}>
            <CardHeader>
              <H3>{title}</H3>
              { viewDetails && <CardLinkContainer><CardLinks target="_blank" href={live} strikethrough={!(live == "")}>Live</CardLinks>
              <CardLinkSeperator> | </CardLinkSeperator>
              <CardLinks strikethrough={!(git == "")} target="_blank"  href={git}>Git</CardLinks></CardLinkContainer>}
            </CardHeader>
           {viewDetails &&
           <ImageWrapper>
           <ImageContainer id={id} maxHeight={image.dimensions.height} maxWidth={image.dimensions.width}>
           <Image 
            placeholder={title}
            src={matchPhotoSource(id)} 
            alt={image.placeholder} 
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            />
           </ImageContainer>
           </ImageWrapper>
           }
           <RoleCircle open={viewDetails} id={id}>
              <RoleText open={viewDetails}>
                {role}
              </RoleText>
           </RoleCircle>
           {viewDetails ? 
            <>
           <DesktopDetails>
            <TechColumn>
              <TechHeader>Tech:</TechHeader>
              {CreateTechList(tech)}
            </TechColumn>
            <CardCarousel difficulties={difficulties} solution={solution} features={features}/>
           </DesktopDetails>
           <MobileDetails>
              <p><b>Tech: </b>{tech}</p>
              <p><b>Difficulties: </b>{difficulties}</p>
              <p><b>Solution: </b>{solution}</p>
              <p><b>Features: </b>{features}</p>
           </MobileDetails>
           </> : null
           }
           </CardContentWrapper>
           <ToggleDetails open={viewDetails} onClick={() => setViewDetails(!viewDetails)}>
              { viewDetails ? "Hide Details -" : "See Details +"}
           </ToggleDetails>
        </Box>
    </Wrapper>

  );
}

