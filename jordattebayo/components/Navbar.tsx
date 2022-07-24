import { useState } from "react";
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

`

const Nav = styled.nav`
  width: 100vw;
  min-height: 115px;
  padding: 2rem;
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
  padding: 0 1rem;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding: 0;
  }
`

const NavLink = styled.a`
  color: ${(props) => props.theme.colors.senary};
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
  padding: 2em;
  padding-top: 0;
  background-color:  ${(props) => props.theme.colors.primary};
  display: none;
    @media(max-width: ${(props) => props.theme.widths.tablet}) {
      display: ${(props) => props.open ? "unset" : "none"};
  }
`;


const NavList = () => {
  return (
      <NavUl>
        <NavListItem>
          <Link href="/" passHref>
            <NavLink tabIndex={0}>
              /Portfolio
            </NavLink>
          </Link>
        </NavListItem>
        <NavListItem >
          <Link href="/about" passHref>
            <NavLink tabIndex={0}>
              /About
            </NavLink>
          </Link>
        </NavListItem>
        <NavListItem>
          <Link href="/blog" passHref>
          <NavLink
            tabIndex={0}
          >
            /Blog
          </NavLink>
          </Link>
        </NavListItem>
      </NavUl>
  )
}

export default function Navbar () {
  const [open, setOpen] = useState(false);

  function openNav(e){
    e.preventDefault();
    console.log("nav is: ", open ? "open" : "closed")
    setOpen(!open)
  }

  return (
    <NavWrapper>
      <Nav>
        <NavWidthLimit>
        <Link href="/" passHref>
          <HomeWrapper>
            jordan booker <br/>dot com
          </HomeWrapper>
        </Link>
        <DesktopNav>
          <NavList />
        </DesktopNav>
        <MobileNavButtonWrapper>
          <NavButton onClick={(e) => openNav(e)}></NavButton>
        </MobileNavButtonWrapper>
        </NavWidthLimit>
        <MobileNav open={open}>
        <NavList />      
        </MobileNav>
      </Nav>
    </NavWrapper>
  );
}
