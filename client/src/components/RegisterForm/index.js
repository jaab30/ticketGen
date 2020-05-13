import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
} from 'reactstrap';
import { P } from "../Tags";
import Icon from "../Icon";
import { useSelector, useDispatch } from "react-redux";
import { register, clearErrors } from "../../actions/authAction";


function RegisterForm() {

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const error = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();


    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [stateReg, setStateReg] = useState("");
    const [zip, setZip] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState(null);
    const [stateArr] = useState(['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'])
    const [spinner, setSpinner] = useState("Register")

    useEffect(() => {
        if (error.id === "REGISTER_FAIL") {
            setMsg(error.msg.msg)
            setSpinner("Register")
        } else {
            setMsg(null)
        }
        if (isAuthenticated) {
            dispatch(clearErrors());
            history.push("/user/dashboard");
        }

    }, [error, isAuthenticated, dispatch, history])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSpinner(<Icon className="fas fa-spinner fa-pulse" />)
        const dataObj = {
            firstName,
            lastName,
            email,
            address,
            address2,
            city,
            state: stateReg,
            zip,
            phoneNumber,
            password,
            confirmPassword,
            role: "resident"
        };

        dispatch(register(dataObj));
    }
    const formatPhone = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }


    return (

        <Container>
            <P className="lead loginHeadText text-center text-dark">Register</P>
            <Row className="mx-auto">
                <Col md={6} className="mx-auto">
                    <Form className="logForm bg-light p-4 text-dark">
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="RegisterFirstName">First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="RegisterFirstName"
                                        placeholder="John"
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="registerLastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="registerLastName"
                                        placeholder="Doe"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="registerEmail">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="registerEmail"
                                        placeholder="youremail@email.com"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <FormGroup>
                            <Label for="registerAddress">Address</Label>
                            <Input
                                type="text"
                                name="address"
                                id="registerAddress"
                                placeholder="1234 Main St"
                                onChange={(e) => { setAddress(e.target.value) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="registerAddress2">Apt, Suite, Unit:</Label>
                            <Input
                                type="text"
                                name="address2"
                                id="registerAddress2"
                                placeholder="Apartment, studio, or floor"
                                onChange={(e) => { setAddress2(e.target.value) }}
                            />
                        </FormGroup>
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="registerCity">City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        id="registerCity"
                                        placeholder="City"
                                        onChange={(e) => { setCity(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="registerState">State</Label>
                                    <Input
                                        defaultValue={"Default"}
                                        type="select"
                                        name="select"
                                        id="registerState"
                                        onChange={(e) => setStateReg(e.target.value)}
                                    >
                                        <option value="Default" disabled>State</option>
                                        {stateArr.map((state, i) => (
                                            <option key={i} value={state}>{state}</option>
                                        ))}

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="registerZip">Zip</Label>
                                    <Input
                                        type="text"
                                        name="zip"
                                        id="registerZip"
                                        placeholder="Zip"
                                        onChange={(e) => { setZip(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="registerPhone">Phone Number</Label>
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
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="registerPassword">Password <span className="font-italic" style={{ fontSize: ".8em" }}>(min. 6 characters)</span></Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="registerPassword"
                                        placeholder="Password"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="registerPasswordConfirm">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        name="passwordconfirm"
                                        id="registerPasswordConfirm"
                                        placeholder="Confirm Password"
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {msg ? <Alert color="danger">{msg}</Alert> : null}
                        <Button onClick={handleFormSubmit} color="dark" size="lg" block>{spinner}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )


}


export default RegisterForm;