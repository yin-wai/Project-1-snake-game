const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

class SnakePart {
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
let speed = 7

let tileCount = 20
let tileSize = canvas.width/ tileCount -2

let snakeX = 10
let snakeY = 10
const snakeParts = []
let snakeTail = 2

let inputXVelocity = 0
let inputYVelocity = 0

let yVelocity = 0
let xVelocity = 0

let foodX = 5
let foodY = 5

let score = 0

function drawGame(){
    xVelocity = inputXVelocity
    yVelocity = inputYVelocity
    
    changePosition()
    let result = isGameOver()
    if(result){
        return
    }
    clearScreen()
   
    checkFoodConsumed()
    drawSnake()
    drawFood()
    drawScore()

    if (score > 5) {
        speed = 10
      }
    if (score > 10) {
        speed = 13
      }
    if (score > 15) {
        speed = 18
    }

    setTimeout(drawGame,1000/ speed)
}

function isGameOver(){
    let gameOver = false
    
    if(yVelocity === 0 && xVelocity === 0){
        return false
    }
    
    //walls for collision
    if(snakeX < 0){
        gameOver = true
    }
    else if(snakeX === tileCount){
        gameOver = true
    }
    else if(snakeY < 0) {
        gameOver = true
    }
    else if(snakeY === tileCount){
        gameOver = true
    }
    //if snake head touches the snake then it returns game over
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === snakeX && part.y === snakeY){
            gameOver = true;
            break;
        }
    }
    // text to alert user that the game is over
    if (gameOver) {
        ctx.fillStyle = 'white'
        ctx.font = "50px geneva"
        ctx.fillText("GAME OVER!", canvas.width/7, canvas.height/2)
    }
    return gameOver
}

function drawScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px verdana"
    ctx.fillText("Score " + score, canvas.width-50, 10)
}

function clearScreen(){
    ctx.fillStyle = '#1d5934'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawSnake() {
    ctx.fillStyle = "red"
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(snakeX, snakeY))
    if(snakeParts.length > snakeTail) {
        snakeParts.shift()
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(snakeX*tileCount,snakeY*tileCount,tileSize, tileSize)
}

function changePosition(){
    snakeX = snakeX + xVelocity
    snakeY = snakeY + yVelocity
}

function drawFood() {
    ctx.fillStyle = "yellow"
    ctx.fillRect(foodX* tileCount, foodY*tileCount, tileSize, tileSize)
}

function checkFoodConsumed() {
    if (foodX === snakeX && foodY === snakeY) {
        foodX = Math.floor(Math.random() * tileCount)
        foodY = Math.floor(Math.random() * tileCount)
        snakeTail++
        score++
    }
}

document.body.addEventListener('keydown', keyDown)

function keyDown(event){
    //up
    if(event.keyCode == 38) {
        if(inputYVelocity == 1)
            return
        inputYVelocity = -1
        inputXVelocity = 0
    }
    //down
    if(event.keyCode == 40) {
        if(inputYVelocity == -1)
            return
        inputYVelocity = 1
        inputXVelocity = 0
    }
    //left
    if(event.keyCode == 37) {
        if(inputXVelocity == 1)
            return
        inputYVelocity = 0
        inputXVelocity = -1
    }
    //right
    if(event.keyCode == 39) {
        if(inputXVelocity == -1)
            return 
        inputYVelocity = 0
        inputXVelocity = 1
    }

}

drawGame()

//build a high score table


