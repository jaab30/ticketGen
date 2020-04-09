import React from "react";
import Icon from "../Icon";
import {
    Form,
    FormGroup,
    CustomInput,
    Row,
    Col
} from 'reactstrap';



function ProfileImage() {


    return (

        <React.Fragment>
            <Row>
                <Col md={12} className="mb-4">
                    <Icon className="fas fa-user-circle fa-10x" />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={7}>
                    <Form>
                        <FormGroup>
                            <CustomInput type="file" id="ImageBrowser" name="customFile" label="Upload your Image" />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ProfileImage;