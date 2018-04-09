import React, { Component } from 'react';

import '../css/Gameboard.css'

export class Gameboard extends Component {

    render() {
        return (
            <canvas id="gameboard" className="gameboard" width="300px" height="300px">
            </canvas>
        );
    };
};

export default Gameboard;