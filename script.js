//elememt varaibles
const board = document.getElementById("game-board")

//game varaibels
let food = foodGenerator()
let snake = [{x: 10, y:10}]

let draw = () => {
    board.innerHTML = ""
    drawFood()
    drawSnake()
}


//Draw Food
function drawFood() {
    const foodElement = creatGameElemet('div', 'food')
    setPostion(foodElement, food)
    board.appendChild(foodElement)
}

//draw snake
function drawSnake() {
    const snakeElement = creatGameElemet('div', 'snake')
    snake.forEach((segment) => {
        setPostion(snakeElement, segment)
    })
    board.appendChild(snakeElement)
}

//main drawing function
draw()


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
    let x = Math.floor(Math.random() * 20) + 1
    let y = Math.floor(Math.random() * 20) + 1
    return {x,y}
}