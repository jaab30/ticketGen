import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { H1, P } from "../Tags";
import Icon from "../Icon";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, updateSuccess } from "../../actions/authAction";
import { UPDATE_ERROR } from "../../actions/actions";
import { clearErrors } from "../../actions/authAction";

export default function UpdateUserForm(props) {

    const auth = useSelector(state => state.authReducer);
    const error = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();

    const { user, isUpdateSuccess } = auth;

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [address, setAddress] = useState(user.address);
    const [address2, setAddress2] = useState(user.address2);
    const [city, setCity] = useState(user.city);
    const [stateReg, setStateReg] = useState(user.state);
    const [zip, setZip] = useState(user.zip);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [msg, setMsg] = useState(null);

    const [spinner, setSpinner] = useState("Submit Changes")


    useEffect(() => {
        if (error.id === UPDATE_ERROR) {
            setMsg(error.msg.msg);
            setSpinner("Submit Changes")

        }
        if (isUpdateSuccess) {
            setMsg(null)
            dispatch(clearErrors());
            props.hideUpdateForm();
            dispatch(updateSuccess());
        }

    }, [error, isUpdateSuccess, props, dispatch])

    const formatPhone = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSpinner(<Icon className="fas fa-spinner fa-pulse" />)

        const dataObj = {
            firstName,
            lastName,
            address,
            address2,
            city,
            state: stateReg,
            zip,
            phoneNumber
        };

        dispatch(updateProfile(user._id, dataObj));

    }

    return (
        <React.Fragment>
            <Col md={6} className="mt-4 profileInfo">
                <Form className="logForm bg-light p-4 text-dark">
                    <Col md={12} className=" text-right">
                        <Icon onClick={props.hideUpdateForm} className="far fa-window-close update-icon" ></Icon>
                    </Col>
                    <Row>
                        <Col md={12}> <H1 className="display-5 mb-4 mt-1 text-center text-dark">Update Profile</H1></Col>
                        <Col md={12}>
                            {msg ? <Alert color="danger">{msg}</Alert> : null}
                        </Col>
                        <Col md={12}> <P className="bk-white"><strong>email:</strong> {user.email}</P>
                        </Col>
                        <Col md={6} className=""> <P><strong>First Name:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="RegisterFirstName"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={6} className=""> <P><strong>Last Name:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="registerLastName"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}> <P><strong>Address:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="address"
                                    id="registerAddress"
                                    placeholder="1234 Main St"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}> <P><strong>Apt, Suite, Unit:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="address2"
                                    id="registerAddress2"
                                    placeholder="Apartment, studio, or floor"
                                    value={address2}
                                    onChange={(e) => { setAddress2(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4} className=""> <P><strong>City:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="city"
                                    id="registerCity"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4} className="">  <P><strong>State:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="state"
                                    id="registerState"
                                    placeholder="State"
                                    value={stateReg}
                                    onChange={(e) => { setStateReg(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4} className=""> <P><strong>Zip:</strong></P>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="zip"
                                    id="registerZip"
                                    placeholder="Zip"
                                    value={zip}
                                    onChange={(e) => { setZip(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}> <P><strong>Phone#:</strong></P>
                            <FormGroup>
                                <Input
                                    type="phone"
                                    name="zip"
                                    id="registerPhone"
                                    placeholder="(407) 222-2222"
                                    value={formatPhone(phoneNumber)}
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <Button onClick={handleFormSubmit} color="dark" size="lg" block>{spinner}</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </React.Fragment>
    )
}



