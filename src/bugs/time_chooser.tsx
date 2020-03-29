import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type TimeModalProps = {
    buttonLabel: string,
}

const TimeModal = (props: TimeModalProps) => {
    const {
        buttonLabel
    } = props

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Configure Time</ModalHeader>
                <ModalBody>
                    <TimeChooser/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

class TimeChooser extends React.Component {
    render() {
        return (
            <div className="time-chooser">
                Time chooser here
            </div>
        );
    }
}

export default TimeModal;

export { TimeChooser };