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
let tileBlock = canvas.width / tileCount
let tileSize = tileBlock -2

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
    
    if(yVelocity === 0 && xVelocity === 0){
        return false
    }

    if(snakeX < 0){
        gameOver = true
    }
    //unsure why tileBlock does not work
    else if(snakeX === tileCount){
        gameOver = true
    }
    else if(snakeY < 0) {
        gameOver = true
    }
    //unsure why tileblock does not work
    else if(snakeY === tileCount){
        gameOver = true
    }

    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i]
        if(part.x === snakeX && part.y === snakeY){
            gameOver = true
            break
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'white'
        ctx.font = "50px geneva"
        ctx.fillText("GAME OVER!", canvas.width/4.3, canvas.height/2)
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

Snakes = function (){
    DIR = {
        UP : 0,
        DOWN: 1,
        LEFT : 2,
        RIGHT : 3,
        OPPOSITE : [1, 0, 3, 2]
    }
    CORNER = {

    }
    CORNER.LOOKUP
}

let cfg = {
    runner: {
        stats: true
    },
    state: {
        initial: 'loading',
        events: [
            {name:'ready', from:'loading', to:'menu'},
            {name:'viewScores', from:'menu', to:'highscores'},
            {name:'viewCredits', from:'menu', to:'credits'},
        ]
    },
    keys : [
        { keys: [Game.Key.Y, Game.Key.Q], mode:'down', state: 'quit', action: function() {this.quitGame()}},
        { keys: [Game.Key.N, Game.Key.ESC], mode:'down', state: 'quit', action: function() {this.continueGame()}},
        { keys: [Game.Key.RETURN, Game.Key.ESC], mode:'down', state: 'highscore', action: function() {this.returnToMenu()}},
        { keys: [Game.Key.RETURN, Game.Key.ESC], mode:'down', state: 'name', action: function() {this.savesHighScore()}},
        { keys: [Game.Key.LEFT, Game.Key.A], mode:'down', state: 'game', action: function() {this.snake.move(DIR.LEFT)}},
        { keys: [Game.Key.RIGHT, Game.Key.D], mode:'down', state: 'game', action: function() {this.snake.move(DIR.RIGHT)}},
        { keys: [Game.Key.UP, Game.Key.W], mode:'down', state: 'game', action: function() {this.snake.move(DIR.UP)}},
        { keys: [Game.Key.DOWN, Game.Key.S], mode:'down', state: 'game', action: function() {this.snake.move(DIR.DOWN)}},
        { keys: [Game.Key.ESC], mode:'down', state: 'game', action: function() {this.quitGame()}},

    ],
    difficultyLevel: [
        { level:'Slow', AMove: 0.09, AScore: 0.75 },
        { level:'Normal', AMove: 0.07, AScore: 1.00},
        { level:'Fast', AMove: 0.05, AScore: 1.25}
    ],

}
