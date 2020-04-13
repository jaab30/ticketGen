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
import Icon from "../Icon";
import Logout from "../Logout";
import "./style.css";


function MainNav() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    return (

        <Navbar color="white" className="border-bottom border-primary" light expand="md">
            <NavbarBrand className="text-primary nav-text" href="/"><Icon className="fas fa-clipboard-list text-primary fa-1x mr-3 ml-3"></Icon>Ticket Generator</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/user/ticketrequest">Submit Ticket</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/user/ticketlist">Ticket Status</Link>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Contact</NavLink>
                    </NavItem>
                </Nav>

                <NavbarText><Link className="nav-link" to="/user/dashboard">User Dashboard</Link></NavbarText>
                <NavbarText><Logout /></NavbarText>
            </Collapse>
        </Navbar>



    )
}

export default MainNav;