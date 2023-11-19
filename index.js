window.alert('YOU CAN PLAY BY BOTH THE KETBOARD AND THE BUTTONS GIVEN');

let speed = 11;
let score=0;
let highScore = JSON.parse(localStorage.getItem('hs')) || 0;
let snakeArray = [
    {x: 17, y: 13}
];
let inputDir = {x: 0, y: 0};
let lastTime = 0;
const board =  document.querySelector('.board');
const foodSound = new Audio('Multimedia/food.mp3');
const gameOverSound = new Audio('Multimedia/gameover.mp3');
const moveSound = new Audio('Multimedia/move.mp3');
let score_html = document.querySelector('.score');

let a = 2 + Math.floor(Math.random()*28);
let b = 2 + Math.floor(Math.random()*28);

score_html.innerHTML = 
        `<p class="p">
            Score : ${score}
        </p>
        <p class="p">
            HighScore : ${highScore}
        </p>`

// fps function

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastTime)/1000 < 1/speed){
        return;
    }
    lastTime=ctime;
    gamePlay();
}

gamePlay();

function collide(snake){

    // body collide

    for(let i=1;i<snake.length;i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    }

    // wall collide

    if(snake[0].x < 0 || snake[0].x > 30 || snake[0].y < 0 || snake[0].y > 30){
        return true;
    }
return false;
}

//  Game play
function gamePlay(){

    // if colllision

    if(collide(snakeArray)){
        score = 0;
        score_html.innerHTML = 
        `<p class="p">
            Score : ${score}
        </p>
        <p class="p">
            HighScore : ${highScore}
        </p>`
        gameOverSound.play();
        snakeArray = [{x: 17, y: 13}];
        inputDir = {x: 0, y: 0};
        alert("Game Over.");

    }

    // if snake eat food
    
    if(snakeArray[0].x === b && snakeArray[0].y === a){
        foodSound.play();
        score += 1;
        if(highScore < score ){
            highScore = score;
            localStorage.setItem('hs', JSON.stringify(highScore));
        }
        a = 2 + Math.floor(Math.random()*28);
        b = 2 + Math.floor(Math.random()*28);
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});

        // updating score

        score_html.innerHTML = 
        `<p class="p">
            Score : ${score}
        </p>
        <p class="p">
            HighScore : ${highScore}
        </p>`


    };

    // moving the snake
        
    for (let i = snakeArray.length - 2; i>=0; i--) { 
        snakeArray[i+1] = {...snakeArray[i]};
    }
    
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Making Snake

    board.innerHTML="";
    snakeArray.forEach((e,index)=>{
        snake = document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;

        if(index === 0){
            snake.classList.add('head');
        }
        else{
            snake.classList.add('snakeBody');
        }
        board.appendChild(snake);
    });

    // Making food

    food = document.createElement('div');
    food.style.gridRowStart = a;
    food.style.gridColumnStart = b;
    board.appendChild(food);
    food.classList.add('food');
    // food.classList.add('animate');
    
}

//  Game Beginning

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    moveSound.play();
    inputDir = {x: 0, y: 0} // Start the game
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
            case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            alert("paused")
            break;
        }

});

function btn(btnn){
    moveSound.play();
    if(btnn === 'up'){
        inputDir.x = 0;
        inputDir.y = -1;
    }
    if(btnn === 'down'){
        inputDir.x = 0;
        inputDir.y = 1;
    }
    if(btnn === 'left'){
        inputDir.x = -1;
        inputDir.y = 0;
    }
    if(btnn === 'right'){
        inputDir.x = 1;
        inputDir.y = 0;
    }
}
