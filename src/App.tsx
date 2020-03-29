import React from 'react';
import './App.css';

import { Container, Row, Col } from 'reactstrap';

import Clock from './bugs/clock';
import TimeModal from './bugs/time_chooser';
import BugTable from './bugs/table';
import Bug, { NorthernBugs, PriceCompare } from './data/bugs';

class App extends React.Component {
    sortAndFilter(bugs: Bug[], month: number, hour: number) {
        let sortedBugs = bugs.filter(function(item) {
            return (item.price && item.isActive(month, hour));
        })
        sortedBugs.sort(PriceCompare)
        return sortedBugs;
    }

    render() {
        let now = new Date();
        let currentMonth = now.getMonth() + 1;
        let currentHour = now.getHours();

        const bugs = this.sortAndFilter(NorthernBugs, currentMonth, currentHour);
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col><Clock when={now} /></Col>
                        {/* <Col><TimeModal buttonLabel="Change time"/></Col> */}
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
