import { useState } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors.primary};
  position: relative;
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    display: none;
  }
`

const MenuContents = styled.ul<{open: boolean}>`
  display: ${({open}) => open ? "unset" : "none"};
  position: absolute;
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
          <ul>
            <li>RSS</li>
            <li>About</li>
            <li>Portfolio</li>
          </ul>
        </MenuContents>
        <button onClick={toggleMenu}>Open</button>
      </MenuContainer>
    )
}