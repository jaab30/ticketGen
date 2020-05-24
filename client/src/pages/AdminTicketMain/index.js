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
import MainNav from "../../components/MainNav";
import ImageLoader from "../../components/ImageLoader";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Icon from "../../components/Icon";
import { POST_ERROR } from "../../actions/actions";
import {
    addTicket,
    addImageNewTix,
    postSuccess,
    isLoadingImage,
    clearCurrentImages,
    imageDeleteNewTix
} from "../../actions/ticketAction";
import { clearErrors } from "../../actions/authAction";
import "./style.css";

function AdminTicketMain() {

    const { allUsers } = useSelector(state => state.authReducer);
    const { allTickets, currentImage, isPostSuccess, isLoading } = useSelector(state => state.ticketReducer);
    const error = useSelector(state => state.errorReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    const [date] = useState(Date.now());
    const [tixId, setTixId] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [status] = useState("Submitted");
    const [userId, setUserId] = useState(null);
    const [msg, setMsg] = useState(null);

    const [spinner, setSpinner] = useState("Submit Ticket")

    useEffect(() => {

        dispatch(isLoadingImage(false));

        generateTixId();

        if (error.id === POST_ERROR) {
            setMsg(error.msg.msg)
            setSpinner("Submit Ticket")
            dispatch(clearErrors());
        }

        if (isPostSuccess) {
            setMsg(null)
            dispatch(clearErrors());
            history.push("/admin/ticketlist");
            dispatch(postSuccess());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isPostSuccess, currentImage, history, dispatch])

    const handleTicketForm = (e) => {
        e.preventDefault();
        setSpinner(<Icon className="fas fa-spinner fa-pulse" />)

        const dataObj = {
            userId,
            date,
            tixId,
            subject,
            description,
            images: currentImage,
            status
        };
        dispatch(addTicket(dataObj));
        dispatch(clearCurrentImages());
    }

    const generateTixId = () => {

        const dateObj = new Date();
        const dateFormat = dateObj.getFullYear() + "" + (dateObj.getMonth() + 1) + "" + dateObj.getDate();
        const fullIdGen = dateFormat + "-admin-" + (allTickets.length + 1)
        setTixId(fullIdGen)
    };


    const dateToFormat = date;
    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="logForm mt-4">
                    <Col className="p-0" md={12}>
                        <Form className="pl-4 pr-4 pb-0 text-dark">
                            <h2 className="display-4 text-dark text-center" style={{ fontSize: "2.8em" }}>Request Service Ticket</h2>
                            {msg ? <Alert color="danger">{msg}</Alert> : null}
                            <Row form>
                                <Col md={4}><P className="mt-1"><Moment format="MMMM Do, YYYY">{dateToFormat}</Moment></P></Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="tixUserSelect">Select User</Label>
                                        <Input
                                            defaultValue={"Default"}
                                            type="select"
                                            name="select"
                                            id="tixUserSelect"
                                            onChange={(e) => setUserId(e.target.value)}
                                        >
                                            <option value="Default" disabled>Please select :</option>
                                            {allUsers.filter(user => user.role !== "admin").map((user, i) => (
                                                <option key={i} value={user._id}>{`${user.firstName} ${user.lastName}`}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={5}><P className="mt-1 tixid-text">Ticket ID: {tixId}</P></Col>
                                <Col md={12}>
                                    <FormGroup className="mb-1">
                                        <Label for="ticketSubject"><strong>Subject</strong></Label>
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
                                    <FormGroup className="mb-1">
                                        <Label for="ticketDescription"><strong>Description</strong></Label>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            id="ticketDescription"
                                            placeholder="Please, describe in detail the issue."
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Form>
                    </Col>
                    <Col className="pl-4 pr-4 pt-0" md={12}>
                        <P className="mb-1"><strong>Images:</strong></P>
                        <ImageLoader
                            _id={""}
                            images={[]}
                            currentImages={currentImage}
                            isLoading={isLoading}
                            error={error}
                            addImageAction={addImageNewTix}
                            removeImage={imageDeleteNewTix}
                        />
                    </Col>

                    <Col className="pl-4 pr-4 pt-1 text-center" md={12}>
                        <Button size="lg" block className="mt-1 mb-2" onClick={handleTicketForm} color="dark">{spinner}</Button>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={12} className="text-center">
                        <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-primary" onClick={history.goBack} />
                    </Col>
                </Row>
            </Container>
        </React.Fragment >

    )
}

export default AdminTicketMain;