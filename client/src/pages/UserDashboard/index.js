import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { loadUserTickets } from "../../actions/ticketAction";
import "./style.css";




function UserDashboard() {


    const user = useSelector(state => state.authReducer)
    const tickets = useSelector(state => state.ticketReducer.userTickets)
    const dispatch = useDispatch()
    const { firstName, lastName, email, address, address2, city, state, zip, phoneNumber } = user.user



    useEffect(() => {
        dispatch(loadUserTickets());
    }, [])

    const formatPhone = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }


    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="mt-4 mb-4">
                    <Col md={6} className="text-center">
                        <H1 className="display-4 mb-4 mt-3 text-center text-dark">Hello {firstName}!</H1>

                        <ProfileImage />
                    </Col>
                    <Col md={6} className="mt-4 profileInfo">
                        <Row>
                            <Col md={12}> <H1 className="display-5 mb-4 mt-1 text-center text-dark">Profile Info</H1></Col>
                            <Col md={12}> <P clssName="bk-white"><strong>email:</strong> {email}</P></Col>
                            <Col md={6} className="pr-2"> <P><strong>First Name:</strong> {firstName}</P></Col>
                            <Col md={6} className="pl-0"> <P><strong>Last Name:</strong> {lastName}</P></Col>
                            <Col md={12}> <P><strong>Address:</strong> {address}</P></Col>
                            <Col md={12}> <P><strong>Apt, Suite, Unit:</strong> {address2}</P></Col>
                            <Col md={4} className="pr-2"> <P><strong>City:</strong> {city}</P></Col>
                            <Col md={4} className="pr-2 pl-0">  <P><strong>State:</strong> {state}</P></Col>
                            <Col md={4} className="pl-0"> <P><strong>Zip:</strong> {zip}</P></Col>
                            <Col md={6}> <P><strong>Phone#:</strong> {formatPhone(phoneNumber)} </P></Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col md={3} className="mt-4"><Link to="/ticketrequest"><Button outline color="secondary" size="lg" block>Submit a Ticket</Button></Link></Col>
                    <Col md={3} className="mt-4"><Link to="/ticketlist"><Button outline color="secondary" size="lg" block>Ticket Status</Button></Link></Col>
                    <Col md={3} className="mt-4"><Button outline color="secondary" size="lg" block>Update Profile</Button></Col>
                    <Col md={3} className="mt-4"><Button outline color="secondary" size="lg" block>Contact</Button></Col>
                </Row>

            </Container>
        </React.Fragment>



    )

}

export default UserDashboard;


