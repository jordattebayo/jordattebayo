import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const MenuContainer = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  top: 272px;
  z-index: 1;

`

const StepsWrapper = styled.div`
  position: absolute;
  top: 325px;
  @media(max-width: ${(props: any) => props.theme.widths.tablet}) {
    display: none;
  }
`
// display: ${({open}) => open ? "unset" : "none"};

const MenuContents = styled.ul<{ open: boolean }>`
  padding: unset;
  position: absolute;
  background-color: transparent;
  bottom: 0;
  right: ${({ open }) => open ? "-300px" : "-80px"};
  transition: all .2s ease-in-out;
`

const MenuItem = styled.li`
  padding-left: 1rem;
  margin-bottom: auto;
  border-bottom: 3px solid black;
  height: 50px;
`

const MenuLink = styled.a`
  text-decoration: none;
`

const MenuText = styled.p`
  margin-top: auto;
`

const MenuToggleButton = styled.button`

  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  &:hover {
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
export default function BlogNav() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => {
    console.log(openMenu)
    setOpenMenu(!openMenu)
  }
  return (
    <StepsWrapper>
      <MenuContents open={openMenu}>
        <MenuItem>
          <MenuText>
            Theme toggle here
          </MenuText>
        </MenuItem>
        <MenuItem>
          <MenuText>
            Sign up form here
          </MenuText>
        </MenuItem>
        <MenuItem>
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
            <LinkListItem>
              <MenuToggleButton onClick={toggleMenu}>
                Menu
                <MenuIcon>
                </MenuIcon>
              </MenuToggleButton>
            </LinkListItem>
          </LinkList>
        </MenuItem>
      </MenuContents>
    </StepsWrapper>
  )
}
