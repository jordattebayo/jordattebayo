import React, { useContext, useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components"
import { AppContext } from "../lib/context";
import SubscribeForm from "./subscribe";

const H3 = styled.h3`
  margin-bottom: .5rem;
  color: ${(props) => props.theme.colors.primary};

`

const SectionWrapper = styled.div`
  margin: 2rem 0;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
`

const Dialog = styled.dialog`
  background-color: ${({theme}) => theme.colors.senary};
  border-color:  ${({theme}) => theme.colors.primary};
`

const FooterLink = styled.a`
    font-size: clamp(16px, 2vw, 20px);
    color: ${(props) => props.theme.colors.primary};
    margin-top: .25rem;
    :hover {
        text-decoration: underline;
    }
`

const Form = styled.form`
  margin-bottom: 2rem;
`

const CloseDialog = styled.button`
  margin-top: 1rem;
  background: transparent;
  border: 1px solid ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.primary};
  border-radius: 3px;
  &:hover{
    cursor: pointer;
  }
`

const FieldSet = styled.fieldset`
  border-color: ${({theme}) => theme.colors.primary};
  border-width: 1px;
`

const Legend = styled.legend`
  color: ${({theme}) => theme.colors.primary};
`

const Label = styled.label`
  color: ${({theme}) => theme.colors.primary};
`

const Input = styled.input`
  color: ${({theme}) => theme.colors.primary};
  &:focus{
    outline: 0;
  }
`

export default function Modal() {
  const { settingsDialogState, requestDialogOpen, requestDialogClose, toggleDialog, selectedTheme, chooseTheme } = useContext(AppContext)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const prevElement = useRef(null)
  const firstRender = useRef<boolean>(true);

  const [theme, setTheme] = useState<string>("")

  const handleUserKeyPress = useCallback(event => {
      const { key } = event;
      if(event.ctrlKey == true){
        if(key === "Shift"){
          toggleDialog();
        } 
      } else if (key === "Escape"){
        event.preventDefault();
        requestDialogClose();
      }
  }, []);

  const handleCancelEvent = useCallback(event => {
    event.preventDefault();
    requestDialogClose()
    if(settingsDialogState) requestDialogClose()

  }, [])

  const handleCloseEvent = useCallback(event => {
    event.preventDefault();
    if(settingsDialogState) requestDialogClose()
  }, [])

  const handleFocus = (value: string) => {
    chooseTheme(value)
    setTheme(value)
  }

  //Effect to provide support for keyboard commands & listen for cancel events to close dialog
  useEffect(() => {
    const dialogNode = dialogRef.current
      dialogNode.addEventListener('close', handleCloseEvent);
      dialogNode.addEventListener('cancel', handleCancelEvent);

      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
          dialogNode.removeEventListener('close', handleCloseEvent)
          dialogNode.addEventListener('cancel', handleCancelEvent);
          window.removeEventListener("keydown", handleUserKeyPress);
      };
  }, []);


  //Effect to hook into native dialog browser api
  useEffect(() => {
    if( firstRender.current){
      firstRender.current = false;
    } else {
      const dialogNode = dialogRef.current
      const prevNode = prevElement.current
      if(dialogNode) {
        if(settingsDialogState && !dialogNode.hasAttribute('open')){
          if(document.activeElement) prevElement.current = document.activeElement;
          dialogNode.showModal()
        } else {
          dialogNode.close()
          if(prevNode) prevNode.focus();
        }
      }
    }
  },[settingsDialogState])

  const handleChange = (event) => {
    chooseTheme(event.target.value)
    setTheme(event.target.value)
  }
  return (
    <Dialog id="favDialog" ref={dialogRef}>
      <SectionWrapper>
      <Section>
      <H3>Links:</H3>
      <Link href="/about#contact" passHref legacyBehavior>
                    <FooterLink
                        tabIndex={0}   
                    >
                        /contact me
                    </FooterLink>
                </Link>
                <Link href="/rss/feed.xml" passHref legacyBehavior>
                    <FooterLink
                        tabIndex={0}   
                    >
                        /rss
                    </FooterLink>
                </Link>
          </Section>
      </SectionWrapper>
      <SectionWrapper>
      <H3>Settings:</H3>
      <Form method="dialog" onSubmit={() => requestDialogClose()}>
        <FieldSet>
            <Legend>Theme:</Legend>
            <div>
              <Input 
                type="radio" 
                value="light"
                id="light"
                name="light"
                onChange={(e) => handleChange(e)} 
                checked={theme === "light"}
                tabindex="0"
                aria-label="light"
                aria-required="true"
                /* onFocus={() => handleFocus("light")} */
              />
              <Label htmlFor="light">Light</Label>
            </div>
            <div>
            <Input 
              type="radio" 
              value="dark" 
              id="dark"
              name="dark"
              onChange={(e) => handleChange(e)} 
              checked={theme === "dark"}
              tabindex="0"
              aria-label="dark"
              aria-required="true"
              /* onFocus={() => handleFocus("dark")} */

            />
            <Label htmlFor="dark">Dark</Label>
            </div>
        </FieldSet>
        </Form>
        </SectionWrapper>
        <SubscribeForm altStyle={true}/>
        <div>
        <CloseDialog value="close" onClick={() => requestDialogClose()} >Close</CloseDialog>
        </div>
    </Dialog>
  );
} 

