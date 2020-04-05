import React,  { useState, useEffect } from "react";
import { Jumbotron, Container, Alert } from 'reactstrap';
import { Span, P } from "../../components/Text";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import "./style.css";



function Main() {

    const [ formSwitch, setFormSwitch ] = useState(false);

    const handleRegisterSwitch = () => {
        setFormSwitch(!formSwitch);
    }

    return (
        
        <React.Fragment>
            <Jumbotron fluid className="bg-dark p-3 mb-1">
                <Container fluid>
                    <div className="mb-0">
                        <h1 className="display-3 mb-4 mt-3 text-center text-white">Welcome to Ticket Generator</h1>
                    </div>
                </Container>
            </Jumbotron>
            { !formSwitch ? 
            <>
            <LoginForm />
            <P className="textLogin text-center" color="light">Not registered yet..? Please <Span className="linkSpan" onClick={handleRegisterSwitch}>Register</Span></P> </> :
            <>
            <RegisterForm />
            <P className="textLogin text-center"><Span className="linkSpan" onClick={handleRegisterSwitch}>Back</Span></P>
            </>
            }
        </React.Fragment>
    )


}


export default Main;