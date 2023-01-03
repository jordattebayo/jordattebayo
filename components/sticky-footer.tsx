import { useState, useEffect, useCallback , useContext} from "react";
import styled from "styled-components";
import { AppContext } from "../lib/context";

const FooterWrapper = styled.div<{active: boolean}>`
    position: fixed;
    margin-top: auto;
    margin-left: auto;
    top: 85vh;
    right: 10vw;
    z-index: 5;
    background-color:${(props) => props.theme.colors.senary};
    transform: ${(({active}) => active ? "translateY(0)" : "translateY(30vh)")};
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
        color:${(props) => props.theme.colors.primary};
    }
`

const SVGWrapper = styled.span`
    display: block;
    height: 51px;
    width: 40px;
    ${Button}:hover & {
        border-bottom: 4px solid black
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

const SettingsButton = styled.button`
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 0;
    font-size: clamp(16px, 4vw, 30px);
    font-style:  ${(props) => props.theme.fonts.primary};
    color: ${(props) => props.theme.colors.primary};
    text-align: left;
    cursor: pointer;
    padding: .5rem 0;
    gap: .5rem;
    position: relative;
`

const SettingsText = styled.span`
    visibility: unset;
    ${SettingsButton}:hover & {
        border: 1px ${(props) => props.theme.colors.senary};
        visibility: hidden;
    }
`

const PromptWrapper = styled.span`
    visibility: hidden;
    vertical-align: middle;
    position: absolute;
    left: 0;
    border: 3px solid ${(props) => props.theme.colors.primary};
    padding: .25rem .5rem;
    ${SettingsButton}:hover & {
        visibility: unset;
    }
`

const Prompt = styled.span`
    position: relative;
    font-size: clamp(12px, .5vw, 16px);
    border: 1px solid ${(props) => props.theme.colors.primary};
    padding: .25rem;
    top: -5px;
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
    const { requestDialogOpen } = useContext(AppContext)
    const [active, setActive] = useState<boolean>(false)
    const date = new Date();
   
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
      }, [])

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
                <SettingsButton
                    type="button"
                    onClick={() => requestDialogOpen()}
                    tabIndex={0}
                    >
                        <SettingsText>open menu</SettingsText><PromptWrapper><Prompt>CTRL</Prompt> + <Prompt>↑ Shift</Prompt></PromptWrapper>
                </SettingsButton>
                <FooterText>&copy; {date.getFullYear()} By Jordan Booker</FooterText>
            </Footer>
        </FooterWrapper>
        </>
    )
}