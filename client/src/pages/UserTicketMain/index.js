import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from "reactstrap";
import { P } from "../../components/Tags";
import API from "../../utils/API";
import MainNav from "../../components/MainNav";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { POST_ERROR } from "../../actions/actions";
import { addTicket, postSuccess } from "../../actions/ticketAction";
import { clearErrors } from "../../actions/authAction";



function TicketMain() {

    const user = useSelector(state => state.authReducer.user);
    const userTickets = useSelector(state => state.ticketReducer.userTickets);
    const isPostSuccess = useSelector(state => state.ticketReducer.isPostSuccess);
    const error = useSelector(state => state.errorReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    const [date] = useState(Date.now());
    const [tixId, setTixId] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [status] = useState("Submitted");
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        generateTixId();
        if (error.id === POST_ERROR) {
            setMsg(error.msg.msg)
        }

        if (isPostSuccess) {
            setMsg(null)
            dispatch(clearErrors());
            history.push("/user/ticketlist");
            dispatch(postSuccess());
        }

    }, [error, isPostSuccess])

    const handleTicketForm = (e) => {
        e.preventDefault();

        const dataObj = {
            userId: user._id,
            date,
            tixId,
            subject,
            description,
            status
        }
        dispatch(addTicket(dataObj))
    }

    const generateTixId = () => {
        let lastIdNum;
        if (userTickets.length === 0) {
            lastIdNum = 0
        } else {
            const lastId = userTickets.slice(-1)[0].tixId;
            lastIdNum = parseInt(lastId.split("-")[2])
        }
        const dateObj = new Date();
        const dateFormat = dateObj.getFullYear() + "" + (dateObj.getMonth() + 1) + "" + dateObj.getDate();
        const fullIdGen = dateFormat + "-" + user.firstName.charAt(0) + "" + user.lastName.charAt(0) + "-" + (lastIdNum + 1)
        setTixId(fullIdGen)
    }

    const dateToFormat = date;
    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row>
                    <Col md={12}>
                        <Form className="logForm bg-white mt-4 p-4 text-dark">
                            <h2 className="display-4 text-dark text-center">Request Service Ticket</h2>
                            {msg ? <Alert color="danger">{msg}</Alert> : null}
                            <Row form>
                                <Col md={6}><P className="mt-4"><Moment format="MMMM Do, YYYY">{dateToFormat}</Moment></P></Col>
                                <Col md={6}><P className="mt-4 text-right">Ticket ID: {tixId}</P></Col>
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
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Button onClick={handleTicketForm} color="dark">Submit Ticket</Button>
                            </Row>
                        </Form>
                    </Col>
                    <Col md={12} className="text-center">
                        <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-primary" onClick={history.goBack} />
                    </Col>
                </Row>

            </Container>
        </React.Fragment >

    )
}

export default TicketMain;