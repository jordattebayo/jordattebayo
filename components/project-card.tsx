import { useState } from "react";
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
    box-shadow: 16px -16px ${(props) => props.theme.colors.quaternary};
  }
`

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
` 
const RoleCircle = styled.div<RoleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 175px;
  height: 175px;
  background: ${(props) => props.theme.colors.quaternary};
  position: ${({open}) => open ? "absolute" : "static"};
  top: ${({open}) => open ? "42vh" : ""};
  left: ${({open}) => open ? "32vw" : ""};
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
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

const CaroselColumn = styled.div`
  padding-left: 2rem;
`

const CaroselHeader = styled.p`
  text-decoration: underline;
  font-weight: 700;
`

const CaroselText = styled.p`
  
`

const ToggleDetails = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  align-self: flex-end;
  ${Box}:hover & {
    text-decoration: underline;

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

export default function ProjectCard ({ data }) {

  const [viewDetails, setViewDetails] = useState(false)

  const [viewImage, setViewImage] = useState(false)
  const { id, title, slug, image, role, difficulties, solution, features, tech, live, git, screenshots } = data
  
  return (
    <Wrapper>
        <Box onClick={() => setViewDetails(!viewDetails)} open={viewDetails}>
           <CardContentWrapper>
           <H3>{title}</H3>
           {viewDetails &&
           <ImageWrapper>
           <ImageContainer>
           <Image 
            placeholder={title}
            src={matchPhotoSource(id)} 
            alt={title} 
            height={400}
            width={700}
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
              <CaroselHeader>
                Project Difficulties
              </CaroselHeader>
              <CaroselText>{difficulties}</CaroselText>
            </CaroselColumn>
           </Details>
           }
           </CardContentWrapper>

           <ToggleDetails>
              { viewDetails ? "Hide Details -" : "See Details +"}
           </ToggleDetails>
        </Box>
    </Wrapper>

  );
}

