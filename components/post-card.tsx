import { useContext } from "react";
import styled, { DefaultTheme, ThemeContext } from "styled-components";
import DateFormatter from './date-formatter'
import Link from 'next/link'
import type Author from '../interfaces/author'

const Wrapper = styled.div`
  position: relative;
`

const Box = styled.div<{ open: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: ${({open}) => open ? "center" : "start"};
  margin: 2em 0;
  height: clamp(200px, 40vw, 522px);
  width: clamp(250px, 48vw, 626px);
  padding: 2em;
  background-color: transparent;
  transition: height 0.25s, width 0.25s, box-shadow 0.25s;
  border: 3px solid ${(props) => props.theme.colors.primary};
  z-index: 3;
  &:hover {
   cursor: ${({open}) => open ? "unset" : "pointer"};
  }

`

const CardContentWrapper = styled.div<{ open: boolean}>`
  display: flex;
  flex-direction: column;
  width: clamp(100px, 100%, 686px);
  position: relative;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding: ${({ open }) => open ? "0 2rem" : "0"};
  }
` 

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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

const DateContainer = styled.span`
  transition: all .3s;
  ${Wrapper}:hover & {
    transform: translate(0, 1rem);
  }
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    ${Wrapper}:hover &{
      transform: translate(0, 0);
    }
  } 
`

const CardHoverText = styled.div`
  visibility: hidden;
  height: 0;
  transition: all .25s;
  ${Wrapper}:hover &{
    visibility: unset;
    height: auto;
  }
  ${Wrapper}:not(:hover) &{
    transition: none;
  }
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    ${Wrapper}:hover &{
      visibility: hidden;
      height: 0;
    }
  } 
`

const CardText = styled.p`
`

const ReadTimeText = styled(CardText)`
  margin-top: auto;
`

const ShadowBox = styled.div<{ color: string}>`
  box-shadow: -16px 16px ${({color}) => color};
  margin: 2em 0;
  height: clamp(200px, 40vw, 522px);
  width: clamp(250px, 48vw, 626px);
  position: absolute;
  top: 0;
  z-index: 0;
  transition: box-shadow .25s;
  ${Wrapper}:hover &{
    box-shadow: 16px -16px ${({color}) => color};
  }
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    ${Wrapper}:hover &{
    box-shadow: -16px 16px ${({color}) => color};
  } 
  }
`

const Lines = styled.svg`
  position: absolute;
  z-index: 1;
  top: 0; 
  overflow: overlay;
  fill: ${(props) => props.theme.colors.primary};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    top: 16px; 
  }
`

const TopLine = styled.line`
  transform: translate(-3px,2px);
  stroke-width: .25px;
  stroke: ${(props) => props.theme.colors.primary};
`

const BottomLines = styled.line`
  transform: translate(5px,-8px);
  stroke-width: .25px;
  stroke: ${(props) => props.theme.colors.primary};
`

function choosePrimaryColor(id: number, theme: DefaultTheme): string {
  if(theme){
    if (id === 0 || id === 4) {
      return  theme.colors.secondary;
    } else if(id === 1 || id === 5) {
      return theme.colors.tertiary;
    } else if(id === 2 || id === 6) {
      return theme.colors.quaternary;
    } else if(id === 3 || id === 7) {
      return theme.colors.septenary;
    }
  }
}

type Props = {
  title: string
  coverImage?: string
  date: string
  excerpt: string
  author: Author
  slug: string
  id: number
  timeToRead: string
}

export default function PostCard (props: Props) {
  const { title, coverImage, date, excerpt, author, slug, id, timeToRead } = props

  const themeContext = useContext(ThemeContext)
  let color = choosePrimaryColor(id, themeContext)
  return (
    <Wrapper>
              <Link
                as={`/blog/${slug}`}
                href="/blog/[slug]"
              >
        <Box>
           <CardContentWrapper>
            <CardHeader>
    
              <H3>{title}</H3>
            </CardHeader>
           </CardContentWrapper>
           <CardHoverText>{excerpt}</CardHoverText>
           {/* <p>{author?.name}</p> */}
           <DateContainer><DateFormatter dateString={date} /></DateContainer>
           <ReadTimeText>{timeToRead} read</ReadTimeText>
        </Box>
        <ShadowBox color={color}>
        </ShadowBox>
        <Lines viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <TopLine x1="18" y1="0" x2="0" y2="17" stroke="black" stroke-width=".25px" />
          <BottomLines x1="100" y1="50" x2="50" y2="100" stroke="black" />
          <BottomLines x1="100" y1="66" x2="65" y2="100" stroke="black" />
          <BottomLines x1="100" y1="80" x2="80" y2="100" stroke="black" />
        </Lines>
        </Link>
    </Wrapper>
  );
}


