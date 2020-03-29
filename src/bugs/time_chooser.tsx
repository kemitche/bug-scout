import React, { useState, ChangeEvent } from 'react';

import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './time_chooser.css';

type TimeModalProps = {
    buttonLabel: string,
    useRealTime: boolean,
    setUseRealTime(useRealTime: boolean): void,
    month: number,
    setMonth(month: number): void,
    time: Date,
    setTime(time: Date): void,
}

const TimeModal = (props: TimeModalProps) => {
    const {
        buttonLabel,
        useRealTime,
        setUseRealTime,
        month,
        setMonth,
        time,
        setTime,
    } = props

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Configure Time</ModalHeader>
                <ModalBody className="time-modal">
                    <TimeChooser
                        useRealTime={useRealTime}
                        setUseRealTime={setUseRealTime}
                        month={month}
                        setMonth={setMonth}
                        time={time}
                        setTime={setTime}
                    />
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
    month: number,
    setMonth(month: number): void,
    time: Date,
    setTime(time: Date): void,
}

const monthNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

class TimeChooser extends React.Component<TimeChooserProps, {}> {
    toggleRealTime = () => {
        this.props.setUseRealTime(!this.props.useRealTime);
    }

    adjustTime = (event: ChangeEvent<HTMLInputElement>) => {
        const nextDate = new Date('2020-01-01T' + event.target.value);
        this.props.setTime(nextDate);
    }

    adjustMonth = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.setMonth(parseInt(event.target.value));
    }

    renderMonthOpt(monthNum: number, selection: number) {
        const theDate = new Date(2020, monthNum);
        return (
            <option selected={monthNum === selection} value={monthNum}>{theDate.toLocaleString('default', {month: 'long'})}</option>
        )
    }

    render() {
        const monthOptionList = monthNums.map((monthNum: number) => this.renderMonthOpt(monthNum, this.props.month));
        return (
            <div className="time-chooser">
                <FormGroup>
                    <Button outline={!this.props.useRealTime} color="success" onClick={this.toggleRealTime}>
                        {this.props.useRealTime ? "☑" : "☐"} Use current time
                    </Button>
                </FormGroup>
                <FormGroup>
                    <Label for="monthSelect">Month</Label>
                    <Input
                        disabled={this.props.useRealTime}
                        type="select"
                        name="select"
                        id="monthSelect"
                        onChange={this.adjustMonth}
                    >
                        {monthOptionList}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="timeSelect">Time</Label>
                    <Input
                        disabled={this.props.useRealTime}
                        type="time"
                        name="time"
                        id="timeSelect"
                        value={this.props.time.toLocaleString('default', {hour12: false, hour: 'numeric', minute: 'numeric'})}
                        onInput={this.adjustTime}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default TimeModal;

export { TimeChooser };
