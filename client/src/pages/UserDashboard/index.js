import React, { useState, useEffect } from "react";
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
    Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { P } from "../../components/Text";
import API from "../../utils/API";


function UserDashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // useEffect(() => {
    //     API.getUser()
    //         .then(data => console.log(data))
    //         .catch(err => console.log(err));
    // })

    return (


        <React.Fragment>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Ticket Generator</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/usertix">Submit Ticket</NavLink>
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
                <Row>
                    <Col md={12}>
                        <h1 className="display-3 text-center text-dark">Hello !</h1>
                        <P>email: </P>
                        <P>First Name: </P>
                        <P>Last Name: </P>
                        <P>Address: </P>
                        <P>Address: </P>
                        <P>City: </P>
                        <P>State: </P>
                        <P>Zip: </P>
                        <P>Phone Number: </P>
                        <Button color="dark" size="lg" block>Update Profile Info</Button>
                        <Link to="/usertix"><Button className="mt-2 mb-2" color="success" size="lg" block>Submit a Ticket</Button></Link>
                        <Button color="warning" size="lg" block>Ticket Status</Button>
                        <Button color="secondary" size="lg" block>Contact</Button>
                    </Col>
                    {/* <Col md={6}>
                        <Row className="">
                            <Col md={12}><Button color="success" size="lg" block>Submit a Ticket</Button></Col>
                        </Row>
                        <Row>
                            <Col md={12}><Button color="warning" size="lg" block>Ticket Status</Button></Col>
                        </Row>
                        <Row>
                            <Col md={12}><Button color="secondary" size="lg" block>Contact</Button></Col>
                        </Row>
                    </Col> */}
                </Row>
            </Container>
        </React.Fragment>



    )

}

export default UserDashboard;


