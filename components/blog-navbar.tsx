import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
`

const Nav = styled.nav`
  width: 100vw;
  min-height: 115px;
  padding: 2rem;
  max-width: ${(props) => props.theme.widths.desktop};
`;

const MobileNav = styled.div`
  display: none;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    display: unset;
  }
`

const NavWidthLimit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`

const NavLink = styled.a`
  font-size: clamp(16px, 4vw, 24px);
  color: ${(props) => props.theme.colors.primary};
`

const HomeWrapper = styled(NavLink)`
  font-size: 32px;
  font-weight: 400;
  text-decoration: underline;
  line-height: 37px;
  text-align: center;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    text-align: left;
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
const NavList = () => {
  return (
      <NavUl>
        <NavListItem>
          <Link href="/" passHref legacyBehavior>
            <NavLink tabIndex={0}>
              /Portfolio
            </NavLink>
          </Link>
        </NavListItem>
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
      </NavUl>
  )
}

export default function BlogNavbar () {

  return (
    <NavWrapper>
      <Nav>
        <NavWidthLimit>
        <Link href="/blog" passHref legacyBehavior>
          <HomeWrapper >
            jordan booker <br/>dot com/blog
          </HomeWrapper>
        </Link>
        <MobileNav>
          <NavList />
        </MobileNav>
        </NavWidthLimit>
      </Nav>
    </NavWrapper>
  );
}
