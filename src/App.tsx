import React from 'react';
import './App.css';

import BugTable from './bugs/table';
import Bug, { NorthernBugs, PriceCompare } from './data/bugs';

class App extends React.Component {
    sortAndFilter(bugs: Bug[]) {
        let now = new Date();
        let currentMonth = now.getMonth() + 1;
        let currentHour = now.getHours();
        let sortedBugs = bugs.filter(function(item) {
            return (item.price && item.isActive(currentMonth, currentHour));
        })
        sortedBugs.sort(PriceCompare)
        return sortedBugs;
    }

    render() {
        const bugs = this.sortAndFilter(NorthernBugs);
        return (
            <div className="App">
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
