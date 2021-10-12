const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

class SnakePart {
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
let speed = 5

let tileCount = 20
let tileBlock = canvas.width / tileCount
let tileSize = tileBlock -2

let snakeX = 10
let snakeY = 10
const snakeParts = []
let snakeTail = 2 

let yVelocity = 0
let xVelocity = 0

let foodX = 5
let foodY = 5

let score = 0

function drawGame(){
    let result = isGameOver()
    if(result){
        return
    }
    clearScreen()
    changePosition()
    checkFoodConsumed()
    drawSnake()
    drawFood()
    drawScore()
    setTimeout(drawGame,1000/ speed)
}

function isGameOver(){
    let gameOver = false
    
    if(xVelocity === 0 && yVelocity === 0){
        return false
    }
    if(snakeX < 0){
        gameOver = true
    }
    else if(snakeX === tileBlock){
        gameOver = true
    }
    else if(snakeY < 0) {
        gameOver = true
    }
    else if(snakeY === tileBlock){
        gameOver = true
    }

    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === snakeX && part.Y === snakeY) {
            gameeOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'white'
        ctx.font = "50px geneva"
        ctx.fillText("GAME OVER!", canvas.width/4.5, canvas.height/2)
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
        ctx.fillRect(part.x*tileBlock, part.y*tileBlock, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(snakeX, snakeY))
    if(snakeParts.length > snakeTail) {
        snakeParts.shift()
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(snakeX*tileBlock,snakeY*tileBlock,tileSize, tileSize)
}

function changePosition(){
    snakeX = snakeX + xVelocity
    snakeY = snakeY + yVelocity
}

function drawFood() {
    ctx.fillStyle = "yellow"
    ctx.fillRect(foodX* tileBlock, foodY*tileBlock, tileSize, tileSize)
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
        if(yVelocity == 1)
            return
        yVelocity = -1
        xVelocity = 0
    }
    //down
    if(event.keyCode == 40) {
        if(yVelocity == -1)
            return
        yVelocity = 1
        xVelocity = 0
    }
    //left
    if(event.keyCode == 37) {
        if(xVelocity == 1)
            return
        yVelocity = 0
        xVelocity = -1
    }
    //right
    if(event.keyCode == 39) {
        if(xVelocity == -1)
            return 
        yVelocity = 0
        xVelocity = 1
    }
}

drawGame()

//build a high score table


