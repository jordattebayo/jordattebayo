import styled from 'styled-components'
import ThemeShape from './theme-shape';

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  background-color: ${({theme}) => theme.colors.senary};

`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: auto;
  max-width: ${(props) => props.theme.widths.desktop};
  width: 100vw;
`

const FooterText = styled.span`
  font-size: 12px;
  color: ${({theme}) => theme.colors.primary};
`

const LinkItem = styled.a`
  text-decoration: underline;
`

export default function AboutPage() {
  return (
    <>
    <Footer>
      <TextWrapper>
      <FooterText>Jordan Booker &copy;2022</FooterText> 
      <FooterText>Built with <LinkItem href="https://nextjs.org/" target="_blank">NextJS</LinkItem>. Hosted on <LinkItem href="https://vercel.com/" target="_blank">Vercel.</LinkItem></FooterText>
      </TextWrapper>    
    </Footer>
    </>
  );
}
