import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import ProfileImage from "../../components/ProfileImage";
import UpdateUserForm from "../../components/UpdateUserForm";
import { useSelector, useDispatch } from "react-redux";
import { loadAllUsers } from "../../actions/authAction";
import { loadAllTickets, clearCurrentImages } from "../../actions/ticketAction";
import Icon from "../../components/Icon";
import "./style.css";

function AdminDashboard() {

    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const { firstName, lastName, email, address, address2, city, state, zip, phoneNumber } = user;
    const [isUpdateForm, setIsUpdateForm] = useState(false);

    useEffect(() => {
        dispatch(loadAllTickets());
        dispatch(loadAllUsers());
        dispatch(clearCurrentImages());
    }, [dispatch])

    const formatPhone = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    const showUpdateForm = () => {
        setIsUpdateForm(!isUpdateForm);
    }

    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row>
                    <Col lg={6} className="text-center">
                        <H1 className="display-4 mb-4 mt-3 text-center text-dark">Hello {firstName}!</H1>
                        <ProfileImage />
                    </Col>
                    {isUpdateForm ?
                        <UpdateUserForm
                            hideUpdateForm={showUpdateForm}
                        /> :
                        <Col lg={6} className="mt-4 profileInfo">
                            <Row>
                                <Col lg={12}> <H1 className="display-5 mb-4 mt-1 text-center text-dark">Admin Info</H1></Col>
                                <Col lg={12} md={6}> <P className="bk-white"><strong>email:</strong> {email}</P></Col>
                                <Col lg={6} md={6}> <P><strong>First Name:</strong> {firstName}</P></Col>
                                <Col lg={6} md={6}> <P><strong>Last Name:</strong> {lastName}</P></Col>
                                <Col lg={12} md={6}> <P><strong>Address:</strong> {address}</P></Col>
                                <Col lg={12} md={6}> <P><strong>Apt, Suite, Unit:</strong> {address2}</P></Col>
                                <Col lg={4} md={6}> <P><strong>City:</strong> {city}</P></Col>
                                <Col lg={4} md={6}>  <P><strong>State:</strong> {state}</P></Col>
                                <Col lg={4} md={6}> <P><strong>Zip:</strong> {zip}</P></Col>
                                <Col lg={6} md={6}> <P><strong>Phone#:</strong> {formatPhone(phoneNumber)} </P></Col>
                            </Row>
                        </Col>
                    }
                </Row>

                <Row className="mt-4 mb-4 pb-4">
                    <Col lg={3} md={6} className="mt-4"><Link className="dash-link" to="/admin/ticketrequest"><Button outline color="secondary" size="lg" block> <Icon className="far fa-clipboard fa-1x mr-3 dash-icon" />Submit a Ticket</Button></Link></Col>

                    <Col lg={3} md={6} className="mt-4"><Link className="dash-link" to="/admin/ticketlist"><Button outline color="secondary" size="lg" block><Icon className="far fa-hourglass fa-1x mr-3 dash-icon" />Ticket Status</Button></Link></Col>

                    <Col lg={3} md={6} className="mt-4"><Button onClick={showUpdateForm} outline color="secondary" size="lg" block><Icon className="far fa-edit fa-1x mr-3 dash-icon" />Update Profile</Button></Col>

                    <Col lg={3} md={6} className="mt-4"><Link className="dash-link" to="/admin/messages"><Button outline color="secondary" size="lg" block><Icon className="far fa-question-circle fa-1x mr-3 dash-icon" />Messages</Button></Link></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default AdminDashboard;


