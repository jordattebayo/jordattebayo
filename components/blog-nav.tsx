import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const MenuContainer = styled.div`
  border-bottom: 3px solid ${({theme}) => theme.colors.primary};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  top: 272px;
  z-index: 1;
  @media(max-width: ${(props: any) => props.theme.widths.tablet}) {
    display: none;
  }
`

const MenuContents = styled.ul<{open: boolean}>`
  display: ${({open}) => open ? "unset" : "none"};
  position: absolute;
  background-color: transparent;
  bottom: 0;
`

const MenuLink = styled.a`
  text-decoration: none;
`

const MenuToggleButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover{
    cursor: pointer;
  }
`

const MenuIcon = styled.span`
  background-color: #FF6831;
  display: inline-block;
  position: relative;
  z-index: 2;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const LinkList = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`

const LinkListItem = styled.li`
  list-style: none;
  padding-left: 1rem;
  &.first {
    padding-left: 0;
  }
`

/* theme steps */
interface ThemeShapeProps {
  bottomAligned?: boolean;
  filled?: boolean;
}

const StepsWrapper = styled.div`
  position: absolute;
  padding-bottom: 4rem;
  margin-top: auto;
  background-color:${(props) => props.theme.colors.senary};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: none;
  }
`

const Step = styled.div`
  border-bottom: 3px solid ${({theme}) => theme.colors.primary};
  height: 55px;
  right: 0;
`

const StepOne = styled(Step)`
  width: 20%;
  top: 0;
`

const StepTwo = styled(Step)`
  width: 15%;
  top: 55px;
`

const StepThree = styled(Step)`
  width: 10%;
  top: 110px;
`

export default function BlogNav(){
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const toggleMenu = () => {
          console.log(openMenu)
          setOpenMenu(!openMenu)
    }
    return (
        <StepsWrapper>
          <StepOne></StepOne>
          <StepTwo></StepTwo>
        <MenuContents open={openMenu}>
            <p>
              Theme toggle here
            </p>
            <p>
              Sign up form here
            </p>
          <LinkList>
            <LinkListItem className="first">
              <Link href="/rss/feed.xml" passHref legacyBehavior>
                <MenuLink>/rss</MenuLink>
              </Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="/about" passHref legacyBehavior>
                <MenuLink>/about</MenuLink>
              </Link>
            </LinkListItem>
            <LinkListItem>
              <Link href="/#portfolio" passHref legacyBehavior>
                <MenuLink>/portfolio</MenuLink>
              </Link>
            </LinkListItem>
          </LinkList>
        </MenuContents>
        <StepThree>
        <MenuToggleButton onClick={toggleMenu}>
          Menu
          <MenuIcon></MenuIcon>
        </MenuToggleButton>
        </StepThree>
      </StepsWrapper>
    )
}
