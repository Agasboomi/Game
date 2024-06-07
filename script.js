const X_CLASS = 'x'
const O_CLASS = 'o'
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
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('.winning-message-text')
const playAgainButton = document.getElementById('playAgainButton')
const closeButton = document.querySelector('.close-button')
const oneVsOneButton = document.getElementById('oneVsOne')
const playerVsComputerButton = document.getElementById('playerVsComputer')
const backButton = document.getElementById('backButton')
const modeSelection = document.getElementById('modeSelection')
const gameContainer = document.querySelector('.game-container')
let oTurn
let vsComputer = false

oneVsOneButton.addEventListener('click', () => {
  vsComputer = false
  startGame()
})

playerVsComputerButton.addEventListener('click', () => {
  vsComputer = true
  startGame()
})

restartButton.addEventListener('click', startGame)
playAgainButton.addEventListener('click', () => {
  closeModal()
  startGame()
})
closeButton.addEventListener('click', closeModal)
backButton.addEventListener('click', showModeSelection)

function startGame() {
  oTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.add('hidden')
  board.style.display = 'grid'
  restartButton.classList.remove('hidden')
  modeSelection.classList.add('hidden')
  gameContainer.classList.remove('hidden')
  
  if (vsComputer && oTurn) {
    makeComputerMove()
  }
}

function handleClick(e) {
  const cell = e.target
  const currentClass = oTurn ? O_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    if (vsComputer && oTurn) {
      makeComputerMove()
    } else {
      setBoardHoverClass()
    }
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.remove('hidden')
  winningMessageElement.style.display = 'block'
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  oTurn = !oTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(O_CLASS)
  if (oTurn) {
    board.classList.add(O_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function closeModal() {
  winningMessageElement.classList.add('hidden')
  winningMessageElement.style.display = 'none'
}

function showModeSelection() {
  gameContainer.classList.add('hidden')
  modeSelection.classList.remove('hidden')
}

function makeComputerMove() {
  const emptyCells = [...cellElements].filter(cell => {
    return !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
  })
  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  placeMark(emptyCells[randomIndex], O_CLASS)
  if (checkWin(O_CLASS)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}
