//elememt varaibles
const board = document.getElementById("game-board")
const instractionText = document.getElementById("instraction-text")
const logo = document.getElementById("logo")

//game varaibels
const gridSize = 20
let food = foodGenerator()
let snake = [{x: 10, y:10}]
let direction = 'left'
let gameSpeed = 200
let gameInterval
let gameStart = false

//Draw Food
function drawFood() {
    const foodElement = creatGameElemet('div', 'food')
    setPostion(foodElement, food)
    board.appendChild(foodElement)
}

//draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatGameElemet('div', 'snake')
        setPostion(snakeElement, segment)
        board.appendChild(snakeElement)
    })
}

function creatGameElemet(elem, className) {
    const element = document.createElement(elem)
    element.className = className
    return element
}

function setPostion(element, position) {
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

function foodGenerator() {
    let x = Math.floor(Math.random() * gridSize) + 1
    let y = Math.floor(Math.random() * gridSize) + 1
    return {x,y}
}

//main drawing function
let draw = () => {
    board.innerHTML = ""
    drawFood()
    drawSnake()
}
// draw()

//move snake
function moveSnake() {
    const head = {... snake[0]}

    switch(direction){
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head)
    if(food.x === head.x && food.y === head.y){
        food = foodGenerator()
        clearInterval(gameInterval)
        gameInterval = setInterval(()=>{
            moveSnake()
            draw()
        }, gameSpeed)
    }else{
        snake.pop()
    }
}

//start the game function
function startGame(){
    gameStart = true
    instractionText.style.display = 'none'
    logo.style.display = 'none'
    gameInterval = setInterval(()=>{
        moveSnake()
        draw()
    }, gameSpeed)
}

//keypress event handler
function keyPresHandler(event){
    if((!gameStart && event.code === 'Space') || 
    (!gameSpeed && event.key === ' ')){
        startGame()
    }else{
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up'
                break;
            case 'ArrowDown':
                direction = 'down'
                break;
            case 'ArrowLeft':
                direction = 'left'
                break;
            case 'ArrowRight':
                direction = 'right'
                break;
        }
    }
}

document.addEventListener('keydown', keyPresHandler)