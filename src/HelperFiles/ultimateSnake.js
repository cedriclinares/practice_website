var ultimateModule = (function () {
    var game;
    var level;
    const w = 300;
    const h = 300;
    var score;
    var snake;
    var snakeSize = 10;
    var food;
    var direction;
    var gameloop;
    var obstacles;

    var bodySnake = function(x, y) {
        game.fillStyle='green';
        game.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    var foodSnake = function(x, y, score) {
        if(score % 3 === 2){
            game.fillStyle = 'aqua';
            game.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        } else {
            game.fillStyle = 'yellow';
            game.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        }
    }

    var drawSnake = function(x,y) {
        let length = 3 + level;
        for (let i=length-1; i>=0; i--) {
            snake.push({x:i, y:0});
        }
        console.log('snake', snake);
    }

    var createObstacles = function() {
        console.log('creating obstacles');
        for(let i=0; i<level; i++) {
           let base = 3;
           let a =  Math.floor((Math.random() * (w/10-base*2))+base);
           let b = Math.floor((Math.random() * (h/10-base)) + 2);
           let start = { x:a , y:b };
           let type = Math.floor(Math.random() * 3);

           console.log('type', type);
           switch(type) {
               case 0:
                   let length = Math.floor((Math.random() * level) + base);
                   makeSquare(start, length);
                   break;
               case 1:
                   let  height = Math.floor((Math.random() * level) + base);
                   let width = Math.floor((Math.random() * level) + base);
                   let orientation = Math.floor(Math.random() * 4);
                   makeC(start, orientation, width, height);
                   break;
               case 2:
                   height = Math.floor((Math.random() * level) + base);
                   width = Math.floor((Math.random() * level) + base);
                   orientation = Math.floor(Math.random() * 4);
                   console.log('orientation', orientation);
                   makeL(start, orientation, width, height);
                   break;
               // case 3:
               //     var length = Math.floor((Math.random() * level) + 1);
               //     makeCross(start, length);
               //     break;
           }
           console.log('obstacles', obstacles);
        }
    }

    var drawObstacles = function() {
        for(let i=0; i<obstacles.length; i++){
            game.fillStyle="red";
            game.fillRect(obstacles[i].x*snakeSize, obstacles[i].y*snakeSize, snakeSize, snakeSize);
            game.strokeStyle="grey"
            game.strokeRect(obstacles[i].x*snakeSize, obstacles[i].y*snakeSize, snakeSize, snakeSize);
        }
    }

    var makeSquare = function(start, length) {
        for(let i=0; i<length; i++) {
            for(let j=0; j<length; j++){
                let block = { x: start.x+i, y:start.y+j };
                obstacles.push(block);
            }
        }
    }

    var makeC = function(start, orientation, width, height) {

        switch(orientation) {
            case 0: //left
                for(let i=0; i<width; i++) {
                    let block = { x: start.x+i, y: start.y};
                    obstacles.push(block);
                    block = { x: start.x+i, y: start.y+height};
                    obstacles.push(block);
                }

                for(let j=1; j<height; j++){
                    let block = { x: start.x, y: start.y+j};
                    obstacles.push(block);
                }
                break;
            case 1: //right
                for(let i=0; i<width; i++) {
                    let block = {x: start.x - i, y: start.y};
                    obstacles.push(block);
                    block = {x: start.x - i, y: start.y + height};
                    obstacles.push(block);
                }

                for(let j=1; j<height; j++){
                    let block = { x: start.x, y: start.y+j};
                    obstacles.push(block);
                }
                break;
            case 2: //up
                for(let i=0; i<width; i++) {
                    let block = { x: start.x, y: start.y+i};
                    obstacles.push(block);
                    block = { x: start.x+height, y: start.y+i};
                    obstacles.push(block);
                }

                for(let j=1; j<height; j++){
                    let block = { x: start.x+j, y: start.y};
                    obstacles.push(block);
                }
                break;
            case 3: //down
                for(let i=0; i<width; i++) {
                    let block = { x: start.x, y: start.y+i};
                    obstacles.push(block);
                    block = { x: start.x+height, y: start.y+i};
                    obstacles.push(block);
                }

                for(let j=1; j<height; j++){
                    let block = { x: start.x+j, y: start.y+width-1};
                    obstacles.push(block);
                }
                break;
        }
    }

    var makeL = function(start, orientation,width, height) {
        switch(orientation) {
            case 0: //left
                for(let i=0; i<width; i++) {
                    let block = { x: start.x+i, y: start.y+height};
                    obstacles.push(block);
                }

                for(let j=0; j<height; j++){
                    let block = { x: start.x, y: start.y+j};
                    obstacles.push(block);
                }
                break;
            case 1: //right
                console.log('start: ', start);
                console.log('width: ', width, 'height: ', height);
                for(let i=0; i<width; i++) {
                    let block = { x: start.x-i, y: start.y+height};
                    obstacles.push(block);
                }

                for(let j=0; j<height+1; j++){
                    let block = { x: start.x, y: start.y+j};
                    obstacles.push(block);
                }
                break;
            case 2: //up
                for(let i=0; i<width; i++) {
                    let block = { x: start.x+height, y: start.y+i};
                    obstacles.push(block);
                }

                for(let j=1; j<height; j++){
                    let block = { x: start.x+j, y: start.y};
                    obstacles.push(block);
                }
                break;
            case 3: //down
                for(let i=0; i<width; i++) {
                    let block = { x: start.x+i, y: start.y};
                    obstacles.push(block);
                }

                for(let j=1; j<height; j++){
                    let block = { x: start.x, y: start.y+j};
                    obstacles.push(block);
                }
                break;
        }
    }

    // var makeCross = function(start, length) {
    //
    // }

    var paint = function() {

        game.fillStyle = 'black';
        game.fillRect(0, 0, w, h);


        if (level === 11) {
            let winText = 'You Win!';
            game.fillStyle = 'green';
            game.font = '75px Georgia';
            game.fillText(winText, 75, 175, 150);
            displayScore();
            gameloop = clearInterval(gameloop);
            return;
        }
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;


       drawObstacles();
       displayScore();
       foodSnake(food.x, food.y, score);

        if(direction === 'right') {
            console.log('plus plus right');
            snakeX++;
        } else if (direction === 'left') {
            console.log('plus plus left');
            snakeX--;
        } else if (direction === 'up'){
            snakeY--;
        } else if (direction === 'down'){
            snakeY++;
            console.log('plus plus down');
        }

        if (snakeX === -1 || snakeX === w/snakeSize || snakeY === -1 || snakeY === h/snakeSize || collision(snakeX, snakeY, snake)){

            // console.log('collision', collision(snakeX, snakeY, snake));
            console.log('end of game');
            // game.clearRect(0,0,w,h);
            snake=[];
            foodSnake(food.x, food.y);
            gameloop = clearInterval(gameloop);
            return;
        }

        if(snakeX === food.x && snakeY === food.y) {
            score++;
            var tail =  {x: snakeX, y: snakeY};
            console.log('ate food');
            if (score % 3 === 0){
                level++;
                restart();
                tail = {x:snake[0].x, y:snake[0].y};
                console.log('snake restart', snake);
            }
            createFood();
        } else {
            tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        snake.unshift(tail);

        for(var i=0; i<snake.length; i++){
            bodySnake(snake[i].x, snake[i].y);
        }


    }

    var displayScore = function() {
        var scoreText = "Level: " + level;
        game.fillStyle = "green";
        game.fillText(scoreText, 145, h-5);
    }

    var createFood = function() {
        food = {
            x: Math.floor(Math.random() * w/10),
            y: Math.floor(Math.random() * h/10)
        }

        for (let i=0; i<obstacles.length; i++){
            let obstacleX = obstacles[i].x;
            let obstacleY = obstacles[i].y;

            if(food.x === obstacleX && food.y === obstacleY){
                createFood();
            }
        }

        for (let i = 0; i < snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY) {
                createFood();
            }
        }
        console.log("create food", food);
    }

    var collision = function(x,y, array){
        for (let i=0; i<obstacles.length; i++){
            let obstacleX = obstacles[i].x;
            let obstacleY = obstacles[i].y;

            if(x === obstacleX && y === obstacleY){
                return true;
            }
        }

        for(let i=2; i<array.length; i++) {
            if(array[i].x === x && array[i].y === y) {
                console.log(i, array[i].x, x, array[i].y, y, array);
                console.log("found collision");
                return true;
            }
        }
        return false;
    }

    var restart = function() {
        score = 0;
        snake = [];
        obstacles = [];
        direction = 'right';
        drawSnake();
        console.log('snake restart', snake);
        createObstacles();
    }

    var init = function() {
        document.onkeydown = function(event){
            let keyCode = event.keyCode;

            switch(keyCode){
                case 37:
                    if(direction !== 'right') {
                        console.log('left');
                        direction = 'left';
                    }
                    break;
                case 39:
                    if(direction !== 'left') {
                        console.log('right');
                        direction = 'right';
                    }
                    break;
                case 38:
                    if(direction !== 'down') {
                        console.log('up');
                        direction = 'up';
                    }
                    break;
                case 40:
                    if(direction !== 'up') {
                        console.log('keylog down');
                        direction = 'down';
                    }
                    break;
                default:
                    break;
            }
        }
        var board = document.getElementById('gameboard');
        game = board.getContext("2d");
        score = 0;
        snake = [];
        obstacles = [];
        level = 1;
        direction = 'right';
        drawSnake();
        createObstacles();
        createFood();
        gameloop = setInterval(paint, 50);
        console.log("end init function");
    }

    return{
        init: init
    };

})();

export default ultimateModule;