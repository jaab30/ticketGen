import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import {
    Form,
    FormGroup,
    CustomInput,
    Button,
    Row,
    Col
} from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { updateProfileImage } from "../../actions/authAction";



function ProfileImage() {

    const user = useSelector(state => state.authReducer.user);
    const error = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();

    const { _id, image } = user;

    const [profileImg, setProfileImg] = useState("");

    const handleProfileImageForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', profileImg)
        formData.append('userId', _id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        dispatch(updateProfileImage(formData, config))
        const inputImage = document.querySelector(".profile-input");
        inputImage.childNodes[1].textContent = "Upload your Image"
    }


    return (

        <React.Fragment>
            <Row>
                <Col md={12} className="mb-4" style={{ height: "250px" }} >
                    {image ? <img className="rounded-circle" width="250px" src={"/api/ticket/image/" + image} />
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