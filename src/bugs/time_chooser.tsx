import React, { useState } from 'react';

import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './time_chooser.css';

type TimeModalProps = {
    buttonLabel: string,
    useRealTime: boolean,
    setUseRealTime(useRealTime: boolean): void,
}

const TimeModal = (props: TimeModalProps) => {
    const {
        buttonLabel,
        useRealTime,
        setUseRealTime,
    } = props

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Configure Time</ModalHeader>
                <ModalBody className="time-modal">
                    <TimeChooser setUseRealTime={setUseRealTime} useRealTime={useRealTime} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Done</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

interface TimeChooserProps {
    useRealTime: boolean,
    setUseRealTime(useRealTime: boolean): void,
}

class TimeChooser extends React.Component<TimeChooserProps, {}> {
    toggleRealTime = () => {
        this.props.setUseRealTime(!this.props.useRealTime);
    }

    render() {
        return (
            <div className="time-chooser">
                <Label check>
                    <Input type="checkbox" checked={this.props.useRealTime} onClick={this.toggleRealTime}/>{' '}
                    Use real time
                </Label>
            </div>
        );
    }
}

export default TimeModal;

export { TimeChooser };
