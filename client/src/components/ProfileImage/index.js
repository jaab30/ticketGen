import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import "./style.css"
import userIcon from "./images/profile.png";
import {
    Form,
    FormGroup,
    CustomInput,
    Button,
    Row,
    Col,
    Alert
} from 'reactstrap';
import { P } from "../Tags";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileImage, isLoadingProfileImage, deleteProfileImage, clearErrors } from "../../actions/authAction";
import { UPDATE_PROFILE_IMAGE_ERROR } from "../../actions/actions";




function ProfileImage() {

    const { user, isImageLoading } = useSelector(state => state.authReducer);
    const error = useSelector(state => state.errorReducer);

    const dispatch = useDispatch();

    const { _id, image } = user;

    const [profileImg, setProfileImg] = useState("");
    const [msgImage, setMsgImage] = useState(null);

    useEffect(() => {

        dispatch(isLoadingProfileImage(false))

        if (error.id === UPDATE_PROFILE_IMAGE_ERROR) {
            setMsgImage(error.msg.msg)
            dispatch(isLoadingProfileImage())
            dispatch(clearErrors());
        }

    }, [error])

    const handleProfileImageForm = (e) => {
        e.preventDefault();
        dispatch(isLoadingProfileImage(true))
        const formData = new FormData();
        formData.append('file', profileImg)
        formData.append('userId', _id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        dispatch(updateProfileImage(formData, config))
        setMsgImage(null);
        const inputImage = document.querySelector(".profile-input");
        inputImage.childNodes[1].textContent = "Upload your Image"
    }

    const deleteImage = (e, filename, userId) => {
        e.target.className = "fas fa-spinner fa-pulse"
        dispatch(deleteProfileImage(filename, userId))
    }


    return (

        <React.Fragment>
            <Row>
                <Col md={12} >
                    {image ? isImageLoading ? <div className="loadingPulse"><Icon className="text-center mt-3 fas fa-spinner fa-pulse fa-2x" /></div>
                        :
                        <div className="loadingBack"><img className="profileImg rounded-circle" src={"/api/ticket/image/" + image} /><a className="img-del-btn bg-dark text-white" onClick={(e) => deleteImage(e, image, user._id)}><Icon className="fas fa-trash-alt" /></a></div>
                        :
                        <div><img className="userIcon rounded-circle" src={userIcon} /></div>
                    }

                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handleProfileImageForm}>

                        <Row className="justify-content-center">
                            <Col md={8}>
                                {msgImage ? <Alert className="mt-2" color="danger">{msgImage}</Alert> : null}
                                <P className="profileText">Recomended size: 250px x 250px</P>
                                <FormGroup>
                                    <CustomInput
                                        className="profile-input"
                                        type="file"
                                        id="ImageBrowserProfile"
                                        name="file"
                                        label="Upload your Image"
                                        onChange={(e) => { setProfileImg(e.target.files[0]) }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button type="submit" color="dark">Submit Image</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ProfileImage;