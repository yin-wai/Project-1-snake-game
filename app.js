const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let speed = 5

let tileCount = 20
let tileBlock = canvas.width / tileCount
let tileSize = tileBlock -2
let snakeX = 10
let snakeY = 10
let yVelocity = 0
let xVelocity = 0

function drawGame(){
    clearScreen()
    changePosition()
    drawSnake()
    setTimeout(drawGame,1000/ speed)
}

function clearScreen(){
    ctx.fillStyle = '#1d5934'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawSnake() {
    ctx.fillStyle = 'black'
    ctx.fillRect(snakeX*tileBlock,snakeY*tileBlock,tileSize, tileSize)
}

function changePosition(){
    snakeX = snakeX + xVelocity
    snakeY = snakeY + yVelocity
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
//drawFruit
//check if the snake eats the fruit - increase size of its tail and relocate the fruit 
//if (snakeHeadx === fruitX && snakeHead === fruitY)
//totalTail++
//fruitPosition()

//build a high score table


