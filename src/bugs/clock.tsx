import React from 'react';

import './clock.css';

type ClockProps = {
    when: Date,
}

class Clock extends React.Component<ClockProps, {}> {
    render() {
        const options = {month: 'long', hour12: true, hour: 'numeric'}
        const timeString = this.props.when.toLocaleString('default', options);

        return (
            <div className="bug-clock">{timeString}</div>
        );
    }
}

export default Clock;