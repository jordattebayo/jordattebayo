import { useState } from "react";
import Image from "next/image";
import Link from "next/link"
import styled from "styled-components";

interface DetailsTabProps {
  show?: boolean;
}

interface BoxProps {
  image?: any;
  open: boolean;
}

const Wrapper = styled.li`
  position: relative;
`

const Box = styled.div<BoxProps>`
  margin: 2em 0;
  height: ${({open}) => open ? "clamp(400px, 80vw, 1044px)" : "clamp(200px, 40vw, 522px)"};
  width: ${({open}) => open ? "clamp(400px, 80vw, 1044px)" : "clamp(250px, 48vw, 626px)"};
  border: 1px solid ${(props) => props.theme.colors.primary};
  box-shadow: -16px 16px ${(props) => props.theme.colors.quaternary};
  padding: 2em;
  background-color: ${(props) => props.theme.colors.senary};
  transition: height 0.25s, width 0.25s;
  &:hover {
  }
`

const RoleCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: ${(props) => props.theme.colors.quaternary};
`

const RoleText = styled.p`
  color: ${(props) => props.theme.colors.senary};
`

const DetailsTab = styled.div<DetailsTabProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: clamp(250px, 48vw, 626px);
  top: 2.4vh;
  height: clamp(200px, 40vw, 522px);
  width: clamp(250px, 42vw, 323px);
  padding: 2em;
  color: ${(props) => props.theme.colors.senary};
  background-color: ${(props) => props.show ? props.theme.colors.primary : props.theme.colors.senary};
  transition: background-color 0.25s;
  ${Wrapper}:hover & {
    background-color: ${(props) => props.theme.colors.primary};
    @media(max-width: ${(props) => props.theme.widths.desktop}) {
      display: none;
    }
  }
`

const CardTextBottom = styled.p`
  margin-top: auto;
  text-decoration: underline;
  align-self: flex-end;
`

const H3 = styled.h3`
  color:  ${(props) => props.theme.colors.primary};
  ${Box}:hover & {
  }
`

const H3Details = styled(H3)`
  color:  ${(props) => props.theme.colors.senary};
`

export default function ProjectCard ({ data }) {

  const [showProject, setShowProject] = useState(false)
  const [viewDetails, setViewDetails] = useState(false)

  const [viewImage, setViewImage] = useState(false)
  const { id, title, slug, image, role, difficulties, solution, features, tech, live, git, screenshots } = data
  
  return (
    <Wrapper>
        <Box onClick={() => setViewDetails(!viewDetails)} open={viewDetails}>
           <H3>{title}</H3>
           <RoleCircle>
              <RoleText>
              {role}
              </RoleText>
           </RoleCircle>
        </Box>
        {/* <DetailsTab show={viewDetails}>
          <H3Details>{title}</H3Details>
          <p>{tech}</p>
          <CardTextBottom>View More</CardTextBottom>
        </DetailsTab> */}
    </Wrapper>

  );
}

