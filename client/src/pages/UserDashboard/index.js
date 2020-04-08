import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { P } from "../../components/Text";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { loadUserTickets } from "../../actions/ticketAction";




function UserDashboard() {


    const user = useSelector(state => state.authReducer)
    const tickets = useSelector(state => state.ticketReducer.userTickets)
    const dispatch = useDispatch()
    const { firstName } = user.user

    useEffect(() => {
        dispatch(loadUserTickets());
    }, [])


    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row>
                    <Col md={6}>
                        <h1 className="display-3 text-center text-dark">Hello {firstName}!</h1>
                        <P>email: </P>
                        <P>First Name: </P>
                        <P>Last Name: </P>
                        <P>Address: </P>
                        <P>Address: </P>
                        <P>City: </P>
                        <P>State: </P>
                        <P>Zip: </P>
                        <P>Phone Number: </P>
                    </Col>
                    <Col md={6}>
                        {tickets.map((ticket, i) => (
                            <Row key={i}>
                                <Col md={12}>{i} | {ticket.subject} | {ticket.date} </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>

                <Row>
                    <Col md={3}><Button color="success" size="lg" block>Submit a Ticket</Button></Col>

                    <Col md={3}><Link to="/ticketrequest"><Button color="success" size="lg" block>Submit a Ticket</Button></Link></Col>

                    <Col md={3}><Button color="warning" size="lg" block>Ticket Status</Button></Col>

                    <Col md={3}><Button color="secondary" size="lg" block>Contact</Button></Col>
                </Row>

            </Container>
        </React.Fragment>



    )

}

export default UserDashboard;


