import React, { useEffect } from "react";
import Moment from "react-moment";
import { Container, Row, Col, Table } from 'reactstrap';
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentImages } from "../../actions/ticketAction";
import { loadAllMessages } from "../../actions/messageAction";
import { useHistory } from "react-router-dom";
import Icon from "../../components/Icon";
import "./style.css"


function AdminMessagesList() {

    const messages = useSelector(state => state.messageReducer.messages)

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(loadAllMessages());
        dispatch(clearCurrentImages());
    }, [dispatch])


    const showMessage = (id) => {
        history.push("/admin/messages/" + id);
    }


    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="justify-content-center listRow mb-4">
                    <Col md={12} className="mb-4">
                        <H1 className="display-4 text-center mt-4 mb-1" style={{ fontSize: "2.8em" }}>Messages</H1>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        {messages.length === 0 ?
                            <Col>
                                <P className="text-center" style={{ fontSize: "1.2em" }}>You don't have any messages</P>
                            </Col>
                            :
                            <Table className="table-hover bk-dark" bordered>
                                <thead>
                                    <tr>
                                        <th>From</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Date Submitted</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((message, i) => (
                                        <tr key={i} onClick={() => showMessage(message._id)}>
                                            <td>{`${message.userId.firstName} ${message.userId.lastName}`}</td>
                                            <td>{message.userId.email}</td>
                                            <td>{message.subject}<Icon className="" /></td>
                                            <td><Moment format="MMMM Do, YYYY">{message.date}</Moment></td>
                                            <td><Icon title="Status" className="" />{message.isMessageNew ? <Icon title="New Message" className="far fa-envelope fa-1x text-danger" /> : <Icon title="Read Message" className="far fa-envelope-open fa-1x text-success" />}</td>
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

export default AdminMessagesList;
