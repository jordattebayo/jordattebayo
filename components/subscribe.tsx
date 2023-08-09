import React, { useState } from "react";
import styled from "styled-components"

const H3 = styled.h3`
    margin-bottom: .5rem;
`

const Form = styled.form<{ altStyle }>`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: ${({altStyle}) => altStyle ? "-22px" : "0"};
`

const InputContainer = styled.span`
    display: flex;
`

const Input = styled.input<{ altStyle }>`
  color: ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  padding: .25rem 0;
  padding-left: .25rem;
  border: none; 
  box-shadow: none;
  border: ${({ altStyle, theme }) => altStyle ? 'none' : `1px solid ${theme.colors.primary}`}; 
  border-right: none;
  &:focus{
    outline: 0;
  }
  &::placeholder{
    font-style: italic;
  }
`

const Label = styled.label`
  padding-left: .25rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: .5rem;
`


const SubmitButton = styled.button<{ altStyle }>`
    font-family: Roboto Mono, monospace;
    font-size: 1rem;
    font-weight: ${({altStyle }) => altStyle ? 600 : 400};
    background-color: ${({altStyle, theme}) => altStyle ? theme.colors.primary : "transparent"};
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`}; 
    color: ${({ altStyle, theme }) => altStyle ? theme.colors.senary : theme.colors.primary};
    &:hover{
        cursor: pointer;
        color: ${({ altStyle, theme }) => altStyle ? theme.colors.primary  : theme.colors.senary};
        border: 1px solid ${({ theme }) =>  theme.colors.primary}; 
        background-color: ${({ altStyle, theme }) => altStyle ? theme.colors.senary : theme.colors.primary}; 
    }
`

const ResponseText = styled.p`
    color: ${(props) => props.theme.colors.primary};
`

const SubscribeForm = ({ altStyle }) => {
    const [email, setEmail] = useState<string>("")
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    const handleChange = (event) => {
        setEmail(event.target.value)
    }
    const submitEmail = (event) => {
        event.preventDefault();
        setSubmitting(true)
        setError("")
        setSuccess(false)
        fetch("/api/subscribe", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        }).then(res => {
            if (res.ok) {
                setSuccess(true)
            } else {
                setError(res.statusText)
            }
            setSubmitting(false)
        })
    }
    if (success) {
        return (
            <div><ResponseText>Subscribed!</ResponseText></div>
        )
    }
    if (error !== "") {
        return (
            <div><ResponseText>Sorry an error occrued: {error}</ResponseText></div>
        )
    }
    if (submitting) {
        return (
            <div><ResponseText>submitting...</ResponseText></div>
        )
    }
    return (
        <>
            <Form onSubmit={(e) => submitEmail(e)} altStyle={altStyle}>
                {altStyle ? "" : <Label>
                    <H3>Sign up for updates:</H3>
                </Label>}
                <InputContainer >
                    <Input
                        type="text"
                        value={email}
                        id="email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        placeholder={ altStyle ? "Sign up for email list" : "email@email.com"}
                        aria-label="email"
                        aria-required="true"
                        altStyle={altStyle}
                    />
                    <SubmitButton altStyle={altStyle}>Submit</SubmitButton>
                </InputContainer>
            </Form>
        </>
    );
}

export default SubscribeForm;