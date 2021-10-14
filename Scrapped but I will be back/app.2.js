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
        "wwwwww                                    wwwwww", 
        "w                                              w",  
        "w                                              w",  
        "w                                              w",  
        "w                                              w",  
        "w                                              w",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "                                                ",  
        "w                                              w",  
        "w                                              w",  
        "w                                              w",  
        "w                                              w",  
        "w                                              w",  
        "wwwwww                                    wwwwww", 
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

    onChangeState: function(event, from, to) {
        this.dom.main.removeClassName("state_is_" + from)
        this.dom.main.addClassName("state_is_" + to)
    },

    resetDifficulty:function(n){
        this.storage.difficulty = Game.Math.minMax(is.valid(n) ? n:toInt(this.storage.difficulty,1),0,cfg.difficulties.length-1)
        this.difficulty = this.difficulties[this.storage.difficulty]
    },

    resetGame: function() {
        this.w = cfg.court.w
        this.h = cfg.court.h

    },
})

// score system that I spent ages wrapping my head around.....

let score = Class.create({
    running: function(game) {
        this.game = game
        this.dom = {
            highscores: {
                page: $('highscores'),
                title: $('highscores').down('h1'),
                list: $('highscores').down('ul'),
                input: $({tag:'input', maxLength: 10})
            },
            score: {
                current: $('score').down('.current .value'),
                high: $('score').down('.high .value')
            }
        }
        this.load()
        this.reset()
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
        this.pos = pos || this.pos
        this.occupied = [ // a fruit occupies 3x3 cells and should not spawn on top of the snake body
            new Game.Point(this.pos.x-1, this.pos.y -1),
            new Game.Point(this.pos.x, this.pos.y -1),
            new Game.Point(this.pos.x+1, this.pos.y -1),
            new Game.Point(this.pos.x-1, this.pos.y),
            this.pos,
            new Game.Point(this.pos.x + 1, this.pos.y),
            new Game.Point(this.pos.x-1, this.pos.y +1),
            new Game.Point(this.pos.x, this.pos.y +1),
            new Game.Point(this.pos.x+1, this.pos.y +1),
        ]
    },
    occupies : function(pos) {
        for(let n=0; n < this.occupied.length; n++){
        if(this.occupied[n].equals(pos))
        return true
        }
        return false
    },

    update: function(dt){}

})

// snake being generated 

let snake = Class.create({
    running: function(game){
        this.game = game
    },

    reset:function(option){
        this.head = this.tail = new Game.Point(options.x, option.y)
        this.dir = options.dir
        this.dt = 0
        this.AMove = this.game.difficult.AMove
        this.move = []
        this.length = 1
        this.growth = options.length || 10
        while(--this.growth)
            this.increase()
    },

    update: function(dt){
        this.dt = this.dt + dt
        if(this.dt > this.AMove) {
            this.dt = this.dt - this.AMove
            this.increase(this.moves.shift())
            this.decrease()
        }
    },

    increase: function(changeDir){
        if (typeof changeDir != 'undefined'){
            this.head.corner = CORNER.LOOKUP[this.dir][changeDir]
            this.dir = changeDir
            this.game.playTurnFx()
        }
    },
    decrease: function() {
        if (this.growth)
        this.growth--
        else
        this.pop()
    },
    push: function(segment) {
        segment.next = this.head
        this.head.previous = segment
        this.head = segment
        this.length++
    },
    pop: function(){
        this.tail = this.tail.previous
        this.tail.next = null
        this.length--
    },
    grow: function(n) {
        this.growth += n
    },
    move: function(dir){
        let previous = this.moves.length ? this.move[this.moves.length-1]: this.dir
        if((dir != previous) && (dir !=DIR.OPPOSITE[previous]))
        this.moves.push(dir)
    },
    // do() is used to execute the code at each event. This performs an arbitart computation
    occupies: function(pos, ignoreHead) {
        let segment = ignoreHead ? this.head.next : this.head
        do {
            if(segment.equals(pos))
            return true
        } while (segment = segment.next)
        return false
    }
})

let render = Class.create({
    running : function(game){
        this.game = game
    },
    
    draw:function(ctx){
        if(!this.parts)
            this.renderParts()
        ctx.clearRect(0,0, this.game.runner.width, this.game.runner.height)
        let n, max, p, 
    }
})