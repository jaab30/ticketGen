import React, { useState, useEffect } from "react";
import "./style.css";
import { Row, Col, Form, FormGroup, CustomInput, Button, Alert } from 'reactstrap';
import { P } from "../Tags";
import { useDispatch } from "react-redux";
import { addImage, isLoadingImage } from "../../actions/ticketAction";
import { IMAGE_ERROR } from "../../actions/actions";

import Icon from "../Icon";


function ImageLoader(props) {

    // const ticket = useSelector(state => state.ticketReducer);

    // const error = useSelector(state => state.errorReducer);
    // const { _id, images } = ticket.currentTicket;
    // const { isLoading, isPostSuccess } = ticket;
    const dispatch = useDispatch();

    const [image, setImage] = useState("");
    const [msgImage, setMsgImage] = useState(null);

    useEffect(() => {

        if (props.error.id === IMAGE_ERROR) {
            setMsgImage(props.error.msg.msg)
            dispatch(isLoadingImage(false))
        }

    }, [props.error])

    const handleImageForm = (e) => {
        e.preventDefault();
        dispatch(isLoadingImage(true))
        const formData = new FormData();
        formData.append('file', image)
        formData.append('tixId', props._id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        dispatch(props.addImageAction(formData, config))
        setMsgImage(null)
        const inputImage = document.querySelector(".file-input");
        inputImage.childNodes[1].textContent = "Upload your Image"

    }

    return (
        <React.Fragment>

            <Col md={12}>
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
                {props.isLoading ? <Row><Col className="text-center" md={12}><Icon className="text-center mt-3 fas fa-spinner fa-pulse fa-3x" /></Col></Row> : props.images.map((img, i) => {
                    return <div className="loading"><img key={i} className="tixImages" src={"/api/ticket/image/" + img} alt="Ticket Images" width="100%" /><a className="img-del-btn bg-dark text-white" href="#"><Icon className="fas fa-trash-alt" /></a></div>
                })}
            </Col>

        </React.Fragment>

    )
}

export default ImageLoader;
