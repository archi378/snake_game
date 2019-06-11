const canvas = document.getElementById('game-ground');
const context = canvas.getContext("2d");

// create snake unit
const unit = 10;
let dir = 'right';

// create snake array

const snake = [];
const drawSnake = (x, y) => {
    context.fillStyle = 'Green';
    context.fillRect(x * unit, y * unit, unit, unit);

    context.strokeStyle = 'Black';
    context.strokeRect(x * unit, y * unit, unit, unit);
}
const defaultLength = 4;

for (i = 0; i < defaultLength; i++) {
    snake.push({
        x: i,
        y: 0
    });
}

// control snake direction
document.addEventListener("keydown", direction);

function direction(e) {
    if (e.keyCode == 37 && dir != 'right')
        dir = 'left';
    else if (e.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (e.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (e.keyCode == 40 && dir != 'up')
        dir = 'down';
}
//create food
let food = {
    x: Math.round(Math.random() * (canvas.width / unit - 1) + 1),
    y: Math.round(Math.random() * (canvas.height / unit - 1) + 1)
}
const drawFood = (x, y) => {
    context.fillStyle = 'red';
    context.fillRect(x * unit, y * unit, unit, unit);

    context.strokeStyle = 'Black';
    context.strokeRect(x * unit, y * unit, unit, unit);
}
//create snake
const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < snake.length; i++) {
        X = snake[i].x;
        Y = snake[i].y;
        drawSnake(X, Y);
    }
    drawFood(food.x, food.y);

    // move snake

    let snakeX = snake[0].x; // snake old heade position x
    let snakeY = snake[0].y; // snake old heade position y

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width / unit || snakeY >= canvas.height / unit) {
        // alert("GAME OVER")
        canvas.innerHTML = "GAME OVER"
    }

    if (dir == 'right') {
        snakeX++
    } else if (dir == 'left') {
        snakeX--
    } else if (dir == 'up') {
        snakeY--
    } else if (dir == 'down') {
        snakeY++
    }

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.round(Math.random() * (canvas.width / unit - 1) + 1),
            y: Math.round(Math.random() * (canvas.height / unit - 1) + 1)
        }
        let newHead = { // snake new head position
            x: snakeX,
            y: snakeY
        }
        snake.unshift(newHead);

    } else {
        snake.pop();
        let newHead = { // snake new head position
            x: snakeX,
            y: snakeY
        }
        snake.unshift(newHead);
    }
}
setInterval(draw, 200);