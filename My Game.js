// const playBoard = document.querySelector(".play-board");
// const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 10, snakeY = 10;   
let snakeBody = [];
let velocityX = 0, velocityY =  0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;




function changFood() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}



function handleGameOver() {
    clearInterval(setIntervalId)

        document.querySelector(".play-board").innerHTML = `<h1 id="asd">Game_Over!</h1>`;

}



function changeDirection(a) {
    if (a.key === "ArrowUp" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }else if (a.key === "ArrowDown" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }else if (a.key === "ArrowLeft" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }else if (a.key === "ArrowRight" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
}






function initGame() {
    if (gameOver) return handleGameOver();


    let htmlMarkup = `<div id="food" style="grid-area: ${foodX} / ${foodY}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changFood();
        snakeBody.push([foodX,foodY]);

        score++;

            highScore = score >= highScore ? score : highScore;

            localStorage.setItem("high-score", highScore);
        
            document.querySelector(".score").innerText = `Score: ${score}`;


            highScoreElement.innerText = `High Score: ${highScore}`;
    }




    for (let h = snakeBody.length - 1; h > 0; h--) {
        snakeBody[h] = snakeBody[h - 1];
    }

        snakeBody [0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }


    for (let h = 0; h < snakeBody.length; h++) {
        htmlMarkup += `<div id="head" style="grid-area: ${snakeBody[h][0]} / ${snakeBody[h][1]}"></div>`;

        if (h !==0 && snakeBody[0][1] === snakeBody[h][1] && snakeBody[0][0] === snakeBody[h][0]) {
            gameOver = true;
        }
    }
document.querySelector(".play-board").innerHTML = htmlMarkup;

    // playBoard.innerHTML = htmlMarkup;
}
changFood();
setIntervalId = setInterval(initGame, 130);
document.addEventListener("keydown", changeDirection);