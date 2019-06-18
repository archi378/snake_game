const canvas = document.getElementById('game-ground');
const context = canvas.getContext("2d");
const rtbtn = document.getElementById('right');
const ltbtn = document.getElementById('left');
const upbtn = document.getElementById('up');
const dwnbtn = document.getElementById('down');

// create snake unit
const unit = 10;
let dir = 'right';

//create score bar

let score= 0;

// load images

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "assets/audio/dead.mp3";
eat.src = "assets/audio/eat.mp3";
up.src = "assets/audio/up.mp3";
right.src = "assets/audio/right.mp3";
left.src = "assets/audio/left.mp3";
down.src = "assets/audio/down.mp3";


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
        x: i+5,
        y: 5
    });
}

// arrow-btn control
rtbtn.addEventListener('click', function(){
    dir = 'right';
    right.play();
})

ltbtn.addEventListener('click', function(){
    dir = 'left';
    left.play();
})

upbtn.addEventListener('click', function(){
    dir = 'up';
    up.play();
})

dwnbtn.addEventListener('click', function(){
    dir = 'down';
    down.play();
})

// control snake direction
document.addEventListener("keydown", direction);

function direction(e) {
    if (e.keyCode == 37 && dir != 'right'){
        dir = 'left';
        left.play();
    }
    else if (e.keyCode == 38 && dir != 'down'){
        dir = 'up';
        up.play();
    }
    else if (e.keyCode == 39 && dir != 'left'){
        dir = 'right';
        right.play();
    }
    else if (e.keyCode == 40 && dir != 'up'){
        dir = 'down';
        down.play();
    }
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

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
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
        score++;
        eat.play();
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

    let newHead = { // snake new head position
        x: snakeX,
        y: snakeY
    }

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width / unit || snakeY >= canvas.height / unit) {
        // alert("GAME OVER")
        // canvas.innerHTML = "GAME OVER"
        dead.play();
        clearInterval(game);
        context.font = "30px Arial";
        context.fillStyle = "red";
        context.fillText("GAME OVER", 6*unit, 15*unit);
    }

    context.font = "20px Arial";
    context.fillStyle = "yellow";
    context.fillText("SCORE : "+score, 10, 20);
}
let game = setInterval(draw, 200);