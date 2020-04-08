import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors } from "../../actions/authAction";
import { P } from "../Text";


function Login() {
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const error = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if (error.id === "LOGIN_FAIL") {
            setMsg(error.msg.msg)
        } else {
            setMsg(null)
        }
        if (isAuthenticated) {
            dispatch(clearErrors());
            history.push("/dashboard");
        }

    }, [error, isAuthenticated, dispatch, history])


    const handleFormSubmit = (e) => {
        e.preventDefault();

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
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <Form className="logForm bg-white p-4 text-dark">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="Please enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="Please enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Select</Label>
                            <Input
                                defaultValue={"Default"}
                                type="select"
                                name="select"
                                id="exampleSelect"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Default" disabled>Please select:</option>
                                <option value="resident">Resident</option>
                                <option value="manager">Manager</option>
                                <option value="administrator">Administrator</option>
                            </Input>
                        </FormGroup>
                        <Button onClick={handleFormSubmit} color="dark" size="lg" block>LogIn</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default Login;