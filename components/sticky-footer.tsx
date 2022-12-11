import Link from "next/link";
import styled from "styled-components";

const FooterWrapper = styled.div`
    position: fixed;
    margin-top: auto;
    margin-left: auto;
    top: 85vh;
    right: 10vw;
    z-index: 5;
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
`


const Button = styled.button`
    background-color: transparent;
    border: none;
    :hover{
        cursor: pointer;
    }
`

const SVGWrapper = styled.span`
    display: block;
    height: 51px;
    width: 40px;
    ${Button}:hover & {
        border-bottom: 4px solid black;
    }
`

const ButtonText = styled.span`
    margin-top: 1rem;
    font-size: clamp(16px, 5vw, 32px);
    ${Button}:hover & {
        text-decoration: underline;
    }
`

const FooterLink = styled.a`
    font-size: clamp(16px, 5vw, 32px);
    color: ${(props) => props.theme.colors.primary};
    margin-top: .25rem;
    :hover {
        text-decoration: underline;
    }
`

function scrollToTop(){
    if(window){
        window.scroll({
            top: 0, 
            behavior: 'smooth'
          });
    }
}

export default function StickyFooter() {

    return (
        <FooterWrapper>
            <Footer>
                <Button onClick={(e) => {
                    e.preventDefault();
                    console.log("button clicked");
                    scrollToTop();
                }}>
                    <SVGWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                    </SVGWrapper>
                    <ButtonText>Scroll to top</ButtonText>
                </Button>
                <Link href="/about#contact" passHref legacyBehavior>
                    <FooterLink
                        tabIndex={0}   
                    >
                        Contact Me
                    </FooterLink>
                </Link>
            </Footer>
        </FooterWrapper>
    )
}