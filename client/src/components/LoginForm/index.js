import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors } from "../../actions/authAction";
import { P } from "../Tags";
import Icon from "../Icon";



function Login() {
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const error = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState(null);
    const [spinner, setSpinner] = useState("Login")


    useEffect(() => {
        if (error.id === "LOGIN_FAIL") {
            setMsg(error.msg.msg)
            setSpinner("Login")
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
            email,
            password,
            role
        };

        dispatch(login(dataObj));
    }

    return (
        <Container>
            <P className="lead loginHeadText text-center text-dark">Login</P>
            <Row className="mx-auto">
                <Col md={4} className="mx-auto">
                    <Form className="logForm bg-white p-4 text-dark">
                        <FormGroup>
                            <Label for="loginEmail">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="loginEmail"
                                placeholder="Please enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginPassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="loginPassword"
                                placeholder="Please enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginRoleSelect">Select</Label>
                            <Input
                                defaultValue={"Default"}
                                type="select"
                                name="select"
                                id="loginRoleSelect"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Default" disabled>Please select:</option>
                                <option value="resident">Resident</option>
                                <option value="administrator">Administrator</option>
                            </Input>
                        </FormGroup>
                        {msg ? <Alert color="danger">{msg}</Alert> : null}
                        <Button onClick={handleFormSubmit} color="dark" size="lg" block>{spinner}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default Login;