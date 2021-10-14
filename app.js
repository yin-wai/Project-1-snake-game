// const canvas = document.getElementById("canvas")
// const ctx = canvas.getContext("2d")

// class SnakePart {
//     constructor(x, y){
//         this.x = x
//         this.y = y
//     }
// }
// let speed = 7

// let tileCount = 20
// let tileBlock = canvas.width / tileCount
// let tileSize = tileBlock -2

// let snakeX = 10
// let snakeY = 10
// const snakeParts = []
// let snakeTail = 2 

// let inputXVelocity = 0
// let inputYVelocity = 0

// let yVelocity = 0
// let xVelocity = 0

// let foodX = 5
// let foodY = 5

// let score = 0

// function drawGame(){
//     xVelocity = inputXVelocity
//     yVelocity = inputYVelocity
//     let result = isGameOver()
//     if(result){
//         return
//     }
//     clearScreen()
//     changePosition()
//     checkFoodConsumed()
//     drawSnake()
//     drawFood()
//     drawScore()
//     setTimeout(drawGame,1000/ speed)
// }

// function isGameOver(){
//     let gameOver = false
    
//     if(yVelocity === 0 && xVelocity === 0){
//         return false
//     }

//     if(snakeX < 0){
//         gameOver = true
//     }
//     //unsure why tileBlock does not work
//     else if(snakeX === tileCount){
//         gameOver = true
//     }
//     else if(snakeY < 0) {
//         gameOver = true
//     }
//     //unsure why tileblock does not work
//     else if(snakeY === tileCount){
//         gameOver = true
//     }

//     for(let i=0; i < snakeParts.length; i++){
//         let part = snakeParts[i]
//         if(part.x === snakeX && part.y === snakeY){
//             gameOver = true
//             break
//         }
//     }

//     if (gameOver) {
//         ctx.fillStyle = 'white'
//         ctx.font = "50px geneva"
//         ctx.fillText("GAME OVER!", canvas.width/4.3, canvas.height/2)
//     }
//     return gameOver
// }

// function drawScore(){
//     ctx.fillStyle = "white"
//     ctx.font = "10px verdana"
//     ctx.fillText("Score " + score, canvas.width-50, 10)
// }

// function clearScreen(){
//     ctx.fillStyle = '#1d5934'
//     ctx.fillRect(0,0,canvas.width,canvas.height)
// }

// function drawSnake() {
//     ctx.fillStyle = "red"
//     for(let i=0; i < snakeParts.length; i++){
//         let part = snakeParts[i]
//         ctx.fillRect(part.x*tileBlock, part.y*tileBlock, tileSize, tileSize)
//     }
//     snakeParts.push(new SnakePart(snakeX, snakeY))
//     if(snakeParts.length > snakeTail) {
//         snakeParts.shift()
//     }

//     ctx.fillStyle = 'black'
//     ctx.fillRect(snakeX*tileBlock,snakeY*tileBlock,tileSize, tileSize)
// }

// function changePosition(){
//     snakeX = snakeX + xVelocity
//     snakeY = snakeY + yVelocity
// }

// function drawFood() {
//     ctx.fillStyle = "yellow"
//     ctx.fillRect(foodX* tileBlock, foodY*tileBlock, tileSize, tileSize)
// }

// function checkFoodConsumed() {
//     if (foodX === snakeX && foodY === snakeY) {
//         foodX = Math.floor(Math.random() * tileCount)
//         foodY = Math.floor(Math.random() * tileCount)
//         snakeTail++
//         score++
//     }
// }

// document.body.addEventListener('keydown', keyDown)

// function keyDown(event){
//     //up
//     if(event.keyCode == 38) {
//         if(inputYVelocity == 1)
//             return
//         inputYVelocity = -1
//         inputXVelocity = 0
//     }
//     //down
//     if(event.keyCode == 40) {
//         if(inputYVelocity == -1)
//             return
//         inputYVelocity = 1
//         inputXVelocity = 0
//     }
//     //left
//     if(event.keyCode == 37) {
//         if(inputXVelocity == 1)
//             return
//         inputYVelocity = 0
//         inputXVelocity = -1
//     }
//     //right
//     if(event.keyCode == 39) {
//         if(inputXVelocity == -1)
//             return 
//         inputYVelocity = 0
//         inputXVelocity = 1
//     }
// }

