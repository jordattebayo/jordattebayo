import { useState, useRef, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useOnClickOutside } from "./project-card";
import { AppContext } from "../lib/context";
import SubscribeForm from "./subscribe";

const MenuContainer = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  top: 275px;
  z-index: 1;

`

const StepsWrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 323px;
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
  right: ${({ open }) => open ? "-337px" : "-75px"};
  transition: all .2s ease-in-out;
`

const MenuItem = styled.li`
  padding-left: 1rem;
  height: 50px;
  display: flex;
  align-items: flex-end;
  position: relative;
  border-bottom: 3px solid ${({theme}) => theme.colors.primary};
  &:first-child{
    width: 12vw;
    max-width: 200px;

  }
  &:nth-child(2) {
    width: 16vw;
    max-width: 250px;
  }
`

const MenuLink = styled.a`
  text-decoration: none;
  &:hover{
    font-weight: 600;
    text-decoration: underline;
  }

`

const MenuText = styled.p`
  white-space: nowrap;
`

const MenuToggleButton = styled.button`
  background-color: ${({theme}) => theme.colors.senary};
  font-family: Roboto Mono, monospace;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  display: flex;
  flex-direction: row;
  position: relative;
  bottom: 1px;
  margin-left: 1rem;
  color: ${({theme}) => theme.colors.primary};
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`

const MenuIcon = styled.span<{open: boolean}>`
  background-color: #FF6831;
  display: inline-block;
  position: relative;
  z-index: 2;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  ${MenuToggleButton}:hover & {
    background-color: ${({theme}) => theme.colors.secondary}
  }
  &:before {
    content: "X";
    display: ${({open}) => open ? "unset" : "none" };
    position: relative;
    top: 5px;
    font-weight: 400;
  }
  transition: all .1s ease-in-out;
`

const LinkList = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`

const LinkListItem = styled.li`
  list-style: none;
  padding-left: 1.2rem;
  &.first {
    padding-left: 0;
  }
`
const ToggleWrapper = styled.div`
    position: relative;

`

const ToggleLabel = styled.label`
  position: absolute;
  top: -2px;
  left: 0;
  width: 45px;
  height: 28px;
  border-radius: 15px;
  background: ${({theme}) => theme.colors.senary};
  border: 2px solid ${({theme}) => theme.colors.primary};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${({theme}) => theme.colors.primary};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`

const ToggleInput = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${ToggleLabel} {
    background: ${({theme}) => theme.colors.senary};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`

export default function BlogNav() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenMenu(false));

  const { selectedTheme, toggleTheme } = useContext(AppContext)


  return (
    <StepsWrapper ref={ref}>
      <MenuContents open={openMenu}>
        <MenuItem>
          <ToggleWrapper>
            <ToggleInput 
              type="checkbox" 
              id="themeToggle"
              name="themeToggle"
              aria-label="toggleTheme"
              disabled={false}
              checked={selectedTheme.name === 'dark'}
              onChange={() => toggleTheme()}
                />
          <ToggleLabel  
            tabIndex={0}
            onKeyDown={() => toggleTheme()}
            htmlFor="themeToggle">
            </ToggleLabel>
          </ToggleWrapper>  
        </MenuItem>
        <MenuItem>
          <SubscribeForm altStyle={true} />
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
              { openMenu ? "close" : "menu"}
                <MenuIcon open={openMenu}>
                </MenuIcon>
              </MenuToggleButton>
            </LinkListItem>
          </LinkList>
        </MenuItem>
      </MenuContents>
    </StepsWrapper>
  )
}
