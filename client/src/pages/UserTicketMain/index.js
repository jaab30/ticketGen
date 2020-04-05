import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Collapse,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { P } from "../../components/Text";
import API from "../../utils/API";



function TicketMain() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [date, setDate] = useState("04052020");
    const [tixId, setTixId] = useState("0001-JA-0420");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const handleTicketForm = (e) => {
        e.preventDefault();

        const dataObj = {
            userId: "5e896a49229be085c8f0b62e",
            date,
            tixId,
            subject,
            description
        } 

        API.addTicket(dataObj)
        .then( data => {
            console.log(data);
            
        })
        .catch( err => console.log(err));
    }


    return (
        <React.Fragment>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Ticket Generator</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Submit Ticket</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Ticket Status</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Contact</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText className="mr-3">Logout</NavbarText>
                    <NavbarText>User Dashboard</NavbarText>
                </Collapse>
            </Navbar>

            <Container>
                <Form className="logForm bg-light mt-4 p-4 text-dark">
                    <h2 className="display-4 text-dark text-center">Request Service Ticket</h2>
                    <Row form>
                        <Col md={6}><P className="mt-4">Date: 04/05/2020</P></Col>
                        <Col md={6}><P className="mt-4 text-right">Ticket ID: 0001-JA-0420</P></Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="ticketSubject">Subject</Label>
                                <Input
                                    type="text"
                                    name="subject"
                                    id="ticketSubject"
                                    placeholder="Subject"
                                    onChange={(e) => { setSubject(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="registerLastName">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="ticketDescription"
                                    placeholder="Please, describe in detail the issue."
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                />
                            </FormGroup>
                        </Col>
                        <Button onClick={handleTicketForm} color="dark">Submit Ticket</Button>
                    </Row>
                </Form>
            </Container>
        </React.Fragment>

    )
}

export default TicketMain;