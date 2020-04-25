import React, { useState, useEffect } from "react";
import "./style.css";
import Moment from "react-moment";
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput, Button, Alert, Spinner } from 'reactstrap';
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComment, postSuccess, addImage, isLoadingImage } from "../../actions/ticketAction";
import { COMMENT_ERROR, IMAGE_ERROR } from "../../actions/actions";
import { clearErrors } from "../../actions/authAction";
import Icon from "../../components/Icon";
import loading from "./images/loading.gif"



function UserTicketDetail() {

    const user = useSelector(state => state.authReducer.user);
    const ticket = useSelector(state => state.ticketReducer);

    const isPostSuccess = useSelector(state => state.ticketReducer.isPostSuccess);
    const error = useSelector(state => state.errorReducer);
    const { _id, tixId, date, subject, description, status, comments, images } = ticket.currentTicket;
    const { isLoading } = ticket;
    const history = useHistory();
    const dispatch = useDispatch();

    const [commentPost, setCommentPost] = useState("");
    const [image, setImage] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [msgComment, setMsgComment] = useState(null);
    const [msgImage, setMsgImage] = useState(null);

    const { firstName, lastName } = user;

    useEffect(() => {

        if (error.id === COMMENT_ERROR) {
            setMsgComment(error.msg.msg)
            dispatch(isLoadingImage(false))
        }
        if (error.id === IMAGE_ERROR) {
            setMsgImage(error.msg.msg)
            dispatch(isLoadingImage(false))
        }

        if (isPostSuccess) {
            setMsgComment(null)
            setMsgImage(null)
            dispatch(clearErrors());
            dispatch(postSuccess());
        }
    }, [error, isPostSuccess])


    const handleImageForm = (e) => {
        e.preventDefault();
        dispatch(isLoadingImage(true))
        const formData = new FormData();
        formData.append('file', image)
        formData.append('tixId', _id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        dispatch(addImage(formData, config))
        // setIsLoaded(!isLoaded);
        const inputImage = document.querySelector(".file-input");
        inputImage.childNodes[1].textContent = "Upload your Image"

    }

    const handleCommentsForm = (e) => {
        e.preventDefault();

        const commentObj = {
            date: Date.now(),
            text: commentPost,
            from: `${firstName} ${lastName}`
        };

        dispatch(addComment(_id, commentObj));
        setIsLoaded(!isLoaded);
        setCommentPost("");

    }

    const clearAndBack = () => {
        setMsgComment(null)
        setMsgImage(null)
        dispatch(clearErrors());
        history.goBack();
        dispatch(postSuccess());
    }

    const statusIcon = () => {

        if (status === "Submitted") {
            return `fas fa-file-import fa-1x ml-2 text-primary`
        } else if (status === "In Progress") {
            return `fas fa-spinner fa-1x ml-2 text-warning`
        } else {
            return `test`
        }
    }

    return (
        <React.Fragment>
            <MainNav />
            <Container>
                <Row className="justify-content-center listRow">
                    <Col md={10} className="mt-4 mb-4">
                        <H1 className="display-4 text-center mt-4 mb-1">Ticket Details</H1>
                    </Col>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Row form className="detail-container">
                                <Col md={6}>
                                    <P className="mt-4"><strong>Ticket Id:</strong> {tixId}</P>
                                    <P className="mt-1"><strong>Date Submitted: </strong><Moment format="MMMM Do, YYYY">{date}</Moment></P>
                                </Col>
                                <Col md={6}><P className="mt-4 text-right status-text"><Icon className={statusIcon()} /> <strong>{status}</strong></P></Col>

                                <Col md={12}>
                                    <Row>
                                        <Col md={12}>
                                            <P className="mt-1"><strong>Subject:</strong> {subject}</P>
                                        </Col>
                                        <Col md={12}>
                                            <P className="mt-1"><strong>Description:</strong></P>
                                        </Col>
                                        <Col md={12} className="detail-box-wrapper">
                                            <P className="mt-1"> {description} </P>
                                        </Col>

                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}>
                                            <P className="mt-1"><strong>Comments:</strong></P>
                                        </Col>
                                        <Col md={12} className="detail-box-wrapper pt-2 pb-2">
                                            {comments.map((comment, i) => (
                                                <Row key={i} className="comment-wrapper">
                                                    <Col md={6} className="single-comment-col">
                                                        <P className="comment-text"><strong>From:</strong> {comment.from}</P>
                                                    </Col>
                                                    <Col md={6} className="single-comment-col">
                                                        <P className="comment-text text-right"><strong>Date posted:</strong> <Moment format="MMMM Do, YYYY">{comment.date}</Moment></P>
                                                    </Col>
                                                    <Col md={12} className="single-comment-col">

                                                        <P className="comment-text"><strong>Comment: </strong>{comment.text} </P>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </Col>

                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <P className="mt-1"><strong>Images:</strong></P>
                                    <Form onSubmit={handleImageForm}>
                                        {msgImage ? <Alert color="danger">{msgImage}</Alert> : null}
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <CustomInput
                                                        className="file-input"
                                                        type="file"
                                                        id="ImageBrowser"
                                                        name="file"
                                                        label="Upload your Image"
                                                        onChange={(e) => { setImage(e.target.files[0]) }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={2}>
                                                <Button type="submit" color="dark">Submit Image</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                                <Col md={12} className="detail-box-wrapper">
                                    {isLoading ? <Row><Col className="text-center" md={12}><Icon className="text-center mt-3 fas fa-spinner fa-pulse fa-3x" /></Col></Row> : images.map((img, i) => {
                                        return <div className="loading"><img key={i} className="tixImages" src={"/api/ticket/image/" + img} width="100%" /></div>
                                    })}
                                </Col>
                                <Col md={12}>
                                    <Form className="logForm bg-white mt-4 p-4 text-dark">
                                        {msgComment ? <Alert color="danger">{msgComment}</Alert> : null}
                                        <Row form>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="ticketComments"><strong>Add Comments</strong></Label>
                                                    <Input
                                                        type="textarea"
                                                        name="comments"
                                                        id="ticketComments"
                                                        placeholder="Please, add a any comments. They will be sent as messages to the administrator."
                                                        onChange={(e) => { setCommentPost(e.target.value) }}
                                                        value={commentPost}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Button onClick={handleCommentsForm} color="dark">Submit Comments</Button>
                                        </Row>
                                    </Form>
                                </Col>

                            </Row>

                        </Col>
                        <Col md={12} className="text-center">
                            <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 mb-4 text-primary" onClick={clearAndBack} />
                        </Col>
                    </Row>

                </Row>
            </Container>
        </React.Fragment>

    )
}

export default UserTicketDetail;
