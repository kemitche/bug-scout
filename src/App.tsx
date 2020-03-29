import React from 'react';
import './App.css';

import { Container, Row, Col } from 'reactstrap';

import Clock from './bugs/clock';
import TimeModal from './bugs/time_chooser';
import BugTable from './bugs/table';
import Bug, { NorthernBugs, PriceCompare } from './data/bugs';

type AppState = {
    now: Date,
    useRealTime: boolean,
    timeToUse: Date,
}

class App extends React.Component<{}, AppState> {
    timerID: number | null;
    constructor(props: {}) {
        super(props);
        this.state = {now: new Date(), useRealTime: true, timeToUse: new Date()};
        this.timerID = null;
    }

    componentDidMount() {
        this.timerID = window.setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = null;
        }
    }

    tick() {
        this.setState({
            now: new Date()
        });
    }

    sortAndFilter(bugs: Bug[], month: number, hour: number) {
        let sortedBugs = bugs.filter(function(item) {
            return (item.price && item.isActive(month, hour));
        })
        sortedBugs.sort(PriceCompare)
        return sortedBugs;
    }

    setUseRealTime(useRealTime: boolean): void {
        console.log(useRealTime);
    }

    render() {
        let time: Date;
        if (this.state.useRealTime) {
            time = this.state.now;
        } else {
            time = this.state.timeToUse;
        }
        let currentMonth = time.getMonth() + 1;
        let currentHour = time.getHours();

        const bugs = this.sortAndFilter(NorthernBugs, currentMonth, currentHour);
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col><Clock when={time} /></Col>
                        {/* <Col><TimeModal setUseRealTime={this.setUseRealTime} useRealTime={this.state.useRealTime} buttonLabel="Change time"/></Col> */}
                    </Row>
                </Container>
                <BugTable bugs={bugs}/>
                <small>
                    Data sourced from the <a href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)">Animal Crossing Fandom</a> under
                    the terms of the <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode">CC-BY-SA</a> license.
                </small>
            </div>
        );
    }
}

export default App;
