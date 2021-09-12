import React, { useState } from 'react'
import axios from 'axios'
import { ToggleNavbarProps } from '../../util';
import { GridLayout, LayoutColors, StyledButton } from '../../style/shared-style-components';
import { FormIntroduction, FormPanel, FormMessage, Form, Label, SingleLineInput, MultiLineInput, FormButton } from './styles';
import { useEffect } from 'react';

function Contact({ setWhiteNavbar } : ToggleNavbarProps) : JSX.Element {

    useEffect(()=>{
        setWhiteNavbar(true);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps   
    
    const emailFunctionURL : string = "/.netlify/functions/send-email/send-email.ts?";
    const emailRegularExpression : RegExp = new RegExp('^\\S+@\\S+\\.\\S+$');

    const [contactName, setContactName] = useState<string>("");
    const [contactEmail, setContactEmail] = useState<string>("");
    const [emailMessage, setEmailMessage] = useState<string>("");

    const isEmailAddressValid = function(email : string) : boolean {
        return emailRegularExpression.test(email);
    }

    const isMessageNotEmpty = function(message : string) : boolean {
        return message !== "";
    }
    
    const sendEmail = async function() : Promise<void> {
        const requestParams = new URLSearchParams();
        requestParams.append("from_name", contactName);
        requestParams.append("reply_to", contactEmail);
        requestParams.append("message", emailMessage);
        await axios.get(emailFunctionURL + requestParams.toString())
    }

    const onNameChange = function(event : React.ChangeEvent<HTMLInputElement>) : void {
        setContactName(event.target.value);
    }

    const onEmailChange = function(event : React.ChangeEvent<HTMLInputElement>) : void {
        setContactEmail(event.target.value);
    }

    const onMessageChange = function(event : React.ChangeEvent<HTMLTextAreaElement>) : void {
        setEmailMessage(event.target.value);
    }

    const onFormSend = async function() : Promise<void> {
        if (!isEmailAddressValid(contactEmail))
        {
            alert(`Address ${contactEmail} is not valid.`);
            return;
        }
        if (!isMessageNotEmpty(emailMessage))
        {
            alert("Unable to send an empty message.");
            return;
        }
        
        await sendEmail();
        setContactName("");
        setContactEmail("");
        setEmailMessage("");
    }

    return (
        <GridLayout color={LayoutColors.Gray}>
            <FormPanel>
                <FormIntroduction>
                    I'm always open to new conversations!
                </FormIntroduction>
                <FormMessage>
                    Whether you want me to help you with a web app, a robotics project, or just want to say hi, my e-mails are open! Just fill this form and I will reply to you as soon as I can 😊
                </FormMessage>
                <Form>
                    <Label>Name</Label>
                    <SingleLineInput type="text" value={contactName} onChange={onNameChange}/>
                    <Label>Email</Label>
                    <SingleLineInput type="text" value={contactEmail} onChange={onEmailChange}/>
                    <Label>Message</Label>
                    <MultiLineInput value={emailMessage} onChange={onMessageChange} />
                </Form>
                <FormButton>
                    <StyledButton onClick={onFormSend}>Send Email</StyledButton>
                </FormButton>                
            </FormPanel>
        </GridLayout>
    )
}

export default Contact