import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Jumbotron, Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { P } from "../Text";
import API from "../../utils/API";
import { Link } from "react-router-dom";


function RegisterForm() {
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [stateReg, setStateReg] = useState("");
    const [zip, setZip] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const dataObj = {
            firstName,
            lastName,
            email,
            address,
            address2,
            city,
            state: stateReg,
            zip,
            phoneNumber,
            password,
            role: "resident"
        };

        API.register(dataObj)
        .then(data => {
            console.log(data);
            history.push("/dashboard");
            
        })
        .catch(err => console.log(err));
    }


    return (

        <Container>
            <P className="lead loginHeadText text-center text-dark">Register</P>
            <Row className="mx-auto">
                <Col md={10} className="mx-auto">
                    <Form className="logForm bg-light p-4 text-dark">
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="RegisterFirstName">First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="RegisterFirstName"
                                        placeholder="John"
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="registerLastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="registerLastName"
                                        placeholder="Doe"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="registerEmail">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="registerEmail"
                                        placeholder="youremail@emil.com"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <FormGroup>
                            <Label for="registerAddress">Address</Label>
                            <Input
                                type="text"
                                name="address"
                                id="registerAddress"
                                placeholder="1234 Main St"
                                onChange={(e) => { setAddress(e.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="registerAddress2">Address 2</Label>
                            <Input
                                type="text"
                                name="address2"
                                id="registerAddress2"
                                placeholder="Apartment, studio, or floor"
                                onChange={(e) => { setAddress2(e.target.value) }}
                            />
                        </FormGroup>
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="registerCity">City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        id="registerCity"
                                        placeholder="City"
                                        onChange={(e) => { setCity(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="registerState">State</Label>
                                    <Input 
                                    type="text" 
                                    name="state" 
                                    id="registerState" 
                                    placeholder="State" 
                                    onChange={(e)=>{setStateReg(e.target.value)}}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="registerZip">Zip</Label>
                                    <Input 
                                    type="text" 
                                    name="zip" 
                                    id="registerZip" 
                                    placeholder="Zip" 
                                    onChange={(e)=>{setZip(e.target.value)}}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="registerPhone">Phone Number</Label>
                                    <Input 
                                    type="phone" 
                                    name="zip" 
                                    id="registerPhone" 
                                    placeholder="(407) 222-2222" 
                                    onChange={(e)=>{setPhoneNumber(e.target.value)}}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="registerPassword">Password</Label>
                                    <Input 
                                    type="password" 
                                    name="password" 
                                    id="registerPassword" 
                                    placeholder="Password" 
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="registerPasswordConfirm">Confirm Password</Label>
                                    <Input 
                                    type="password" 
                                    name="passwordconfirm" 
                                    id="registerPasswordConfirm" 
                                    placeholder="Confirm Password" 
                                    onChange={(e)=>{setPassword2(e.target.value)}}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button onClick={handleFormSubmit} color="dark" size="lg" block>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )


}


export default RegisterForm;