import React, { useState } from "react";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Collapse
} from "reactstrap";
import { Link } from "react-router-dom";
import Logout from "../Logout";


function MainNav() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    return (

        <Navbar color="white" className="border-bottom border-dark" light expand="md">
            <NavbarBrand href="/">Ticket Generator</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/ticketrequest">Submit Ticket</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/ticketlist">Ticket Status</Link>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Contact</NavLink>
                    </NavItem>
                </Nav>

                <NavbarText><Link className="nav-link" to="/dashboard">User Dashboard</Link></NavbarText>
                <NavbarText><Logout /></NavbarText>
            </Collapse>
        </Navbar>



    )
}

export default MainNav;