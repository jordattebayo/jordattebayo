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

const DesktopNav = styled.div`
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    display: none;
  }
`

const NavWidthLimit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const NavLink = styled.a`
  color: ${(props) => props.theme.colors.primary};
`

const HomeWrapper = styled(NavLink)`
  font-size: 32px;
  font-weight: 400;
  text-decoration: underline;
  line-height: 37px;
  text-align: center;
`

export default function BlogNavbar () {
  const [open, setOpen] = useState<boolean>(false);

  function openNav(e){
    e.preventDefault();
    setOpen(!open)
  }
  return (
    <NavWrapper>
      <Nav>
        <NavWidthLimit>
        <Link href="/blog" passHref legacyBehavior>
          <HomeWrapper >
            jordan booker <br/>dot com/blog
          </HomeWrapper>
        </Link>
        <DesktopNav>
        </DesktopNav>
        </NavWidthLimit>
      </Nav>
    </NavWrapper>
  );
}