// drawGame()

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
// cfg a new way I researched on google
// a configuration is represented by an instance of the cfg() class. The constructor of the class can be passed a
// filename or a stream which contains the text for the configuration. The text is read in, parsed and converted to an
// object that you can then query
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
            {name:'newGame', from:'menu', to:'game'},
            {name:'quitGame', from:'game', to:'quit'},
            {name:'quitGame', from:'quit', to:'menu'},
            {name:'continueGame', from:'quit', to:'game'},
            {name:'loseGame', from:'game', to:'menu'},
            {name:'newHighScore', from:'game', to:'name'},
            {name:'saveHighScore', from:'name', to:'highscores'},
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
    highscores: [
        {name: "James", score: 7500},
        {name: "Ed", score:6000},
        {name: "Ideen", score:5000},
        {name: "Arthur", score:4000},
        {name:"Im so done", score: 3000},
        {name:"With this Game", score:2000},
        {name:"SNAKES", score:1000},
        {name:"noob", score:500}
    ],
    colors: {
        head: '#000',
        body: {fill:'#C71E10', stroke:'black'},
        fruit: {fill:'#1f673f', stroke: 'black'},
        wall: {fill:'#2d1f67', stroke: 'black'}
    },
    fruit: {score:10, growth: 5, size: 64},
    snake: {x:45, y:26, length:10, dir:DIR.LEFT},
    court: {w:48, h:36, layout: [

    ]}
}

// game itself and the menu 

let game = Class.create({
    
    running: function(){
        this.runner = new Game.Runner('canvas', this, cfg.runner)
        this.storage = Game.storage()

        this.dom = {
            main: $('snakes'),
            menu_on_top: $('menu_on_top'),
            loading: $('loading'),
        }
        this.render = new render(this)
        this.score = new score(this)
        this.court = new court(this)
        this.snake = new snake(this)
        this.fruit = new fruit(this)

        this.resetDifficulty()
        this.resetGame()

        this.menu = this.builtMenu()
        this.quitMenu = this.buildQuitMenu()

        Game.Key.map(cfg.keys, this)
        StateMachine.create(cfg.state,this)

        
    },

    onEnterLoading: function(event, from, to) {this.dom.loading.show()},
    onLeavingLoading: function(event, from, to) {this.dom.loading.fadeout()},
    onEnterHighscores: function(event, from, to) { if(from !== 'name') this.score.dom.highscores.page.fadeIn()},
    onLeavingHighscores: function(event, from, to) { this.score.dom.highscores.page.fadeOut()},
    onEnterName: function(event, from, to) {this.score.newHighScore()},
    onLeaveName: function(event, from, to) {this.score.save()},
    onEnterQuit: function(event, from, to) {this.quitMenu.fadeIn()},
    onLeaveQuit: function(event, from, to) {this.quitMenu.fadeOut()},
    onEnterMenu: function(event, from, to) {this.menu.fadeIn()},
    onLeaveMenu: function(event, from, to) {this.menu.fadeOut()},
    onEnterGame: function(event, from, to) {this.dom.menu_on_top.fadeOut()},
    onLeaveGame: function(event, from, to) {this.dom.menu_on_top.fadeIn()},

    onReady: function() {
        this.runner.start()
    },
    onNewGame: function(){
        this.resetGame()
    },
    onBackToMenu: function(){
        this.playClickFx()
    },

})

// score system that I spent ages wrapping my head around.....

let score = Class.create({
    running: function(game) {
        this.game = game
        this.dom = {
            highscores: {

            }
        }
    }

})

//generate a court that is like a frame around the game on the corner

let court = Class.create({
    running: function(game){
        this.game = game
    }
})

// fruit being generated as well as providing points when consumed

let fruit = Class.create({
    running: function(game) {
        this.game = game
        this.score = cfg.fruit.score
        this.growth = cfg.fruit.growth
    },
    reset: function(pos){
        this.pos
    },

})

// snake being generated 

let snake = Class.create({
    running: function(game){
        this.game = game
    },

    reset:function(option){
        this.head = this.tail = new Game.Point(options.x, option.y)
    }
})