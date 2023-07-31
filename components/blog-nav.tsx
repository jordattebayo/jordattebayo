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
  background-color: white;
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

export default function BlogNav(){
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const toggleMenu = () => {
          console.log(openMenu)
          setOpenMenu(!openMenu)
    }
    return (
        <MenuContainer>
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
        <MenuToggleButton onClick={toggleMenu}>
          Menu
          <MenuIcon></MenuIcon>
        </MenuToggleButton>
      </MenuContainer>
    )
}
