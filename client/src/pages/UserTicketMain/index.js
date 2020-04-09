import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { P } from "../../components/Tags";
import API from "../../utils/API";
import MainNav from "../../components/MainNav";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Icon from "../../components/Icon";



function TicketMain() {

    const user = useSelector(state => state.authReducer.user);
    const history = useHistory();

    const [date] = useState(Date.now());
    const [tixId, setTixId] = useState("0001-JA-0420");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const handleTicketForm = (e) => {
        e.preventDefault();

        const dataObj = {
            userId: user._id,
            date,
            tixId,
            subject,
            description
        }

        API.addTicket(dataObj)
            .then(data => {
                console.log(data);
                history.push("/ticketlist")
            })
            .catch(err => console.log(err));
    }

    const dateToFormat = date;
    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Form className="logForm bg-white mt-4 p-4 text-dark">
                    <h2 className="display-4 text-dark text-center">Request Service Ticket</h2>
                    <Row form>
                        <Col md={6}><P className="mt-4"><Moment format="MMMM Do YYYY">{dateToFormat}</Moment></P></Col>
                        <Col md={6}><P className="mt-4 text-right">Ticket ID: 0001-JA-0420</P></Col>
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
                <Icon className="far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 text-dark" onClick={history.goBack} />
            </Container>
        </React.Fragment >

    )
}

export default TicketMain;