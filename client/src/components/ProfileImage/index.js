import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import "./style.css"
import {
    Form,
    FormGroup,
    CustomInput,
    Button,
    Row,
    Col,
    Alert
} from 'reactstrap';
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

    const deleteImage = (filename, userId) => {
        dispatch(deleteProfileImage(filename, userId))
    }


    return (

        <React.Fragment>
            <Row>
                <Col md={12} className="mb-4" style={{ height: "250px" }} >
                    {image ? isImageLoading ? <Row className="pt-4"><Col className="text-center mt-4 pt-4" md={12}><Icon className="text-center mt-3 fas fa-spinner fa-pulse fa-2x" /></Col></Row> : <div className="loadingProfile"><img className="rounded-circle" width="250px" src={"/api/ticket/image/" + image} /><a className="img-del-btn bg-dark text-white" onClick={() => deleteImage(image, user._id)}><Icon className="fas fa-trash-alt" /></a></div>
                        :
                        <Icon className="fas fa-user-circle fa-10x" />
                    }

                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handleProfileImageForm}>

                        <Row className="justify-content-center">
                            <Col md={8}>
                                {msgImage ? <Alert color="danger">{msgImage}</Alert> : null}
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