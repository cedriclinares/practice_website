var snakeModule = (function () {
    var game;
    const w = 300;
    const h = 300;
    var score;
    var snake;
    var snakeSize = 10;
    var food;
    var direction;
    var gameloop;

    var bodySnake = function(x, y) {
        game.fillStyle='green';
        game.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    var foodSnake = function(x, y) {
     game.fillStyle='yellow';
     game.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize)
    }

    var drawSnake = function(x,y) {
        var length = 4;
        for (var i=length-1; i>=0; i--) {
            snake.push({x:i, y:0});
        }
        console.log('snake', snake);
    }

    var paint = function() {
        console.log("in paint");
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        game.fillStyle = 'black';
        game.fillRect(0, 0, w, h);

        if(direction === 'right') {
            snakeX++;
        } else if (direction === 'left') {
            snakeX--;
        } else if (direction === 'up'){
            snakeY--;
        } else if (direction === 'down'){
            snakeY++;
        }

        if (snakeX === -1 || snakeX === w/snakeSize || snakeY === -1 || snakeY === h/snakeSize || collision(snakeX, snakeY, snake)){

            console.log('snakeX', snakeX);
            console.log('snakeY', snakeY);
            console.log('direction', direction);
            console.log('end of game');
            // game.clearRect(0,0,w,h);
            snake=[];
            displayScore();
            foodSnake(food.x, food.y);
            gameloop = clearInterval(gameloop);
            return;
        }

        if(snakeX === food.x && snakeY === food.y) {
            score++;
            var tail =  {x: snakeX, y: snakeY};
            console.log('ate food');
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

        foodSnake(food.x, food.y);
        displayScore();
    }

    var displayScore = function() {
        var scoreText = "Score: " + score;
        game.fillStyle = "green";
        game.fillText(scoreText, 145, h-5);
    }

    var createFood = function() {
        food = {
            x: Math.floor(Math.random() * w/10),
            y: Math.floor(Math.random() * h/10)
        }

        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY) {
                createFood();
            }
        }
        console.log("create food", food);
    }

    var collision = function(x,y, array){
        for(var i=0; i<array.length; i++) {
            if(array[i].x === x && array[i].y === y) {
                console.log("found collision");
                return true;
            }
        }
        return false;
    }

    var init = function() {
        document.onkeydown = function(event){
            var keyCode = event.keyCode;
            console.log('keycode', keyCode);
            switch(keyCode){
                case 37:
                    if(direction !== 'right') {
                        direction = 'left';
                    }
                    break;
                case 39:
                    if(direction !== 'left') {
                        direction = 'right';
                    }
                    break;
                case 38:
                    if(direction !== 'down') {
                        direction = 'up';
                    }
                    break;
                case 40:
                    if(direction !== 'up') {
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
        direction = 'right';
        drawSnake();
        createFood();
        gameloop = setInterval(paint, 50);
        console.log("end init function");
    }

    return{
        init: init
    };

})();

export default snakeModule;