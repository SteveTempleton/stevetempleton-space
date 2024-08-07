/**
 * Code was used from a tutorial
 * Tutorial: https://www.youtube.com/watch?v=Y-GkMjUZsmM
 * github: WebDevSimplified - https://github.com/WebDevSimplified/JavaScript-Tic-Tac-Toe
 */

/**
 * Declare variables
 */
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// board and cells
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const turnElement = document.getElementById('turnMessage')
const turnMessageTextElement = document.querySelector('[data-turn-message-text]')

// win screen and restart button
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')

let circleTurn

// start game on poge load
startGame()

// on restart button click, start a new game
restartButton.addEventListener('click', startGame)

/**
 * Start Game 
 * Remove all symbols, reset the event lister, and remove win/draw scene
 */
function startGame() {
  circleTurn = false
  turnMessageTextElement.innerText = `X's Turn`
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

/**
 * Display the current player's turn 
 * @param {*} circleTurn state of turn
 */
function displayTurn(circleTurn) {
  if (!circleTurn) {
    turnMessageTextElement.innerText = `O's Turn`
  } else {
    turnMessageTextElement.innerText = `X's Turn`
  }
}

/**
 * Handle clicking on a cell
 * Place symbol and decide if the game is over
 * Swap Turns if game isn't over
 * @param {*} e event click on cell
 */
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  displayTurn(circleTurn)
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

/**
 * Place correct symbol on board
 * @param {*} cell select by player
 * @param {*} currentClass current symbol to place
 */
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

/**
 * switch turns
 */
function swapTurns() {
  circleTurn = !circleTurn
}

/**
 * Remove the abliity to use square
 * Add symbol
 */
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

/**
 * End Game and display message
 * Display correct winner based on current turn
 * @param {*} draw boolean 
 */
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

/**
 * If the board is full without a winner, return true
 * @returns boolean
 */
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

/**
 * Check if the current board ends with a win
 * @param {*} currentClass cell that was just selected
 * @returns boolean
 */
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}