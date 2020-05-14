import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Img, Span } from "../Tags";

const ModalExample = (props) => {
    const { imgSrc, className } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Span onClick={toggle}>{props.children}</Span>
            <Modal isOpen={modal} size={"lg"} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                    <Img style={{ width: "100%" }} src={imgSrc} alt="Single Ticket" />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;