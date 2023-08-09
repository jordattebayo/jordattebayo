import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AppContext } from "../lib/context";
import SubscribeForm from "./subscribe";


const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
  background-color:${(props) => props.theme.colors.senary};
`

const Nav = styled.nav`
  width: 100vw;
  min-height: 115px;
  padding: 2rem;
  max-width: ${(props) => props.theme.widths.desktop};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding-bottom: 1rem;
  }
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
  font-size: clamp(18px, 4vw, 24px);
  color: ${(props) => props.theme.colors.primary};
  padding: .5rem 0;
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
    padding: .5rem 0;
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

const NavList = () => {
  const { selectedTheme, toggleTheme } = useContext(AppContext)
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
        <NavListItem>
          <Link href="/rss/feed.xml" passHref legacyBehavior>
          <NavLink
            tabIndex={0}   
          >
            /RSS
          </NavLink>
          </Link>
        </NavListItem>
        <NavListItem>
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
        </NavListItem>
        <NavListItem>
          <SubscribeForm altStyle={false} />
        </NavListItem>
      </NavUl>
  )
}


export default function BlogHero () {

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
