import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postMessages, postMessageSuccess } from "../../actions/messageAction";
import { clearCurrentImages } from "../../actions/ticketAction";
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
import { MESSAGE_ERROR } from "../../actions/actions";
import { clearErrors } from "../../actions/authAction";
import { useHistory } from "react-router-dom";
import { P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import Icon from "../../components/Icon";
import "./style.css";

function UserContact() {

    const user = useSelector(state => state.authReducer.user)
    const { isPostMessageSuccess } = useSelector(state => state.messageReducer)
    const error = useSelector(state => state.errorReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    const [messageSubject, setMessageSubject] = useState("");
    const [messageDescription, setMessageDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        dispatch(clearCurrentImages());

        if (error.id === MESSAGE_ERROR) {
            setMsg(error.msg.msg)
            dispatch(clearErrors());
        }

        if (isPostMessageSuccess) {
            dispatch(postMessageSuccess())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, dispatch])

    const handleForm = (e) => {
        e.preventDefault()
        setSuccessMessage(true)
        setMsg(null)

        const messageObj = {
            userId: user._id,
            subject: messageSubject,
            description: messageDescription,
            isMessageNew: true
        }

        dispatch(postMessages(messageObj));
        setMessageSubject("");
        setMessageDescription("");
    }

    return (

        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="mt-4 mb-4">
                    <Col className="contactInfo" md={5}>
                        <Row className="text-center pb-4">
                            <Col md={12} className="mt-4">
                                <span><Icon className="far fa-envelope fa-3x" /></span>
                                <P className="contactText text-dark">contact@companyweb.com</P>
                            </Col>
                            <Col md={12} className="mt-4">
                                <span><Icon className="fas fa-mobile-alt fa-3x"></Icon></span>
                                <P className="contactText">(407) 111-2233</P>
                            </Col>
                            <Col md={12} className="mt-4">
                                <span><Icon className="fas fa-street-view fa-3x"></Icon></span>
                                <P className="contactText">PO Box 987654, Orlando - FL 32801</P>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="p-0 mt-4" md={6}>
                        <Row className="logForm">
                            <Col md={12}>
                                <Form className="mt-4 pl-4 pr-4 pb-0 pt-4 text-dark">
                                    <h2 className="display-4 text-dark text-center">Contact Form</h2>
                                    {/* {msg ? <Alert color="danger">{msg}</Alert> : null} */}
                                    <Row form>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="contactSubject">Subject</Label>
                                                <Input
                                                    type="text"
                                                    name="contactSubject"
                                                    id="contactSubject"
                                                    placeholder="Subject"
                                                    value={messageSubject}
                                                    onChange={(e) => setMessageSubject(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="contactDescription">Description</Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    id="contactDescription"
                                                    placeholder="Please, add your questions or concerns."
                                                    value={messageDescription}
                                                    onChange={(e) => setMessageDescription(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Col className="p-0" md={12}>
                                        {msg ?
                                            <>
                                                <Alert color="danger">{msg}</Alert>
                                                <Button onClick={handleForm} className="mt-1 mb-4" color="dark" size="lg" block>Submit Ticket</Button>
                                            </> :
                                            isPostMessageSuccess ?
                                                <>
                                                    <Alert color="success">Message Submitted..!</Alert>
                                                    <Button onClick={handleForm} className="mt-1 mb-4" color="dark" size="lg" block>Submit Ticket</Button>
                                                </> : <Button onClick={handleForm} className="mt-1 mb-4" color="dark" size="lg" block>{successMessage ? <Icon className="fas fa-spinner fa-pulse" /> : "Submit Message"}</Button>}
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={12} className="text-center">
                        <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-primary" onClick={history.goBack} />
                    </Col>
                </Row>
            </Container >
        </React.Fragment >
    )
}

export default UserContact;


