import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../components/Icon";
import "./style.css";




function Contact() {


    const user = useSelector(state => state.authReducer)
    const tickets = useSelector(state => state.ticketReducer.userTickets)
    const history = useHistory();
    const dispatch = useDispatch();





    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="mt-4 mb-4">
                    {/* <Col md={12} className="mb-4 text-center">
                        <Col className="text-dark nav-text" href="/"><Icon className="fas fa-clipboard-list text-dark fa-2x mr-3 ml-3 contactTitle"></Icon><span className="contactTitle">Ticket Generator</span></Col>

                    </Col> */}
                    <Col className="mt-4" md={6}>
                        <Row className="text-center pb-4">
                            <Col md={12} className="mt-4">
                                <span><Icon className="far fa-envelope fa-3x" /></span>
                                <P className="contactText text-dark">contact@companyweb.com</P>
                            </Col>
                            <Col md={12} className="mt-4">
                                <span><Icon className="fas fa-mobile-alt fa-3x"></Icon></span>
                                <P className="contactText">(407) 111-2233</P>
                            </Col>
                            <Col md={12} className="mt-4">
                                <span><Icon className="fas fa-street-view fa-3x"></Icon></span>
                                <P className="contactText">PO Box 987654, Orlando - FL 32801</P>
                            </Col>

                        </Row>
                    </Col>
                    <Col className="p-0 mt-4" md={6}>
                        <Row className="logForm">
                            <Col md={12}>
                                <Form className="mt-4 pl-4 pr-4 pb-0 pt-4 text-dark">
                                    <h2 className="display-4 text-dark text-center">Contact Form</h2>
                                    {/* {msg ? <Alert color="danger">{msg}</Alert> : null} */}
                                    <Row form>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="contactSubject">Subject</Label>
                                                <Input
                                                    type="text"
                                                    name="contactSubject"
                                                    id="contactSubject"
                                                    placeholder="Subject"
                                                // onChange={}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="contactDescription">Description</Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    id="contactDescription"
                                                    placeholder="Please, add your questions or concerns."
                                                // onChange={}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </Form><Col className="p-4" md={12}>
                                    <Button className="mt-1 mb-4 ml-1" color="dark">Submit Ticket</Button>
                                </Col>
                            </Col>
                        </Row>

                    </Col>



                </Row>

                <Row className="mb-4">
                    <Col md={12} className="text-center">
                        <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-primary" onClick={history.goBack} />
                    </Col>
                </Row>
            </Container >
        </React.Fragment >



    )

}

export default Contact;


