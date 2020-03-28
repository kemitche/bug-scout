import React from 'react';

import Bug from '../data/bugs';

type BugTableProps = {
    bugs: Bug[],
}

class BugTable extends React.Component<BugTableProps, {}> {
    renderBug(bug: Bug) {
        return <tr key={bug.name}>
            <td>{bug.name}</td>
            <td>{bug.price}</td>
            <td>{bug.location}</td>
        </tr>
    }

    render() {
        const bugList = this.props.bugs.map((bug: Bug) => this.renderBug(bug))

        return (
            <table>
                <tbody>
                    {bugList}
                </tbody>
            </table>
        );
    }
}

export default BugTable;