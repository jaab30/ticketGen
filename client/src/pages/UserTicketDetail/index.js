import React, { useState, useEffect } from "react";
import "./style.css";
import Moment from "react-moment";
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput, Button, Alert } from 'reactstrap';
import { H1, P } from "../../components/Tags";
import MainNav from "../../components/MainNav";
import ImageLoader from "../../components/ImageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addComment, postSuccess, addImage, isLoadingImage } from "../../actions/ticketAction";
import { COMMENT_ERROR } from "../../actions/actions";
import { clearErrors } from "../../actions/authAction";
import Icon from "../../components/Icon";

function UserTicketDetail(props) {

    const user = useSelector(state => state.authReducer.user);
    const ticket = useSelector(state => state.ticketReducer);

    const isPostSuccess = useSelector(state => state.ticketReducer.isPostSuccess);
    const error = useSelector(state => state.errorReducer);
    const { _id, tixId, date, subject, description, status, comments, images } = ticket.currentTicket;
    const { isLoading } = ticket;
    const history = useHistory();
    const dispatch = useDispatch();

    const [commentPost, setCommentPost] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [msgComment, setMsgComment] = useState(null);

    const { firstName, lastName } = user;

    useEffect(() => {

        if (error.id === COMMENT_ERROR) {
            setMsgComment(error.msg.msg)
            dispatch(isLoadingImage(false))
        }

        if (isPostSuccess) {
            setMsgComment(null)
            dispatch(clearErrors());
            dispatch(postSuccess());
        }
    }, [error, isPostSuccess])


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

    // const clearAndBack = () => {
    //     setMsgComment(null)
    //     dispatch(clearErrors());
    //     history.goBack();
    //     dispatch(postSuccess());
    // }

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
                                    <P className="mt-1 mb-1"><strong>Images:</strong></P>
                                </Col>
                                <ImageLoader
                                    _id={_id}
                                    images={images}
                                    isLoading={isLoading}
                                    error={error}
                                    addImageAction={addImage}
                                />

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
                            <Icon className="back-btn far fa-arrow-alt-circle-left fa-2x mt-3 ml-3 mb-4 text-primary" onClick={history.goBack} />
                        </Col>
                    </Row>

                </Row>
            </Container>
        </React.Fragment>

    )
}

export default UserTicketDetail;
