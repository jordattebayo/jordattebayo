import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const FooterWrapper = styled.div<{active: boolean}>`
    position: fixed;
    margin-top: auto;
    margin-left: auto;
    top: 83vh;
    right: 10vw;
    z-index: 5;
    background-color:${(props) => props.theme.colors.senary};
    transform: ${(({active}) => active ? "translateY(0)" : "translateY(20vh)")};
    transition: transform .25s;
    @media(max-width: ${(props) => props.theme.widths.mobile}) {
        display: none;
  }
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
`


const Button = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    :hover{
        cursor: pointer;
    }
`

const SVGWrapper = styled.span`
    display: block;
    height: 51px;
    width: 40px;
    ${Button}:hover & {
        border-bottom: 4px solid ${(props) => props.theme.colors.primary};
    }
`

const SVG = styled.svg`
    fill: ${(props) => props.theme.colors.primary};
`

const ButtonText = styled.span`
    font-size: clamp(16px, 5vw, 32px);
    color:${(props) => props.theme.colors.primary};
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

const SettingsButton = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    font-size: clamp(16px,5vw,32px);
    font-style:  ${(props) => props.theme.fonts.primary};
    color: ${(props) => props.theme.colors.primary};
    text-align: left;
    cursor: pointer;
    padding: .25rem 0;
`

const SettingsText = styled.span`
    ${SettingsButton}:hover & {
        border: 1px ${(props) => props.theme.colors.senary};
        text-decoration: underline;
    }
`

const Prompt = styled.span`
    font-size: clamp(16px, 5vw, 20px);
    border: 1px solid ${(props) => props.theme.colors.primary};
    padding: .25rem;
`

const FooterText = styled.span`
    font-size: clamp(16px, 2vw, 18px);
    color: ${(props) => props.theme.colors.primary};
    border: none;
    padding: .25rem 0;
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
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false)


    const handleUserKeyPress = useCallback(event => {
        const { key } = event;
        if(event.ctrlKey == true){
            if(key === "Enter"){
                setOpenSettings(true);
            } 
        }
        if (key === "Escape"){
            setOpenSettings(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    useEffect(() => { 
        const checkPosition = () => {
            if(window.scrollY >= 10){
                setActive(true)
            } else {
                setActive(false)
            }
        }
        window.addEventListener('scroll', () => checkPosition())
        return () => {
            window.removeEventListener('scroll', () => checkPosition())
        }
      }, [active])

    return (
        <>
        <FooterWrapper active={active}>
            <Footer>
                <Button onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                }}>
                    <SVGWrapper>
                        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></SVG>
                    </SVGWrapper>
                    <ButtonText style={{fontFamily: "Roboto Mono,monospace"}}>scroll to top</ButtonText>
                </Button>
                <Link href="/about#contact" passHref legacyBehavior>
                    <FooterLink
                        tabIndex={0}   
                    >
                        contact me
                    </FooterLink>
                </Link>
                <SettingsButton
                    type="button"
                    onClick={() => setOpenSettings(openSettings => !openSettings)}
                        tabIndex={0}   
                    >
                        <SettingsText>settings</SettingsText> <Prompt>CTRL</Prompt> + <Prompt>ENTER</Prompt>
                </SettingsButton>
                <FooterText>&copy; {() => {let date = new Date(); return date.getFullYear()}} By Jordan Booker</FooterText>
            </Footer>
        </FooterWrapper>
        </>
    )
}