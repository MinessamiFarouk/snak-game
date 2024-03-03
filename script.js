//elememt varaibles
const board = document.getElementById("game-board")
const instractionText = document.getElementById("instraction-text")
const logo = document.getElementById("logo")
const score = document.getElementById('score')
const highScoreText = document.getElementById('highScore')

//game varaibels
const gridSize = 20
let food = foodGenerator()
let snake = [{x: 10, y:10}]
let highScore = 0
let direction = 'left'
let gameSpeed = 200
let gameInterval
let gameStart = false

//main drawing function
let draw = () => {
    board.innerHTML = ""
    drawFood()
    drawSnake()
    updateScore()
}

//Draw Food
function drawFood() {
    if(gameStart) {
        const foodElement = creatGameElemet('div', 'food')
        setPostion(foodElement, food)
        board.appendChild(foodElement)
    }
}

//draw snake
function drawSnake() {
    if(gameStart){
        snake.forEach((segment) => {
            const snakeElement = creatGameElemet('div', 'snake')
            setPostion(snakeElement, segment)
            board.appendChild(snakeElement)
        })
    }
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
            checkCollision()
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
        checkCollision()
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

function checkCollision(){
    const head = snake[0]
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame()
    }

    for(let i = 1; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame()
        }
    }
}

function resetGame(){
    stopGame()
    updateHighScore()
    food = foodGenerator()
    snake = [{x: 10, y:10}]
    direction = 'left'
    gameSpeed = 200
    updateScore()
}

function updateScore(){
    const currentScore = snake.length - 1
    score.textContent = currentScore.toString().padStart(3, '0')
}

function stopGame(){
    clearInterval(gameInterval)
    gameStart = false
    instractionText.style.display = 'block'
    logo.style.display = 'block'
}

function updateHighScore(){
    const currentScore = snake.length - 1
    if(currentScore > highScore){
        highScore = currentScore
    }
    highScoreText.textContent = highScore.toString().padStart(3, '0')
    highScoreText.style.display = 'block'
}