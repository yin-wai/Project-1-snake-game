const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let speed = 5

function drawGame(){
    console.log(drawGame)
    clearScreen()
    setTimeout(drawGame,1000/ speed)
}

function clearScreen(){
    ctx.fillStyle = '#1d5934'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}


//drawFruit
//check if the snake eats the fruit - increase size of its tail and relocate the fruit 
//if (snakeHeadx === fruitX && snakeHead === fruitY)
//totalTail++
//fruitPosition()
