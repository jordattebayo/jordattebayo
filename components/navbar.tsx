import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

interface MobileNavProps {
  open?: boolean;
}

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100vw;
  max-width: 100%;
`

const Nav = styled.nav`
  width: 100%;
  min-height: 115px;
  padding: 2rem 2rem 0 2rem;
  max-width: ${(props) => props.theme.widths.desktop};
`;

const DesktopNav = styled.div`
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    display: none;
  }
`

const NavWidthLimit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MobileNavButtonWrapper = styled.div`
    display: none;
    @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: unset;
  }
`

const NavUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    flex-direction: column;
    display: flex;
    padding-left: 0;
  }

`

const NavListItem = styled.li`
  padding: .5rem 1rem;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding: .5rem 0;
  }
`

const NavLink = styled.a`
  color: ${(props) => props.theme.colors.senary};
  &:hover {
    text-decoration: underline;
  }
`

const HomeWrapper = styled(NavLink)`
  font-size: 24px;
  text-decoration: none;
`

const NavButton = styled.button`
  width: 2em;
  height: 2em;
  background-color:  ${(props) => props.theme.colors.senary};
  border-radius: 50%;
`

const MobileNav = styled.div<MobileNavProps>`
  position: absolute;
  left: 0;
  top: 115px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-top: 0;
  background-color:  ${(props) => props.theme.colors.primary};
  display: none;
    @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: ${(props) => props.open ? "unset" : "none"};
  }
`;

const ToggleWrapper = styled.div`
    position: relative;
    top: -2px;
`
const ToggleLabel = styled.label`
  position: absolute;
  top: -2px;
  left: 0;
  width: 54px;
  height: 28px;
  border-radius: 15px;
  background: ${({theme}) => theme.colors.senary};
  cursor: pointer;
  &::after {
    position: absolute;
    z-index: 2;
    top: 0;
    content: "";
    display: block;
    border-radius: 50%;
    width: 21px;
    height: 21px;
    margin: 3px;
    background: ${({theme}) => theme.colors.primary};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`

const ToggleInput = styled.input`
  opacity: 0;
  z-index: 2;
  border-radius: 15px;
  width: 54px;
  height: 28px;
  &:checked + ${ToggleLabel} {
    background: ${({theme}) => theme.colors.senary};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 21px;
      height: 21px;
      margin-left: 28px;
      transition: 0.2s;
    }
  }
`

const Emojis = styled.i`
  position: relative;
  margin: auto;
  z-index: 1;
  width: 18px;
  height: 18px;
  font-style: normal;
  top: 2px;
  left: 2px;
`

/* const CrescentMoon = styled.span`
  position: absolute;
  margin: auto;
  top: -3px;
  right: 0px;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 5px 1px 0px 0px #fff; 
`
 */
const NavList = ({toggle, setToggle}) => {

  const toggleInput = () => {
    setToggle(toggle => !toggle);
  };

  function handleKeyPress(e) {
    if (e.key !== "Space") return;
    e.preventDefault();
    setToggle();
  }

  return (
      <NavUl>
        {/* <NavListItem>
          <Link href="/#portfolio" passHref legacyBehavior>
            <NavLink tabIndex={0}>
              /Portfolio
            </NavLink>
          </Link>
        </NavListItem> */}
        <NavListItem >
          <Link href="/about" passHref legacyBehavior>
            <NavLink tabIndex={0}>
              /About
            </NavLink>
          </Link>
        </NavListItem>
        <NavListItem>
          <Link href="/blog" passHref legacyBehavior>
          <NavLink
            tabIndex={0}   
          >
            /Blog
          </NavLink>
          </Link>
        </NavListItem>
        {/* <NavListItem>
          <Link href="/rss/feed.xml" passHref legacyBehavior>
          <NavLink
            tabIndex={0}   
          >
            /RSS
          </NavLink>
          </Link>
        </NavListItem> */}
        <NavListItem>
        <ToggleWrapper>
          <ToggleInput 
            type="checkbox" 
            id="themeToggle"
            name="themeToggle"
            aria-label="toggleTheme"
            disabled={false}
            checked={toggle}
            onChange={() => toggleInput()}
              />
        <ToggleLabel  
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor="themeToggle">
          {/* <CrescentMoon></CrescentMoon> */}
            <Emojis>🌞 </Emojis> 
            <Emojis >🌛</Emojis>
          </ToggleLabel>
        </ToggleWrapper>  
        </NavListItem>
      </NavUl>
  )
}

export default function Navbar ({updateTheme}) {
  const [open, setOpen] = useState<boolean>(false);
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);
  const [blockOnLoad, setBlockOnLoad] = useState<boolean>(false);

  function openNav(e){
    e.preventDefault();
    setOpen(!open)
  }
  
  useEffect(() => {
    if(blockOnLoad){
      updateTheme()
    }
    setBlockOnLoad(true)
  },[toggleTheme])

  return (
    <NavWrapper>
      <Nav>
        <NavWidthLimit>
        <Link href="/" passHref legacyBehavior>
          <HomeWrapper >
            jordan booker <br/>dot com
          </HomeWrapper>
        </Link>
        <DesktopNav>
          <NavList toggle={toggleTheme} setToggle={setToggleTheme}/>
        </DesktopNav>
        <MobileNavButtonWrapper>
          <NavButton onClick={(e) => openNav(e)}></NavButton>
        </MobileNavButtonWrapper>
        </NavWidthLimit>
        <MobileNav open={open}>
          <NavList toggle={toggleTheme} setToggle={setToggleTheme}/>  
        </MobileNav>
      </Nav>
    </NavWrapper>
  );
}
