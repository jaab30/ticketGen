import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from "react-router-dom";
import  { P } from "../Text"
import API from "../../utils/API";


function Login() {

    const history = useHistory();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ role, setRole ] = useState("");


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const dataObj = {
            email,
            password,
            role
        };

        API.login(dataObj)
        .then(data => {
            console.log(data);
            history.push("/dashboard");
            
        })
        .catch(err => console.log(err));
    }

    return (
        <Container>
            <P className="lead loginHeadText text-center text-dark">Login</P>
            <Row className="mx-auto">
                <Col md="6" className="mx-auto">
                    <Form className="logForm bg-light p-4 text-dark">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input 
                            type="email" 
                            name="email" 
                            id="exampleEmail" 
                            placeholder="Please enter Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input 
                            type="password" 
                            name="password" 
                            id="examplePassword" 
                            placeholder="Please enter Password" 
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Select</Label>
                            <Input 
                            type="select" 
                            name="select" 
                            id="exampleSelect" 
                            onChange={(e)=>setRole(e.target.value)}
                            >
                                <option selected disabled>Please select:</option>
                                <option value="resident">Resident</option>
                                <option value="manager">Manager</option>
                                <option value="administrator">Administrator</option>
                            </Input>
                        </FormGroup>
                        <Button onClick={ handleFormSubmit } color="dark" size="lg" block>LogIn</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )


}


export default Login;