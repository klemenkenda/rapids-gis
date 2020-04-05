// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents

// import css
import './css/LiveNavBar.css';

// defining types
type Props = { };
type State = { };

/**
 * Displaying production lines list.
 */
class TitleNavBar extends Component<Props, State> {

    render() {

        return <div className="divLiveNavBar">
            <h3>Slovenija</h3>
            <span>Digitalni dvojček</span>
        </div>

    }

}

export default TitleNavBar;