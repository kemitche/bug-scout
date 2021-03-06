import React from 'react';
import './App.css';

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

    setUseRealTime = (useRealTime: boolean): void => {
        this.setState({
            useRealTime: useRealTime,
        });
    }

    setMonthToUse = (month: number): void => {
        this.setState((prevState, props) => ({
            timeToUse: new Date(prevState.timeToUse.setMonth(month))
        }))
    }

    setTimeToUse = (time: Date): void => {
        this.setState((prevState, props) => {
            let nextDate = prevState.timeToUse;
            nextDate.setHours(time.getHours());
            nextDate.setMinutes(time.getMinutes())
            return {timeToUse: new Date(nextDate.setSeconds(0))}
        })
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
                <div className="bug-header">
                    <div className="bug-header-item">
                        <Clock when={time} />
                    </div>
                    <div className="bug-header-item">
                        <TimeModal
                            useRealTime={this.state.useRealTime}
                            setUseRealTime={this.setUseRealTime}
                            month={time.getMonth()}
                            setMonth={this.setMonthToUse}
                            time={time}
                            setTime={this.setTimeToUse}
                            buttonLabel="Change time"
                        />
                    </div>
                </div>
                <BugTable bugs={bugs}/>
                <div className="license-footer">
                    <small>
                        Data sourced from the <a href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)">Animal Crossing Fandom</a> under
                        the terms of the <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode">CC-BY-SA</a> license.
                    </small>
                </div>
            </div>
        );
    }
}

export default App;
