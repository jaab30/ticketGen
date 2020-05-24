import React, { useEffect } from "react";
import Moment from "react-moment";
import { Container, Row, Col, Table } from 'reactstrap';
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { loadAllTickets, currentTicket, clearCurrentImages } from "../../actions/ticketAction";
import { Link, useHistory } from "react-router-dom";
import Icon from "../../components/Icon";
import "./style.css"


function UserTicketList() {

    const tickets = useSelector(state => state.ticketReducer.allTickets)
    const dispatch = useDispatch()

    const history = useHistory();

    useEffect(() => {
        dispatch(loadAllTickets());
        dispatch(clearCurrentImages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ticketStatusIcon = (index) => {

        if (tickets[index].status === "Submitted") {
            return `fas fa-file-import fa-1x ml-2 text-primary`
        } else if (tickets[index].status === "In Progress") {
            return `fas fa-spinner fa-1x ml-2 text-warning`
        } else if (tickets[index].status === "Completed") {
            return `fas fa-check fa-1x ml-2 text-success`
        } else if (tickets[index].status === "Received") {
            return `far fa-envelope-open fa-1x ml-2 text-success`
        } else {
            return ``
        }
    }

    const status = (index) => {
        if (tickets[index].status === "Submitted") {
            return `far fa-envelope fa-1x text-danger tixListIcon`
        } else {
            return `far fa-envelope-open fa-1x text-success tixListIcon`
        }
    }


    const showTicket = (id) => {
        dispatch(currentTicket(id))
        history.push("/admin/ticketdetails");
    }


    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="justify-content-center listRow mb-4">
                    <Col md={12} className="mb-4">
                        <H1 className="display-4 text-center mt-4 mb-1" style={{ fontSize: "2.8em" }}>Tickets</H1>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
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
                                        <th>Ticket Status</th>
                                        <th>Date Submitted</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, i) => (
                                        <tr key={i} onClick={() => showTicket(ticket._id)}>
                                            <td>{ticket.tixId}</td>
                                            <td>{ticket.subject}</td>
                                            <td>{ticket.status}<Icon className={ticketStatusIcon(i)} /></td>
                                            <td><Moment format="MMMM Do, YYYY">{ticket.date}</Moment></td>
                                            <td><Icon title="Status" className={status(i)} />{ticket.newUserComment ? <Icon title="New Comment" className="fas fa-folder-plus fa-1x ml-3 text-danger" /> : ""}</td>
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
