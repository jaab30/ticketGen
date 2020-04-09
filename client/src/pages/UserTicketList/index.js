import React, { useEffect } from "react";
import { Container, Row, Col, Table } from 'reactstrap';
import { H1 } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { loadUserTickets } from "../../actions/ticketAction";
import { useHistory } from "react-router-dom";
import Icon from "../../components/Icon";


function UserTicketList() {


    const user = useSelector(state => state.authReducer)
    const tickets = useSelector(state => state.ticketReducer.userTickets)
    const dispatch = useDispatch()

    const history = useHistory();

    useEffect(() => {
        dispatch(loadUserTickets());
    }, [])


    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} className="mt-4 mb-4">
                        <H1 className="display-4 text-center mt-4 mb-4">Tickets</H1>
                    </Col>
                    <Col md={10}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Date Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket, i) => (
                                    <tr>
                                        <th scope="row">{ticket.tixId}</th>
                                        <td>{ticket.subject}</td>
                                        <td>Status</td>
                                        <td>{ticket.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Icon className="far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-dark" onClick={history.goBack} />
            </Container>
        </React.Fragment>
    )
}

export default UserTicketList;
