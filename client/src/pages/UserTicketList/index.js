import React, { useEffect } from "react";
import Moment from "react-moment";
import { Container, Row, Col, Table } from 'reactstrap';
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { loadUserTickets, currentTicket } from "../../actions/ticketAction";
import { Link, useHistory } from "react-router-dom";
import Icon from "../../components/Icon";
import "./style.css"


function UserTicketList() {

    const tickets = useSelector(state => state.ticketReducer.userTickets)
    const dispatch = useDispatch()

    const history = useHistory();

    useEffect(() => {
        dispatch(loadUserTickets());
    }, [])

    const statusIcon = (index) => {

        if (tickets[index].status === "Submitted") {
            return `fas fa-file-import fa-1x ml-2 text-primary`
        } else if (tickets[index].status === "In Progress") {
            return `fas fa-spinner fa-1x ml-2 text-warning`
        } else {
            return `test`
        }
    }
    const showTicket = (id) => {

        dispatch(currentTicket(id))
        history.push("/user/ticketdetails");
    }


    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="justify-content-center listRow mb-4">
                    <Col md={12} className="mb-4">
                        <H1 className="display-4 text-center mt-4 mb-1" style={{ fontSize: "2.8em" }}>Tickets</H1>
                    </Col>
                    <Col md={10}>
                        {tickets.length === 0 ?
                            <Col>
                                <P className="text-center" style={{ fontSize: "1.2em" }}>You haven't submitted any tickets yet.</P>
                                <P className="text-center" style={{ fontSize: "1.2em" }}>If you like to submit a ticket, please click <Link to={"/user/ticketrequest"}>HERE</Link></P>
                            </Col>
                            :
                            <Table className="table-hover bk-dark" bordered>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Subject</th>
                                        <th>Status</th>
                                        <th>Date Submitted</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, i) => (
                                        <tr key={i} onClick={() => showTicket(ticket._id)}>
                                            <td>{ticket.tixId}</td>
                                            <td>{ticket.subject}</td>
                                            <td>{ticket.status}<Icon className={statusIcon(i)} /></td>
                                            <td><Moment format="MMMM Do, YYYY">{ticket.date}</Moment></td>
                                            <td><Icon className="fas fa-info-circle fa-1x ml-3 text-warning" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    </Col>
                    <Col md={12} className="text-center">
                        <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-primary" onClick={history.goBack} />
                    </Col>
                </Row>

            </Container>
        </React.Fragment>
    )
}

export default UserTicketList;
