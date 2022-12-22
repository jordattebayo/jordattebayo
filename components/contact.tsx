import { useState } from "react";
import styled from "styled-components"

const LinkText = styled.p`
  font-size: clamp(20px, 1.5vw, 22px);
  line-height: clamp(22px, 2vw, 30px);
`

const Link = styled.a`
  &:hover{
    text-decoration: underline;
  }
`

export function ContactButton() {
  return (
    <LinkText>
      <span id="#contact">You can reach me @ </span>
      <Link href="mailto:jordan@jordanbooker.dev">
        jordan@jordanbooker.dev
      </Link>
    </LinkText>
  );
}