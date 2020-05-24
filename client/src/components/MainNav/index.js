import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Collapse
} from "reactstrap";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Logout from "../Logout";
import { Span } from "../Tags";
import "./style.css";

function MainNav() {

    const { user } = useSelector(state => state.authReducer);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <React.Fragment>
            {user.role === "resident" ?
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
                                <Link className="nav-link" to="/user/contact">Contact</Link>
                            </NavItem>
                        </Nav>

                        <Span className="nav-text"><Link className="nav-link nav-brand-text" to="/user/dashboard">User Dashboard</Link></Span>
                        <Span className="nav-text"><Logout className="nav-link nav-brand-text" /></Span>
                    </Collapse>
                </Navbar>
                :
                <Navbar color="white" className="border-bottom border-success" light expand="md">
                    <NavbarBrand className="text-success nav-text" href="/"><Icon className="fas fa-clipboard-list text-success fa-1x mr-3 ml-3"></Icon>Ticket Generator</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>

                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="/admin/ticketrequest">Submit Ticket</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/admin/ticketlist">Ticket Status</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/admin/messages">Messages</Link>
                            </NavItem>
                        </Nav>

                        <Span className="nav-text"><Link className="nav-link nav-brand-text-admin" to="/admin/dashboard">Admin Dashboard</Link></Span>
                        <Span className="nav-text"><Logout className="nav-link nav-brand-text-admin" /></Span>
                    </Collapse>
                </Navbar>
            }
        </React.Fragment>
    )
}

export default MainNav;