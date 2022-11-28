import styled from 'styled-components'

const Footer = styled.footer`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  margin-top: auto;
  max-width: ${(props) => props.theme.widths.desktop};
  width: 100vw;
`

const FooterText = styled.p`
  font-size: 12px;
`

const LinkItem = styled.a`
  text-decoration: underline;
`

export default function AboutPage() {
  return (
    <Footer>
      <TextWrapper>
      <FooterText>Jordan Booker &copy;2022</FooterText> 
      <FooterText>Built with <LinkItem href="https://nextjs.org/" target="_blank">NextJS</LinkItem>. Hosted on <LinkItem href="https://vercel.com/" target="_blank">Vercel.</LinkItem></FooterText>
      </TextWrapper>    
    </Footer>
  );
}
