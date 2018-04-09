import React, { Component } from 'react';
import snakeModule from '../HelperFiles/snake';
import ultimateModule from '../HelperFiles/ultimateSnake';

import '../css/GameSelector.css'

export class GameSelector extends Component {

    renderGame(num) {
        const w = 400;
        const h = 300;
        var board = document.getElementById('gameboard');
        console.log('board', board);
        var game = board.getContext("2d");
        game.rect(0, 0, w, h);
        game.fillStyle = "black";
        game.fill();
        console.log('filled');
        if(num === 1) {
            let snake = snakeModule;
            snake.init();
        }
        else {
            let snake = ultimateModule;
            snake.init();
        }
    }

    render() {
        return(
            <div>
                <div className="selector" width="25px" height="25px" onClick={() => {this.renderGame(1)}}>
                    Classic
                </div>
                <div className="selector" width="25px" height="25px" onClick={() => {this.renderGame(2)}}>
                    Ultimate
                </div>
            </div>
        );
    };

};

export default GameSelector;
