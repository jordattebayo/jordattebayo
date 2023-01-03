import React, { useState } from "react";
import styled from "styled-components"

const H3 = styled.h3`
    margin-bottom: .5rem;
`

const Form = styled.form`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`
const InputContainer = styled.span`
    display: flex;
`

const Input = styled.input`
  color: ${({theme}) => theme.colors.primary};
  background-color: transparent;
  padding: .25rem 0;
  padding-left: .25rem;
  border: none; 
  box-shadow: none;
  border: 1px solid ${({theme}) => theme.colors.primary};
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
  color: ${({theme}) => theme.colors.primary};
  margin-bottom: .5rem;
`


const SubmitButton = styled.button`
    background-color: transparent;
    border: 1px solid ${({theme}) => theme.colors.primary}; 
    color: ${({theme}) => theme.colors.primary};
    &:hover{
        cursor: pointer;
        color: ${({theme}) => theme.colors.senary};
        border: 1px solid ${({theme}) => theme.colors.senary}; 
        background-color: ${({theme}) => theme.colors.primary}; 
    }
`

export default function SubscribeForm() {
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
            if(res.ok){
                setSuccess(true)
            }else {
                setError(res.statusText)
            }
        })
    }
    if (success){
        return (
            <div><p>Subscribed!</p></div>
        )
    }
    if (error !== ""){
        return (
            <div><p>Sorry an error occrued: {error}</p></div>
        )
    }
    if (submitting){
        return (
            <div><p>submitting...</p></div>
        )
    }
    return (
        <>
        <Form onSubmit={(e) => submitEmail(e)}>
                <Label>   
                    <H3>Sign up for updates:</H3>
                </Label>
                <InputContainer>
                <Input 
                type="text" 
                value={email} 
                id="email"
                name="email"
                onChange={(e) => handleChange(e)} 
                placeholder="email@email.com"
                aria-label="email"
                aria-required="true"
                />
                <SubmitButton>Submit</SubmitButton>
                </InputContainer>
            </Form>
            </>
    );
} 