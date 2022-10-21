function init() {
  // ? Create grid

  // DOM Elements

  const body = document.querySelector('body')
  const header = document.createElement('header')
  const main = document.createElement('main')

  // Menu Console Elements
  const menuDiv = document.createElement('div')
  const menuContents = document.createElement('div')
  const menuHighScoreDisplayDiv = document.createElement('div')
  const easyHighScoreDiv = document.createElement('div')
  const easyScore = document.createElement('div')
  const mediumHighScoreDiv = document.createElement('div')
  const mediumScore = document.createElement('div')
  const hardHighScoreDiv = document.createElement('div')
  const hardScore = document.createElement('div')
  const menuCustomControlsDiv = document.createElement('div')
  const easyButton = document.createElement('button')
  const mediumButton = document.createElement('button')
  const hardButton = document.createElement('button')
  const menuStartResetButtonsDiv = document.createElement('div')
  const startButtonDiv = document.createElement('div')
  const resetButtonDiv = document.createElement('div')
  const startButton = document.createElement('button')
  const resetButton = document.createElement('button')

  // Game Display Elements
  const gameDisplayDiv = document.createElement('div')
  const gameBorderedDiv = document.createElement('div')
  const gameInterfaceDiv = document.createElement('div')
  const gridDiv = document.createElement('div')
  const gameCountersDiv = document.createElement('div')
  const flagCounterDiv = document.createElement('div')
  const timerDiv = document.createElement('div')

  // DOM Element Class/ID/InnerText
  header.classList.add('header')
  header.innerText = 'Minesweeper'
  menuDiv.classList.add('menu')
  menuContents.classList.add('menuContents')
  easyHighScoreDiv.classList.add('easyHighScore')
  mediumHighScoreDiv.classList.add('mediumHighScore')
  hardHighScoreDiv.classList.add('hardHighScore')
  menuCustomControlsDiv.classList.add('customControlInterface')
  easyButton.classList.add('createButton')
  easyButton.innerText = 'Easy'
  easyButton.id = 'easyGameStartButton'
  mediumButton.classList.add('createButton')
  mediumButton.innerText = 'Medium'
  mediumButton.id = 'mediumGameStartButton'
  hardButton.classList.add('createButton')
  hardButton.innerText = 'Hard'
  hardButton.id = 'hardGameStartButton'
  menuStartResetButtonsDiv.classList.add('startResetButtons')
  startButtonDiv.classList.add('startResetButton')
  startButton.id = 'startButton'
  startButton.innerText = 'Initiate'
  resetButtonDiv.classList.add('startResetButton')
  resetButton.id = 'resetButton'
  resetButton.innerText = 'Reset'
  gameDisplayDiv.classList.add('gameDisplay')
  gameInterfaceDiv.classList.add('gameInterface')
  gameBorderedDiv.classList.add('gameBordered')
  gridDiv.classList.add('gridContainer')
  gameCountersDiv.classList.add('gameCounters')
  flagCounterDiv.classList.add('flagCounter')
  timerDiv.classList.add('timer')

  //DOM Element Structure
  body.appendChild(header)
  body.appendChild(main)
  main.append(menuDiv, gameDisplayDiv)
  menuDiv.appendChild(menuContents)
  menuContents.append(menuCustomControlsDiv, menuStartResetButtonsDiv)
  easyHighScoreDiv.appendChild(easyScore)
  mediumHighScoreDiv.appendChild(mediumScore)
  hardHighScoreDiv.appendChild(hardScore)
  menuCustomControlsDiv.append(easyButton, mediumButton, hardButton)
  menuStartResetButtonsDiv.append(startButtonDiv, resetButtonDiv)
  resetButtonDiv.appendChild(resetButton)
  startButtonDiv.appendChild(startButton)
  gameDisplayDiv.appendChild(gameBorderedDiv)
  gameBorderedDiv.append(gameInterfaceDiv)
  gameInterfaceDiv.append(gameCountersDiv, gridDiv)
  gameCountersDiv.append(flagCounterDiv, timerDiv)




  // ? Auto Grid/Board and Easy/Medium/Hard Boards
  let height = 9
  let width = 9
  let bombsNumber = 10

  const setBoard = {
    easyHeight: 9,
    easyWidth: 9,
    easyBombsNumber: 10,
    mediumHeight: 16,
    mediumWidth: 16,
    mediumBombsNumber: 40,
    hardHeight: 16,
    hardWidth: 30,
    hardBombsNumber: 99,
  }

  // ? Random Board Array
  let randomBoard = []




  // ? Create Easy/Hard/Medium Boards

  function selectBoardDifficulty(event) {
    resetTimer()
    clearBoard()
    if (event.target.id === 'easyGameStartButton') {
      gridDiv.setAttribute('id', 'easy')
      height = setBoard.easyHeight
      width = setBoard.easyWidth
      bombsNumber = setBoard.easyBombsNumber
    } else if (event.target.id === 'mediumGameStartButton') {
      gridDiv.setAttribute('id', 'medium')
      height = setBoard.mediumHeight
      width = setBoard.mediumWidth
      bombsNumber = setBoard.mediumBombsNumber
    } else if (event.target.id === 'hardGameStartButton') {
      gridDiv.setAttribute('id', 'hard')
      height = setBoard.hardHeight
      width = setBoard.hardWidth
      bombsNumber = setBoard.hardBombsNumber
    }
    startTimer()
    flagCounter()
    createNewBoard()
  }

  // ? Create New Game Board and Style through DOM

  function createNewBoard() {
    const randomArray = Array(width * height - bombsNumber).fill('safe').concat(Array(bombsNumber).fill('boom')).sort(() => Math.random() - 0.5)
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('cell')
      cell.dataset.index = i
      cell.classList.add(randomArray[i])
      gridDiv.appendChild(cell)
      randomBoard.push(cell)
      cell.addEventListener('click', leftClickGame)
    }
    neighbourBombCount()
    document.querySelector('.gameCounters').style.display = 'flex'
    document.querySelector('.gameBordered').style.display = 'grid'
  }

  // ? Main Left-click function which calls recursive function

  function leftClickGame(event) {
    const targetCell = event.target
    const cellIndex = targetCell.dataset.index
    if (targetCell.classList.contains('safe')) {
      targetCell.classList.remove('safe')
      targetCell.classList.add('cleared')
      if (parseInt(targetCell.dataset.nearbyBombs) > 0) {
        targetCell.innerText = targetCell.dataset.nearbyBombs
      }
      checkNeighbours(targetCell, cellIndex)
      const checkArray = randomBoard.filter(cell => cell.classList.contains('safe'))
      if (checkArray.length === 0) {
        gameOverWin()
      }
    } else if (targetCell.classList.contains('cleared')) {
      return
    } else if (targetCell.id === 'flag') {
      return
    } else if (targetCell.classList.contains('boom')) {
      const removeFlagArray = randomBoard.filter(cell => cell.id === 'flag')
      removeFlagArray.forEach(cell => cell.removeAttribute('id', 'flag'))
      targetCell.classList.remove('boom')
      targetCell.classList.add('killer')
      gameOverLose()
    }
  }

  // ? Right-click/plant flag function

  function plantFlag(event) {
    if (event.target.classList.contains('cleared') || event.target.classList.contains('killer') || event.target.classList.contains('dead')) {
      return
    }
    if (event.target.id === 'flag') {
      event.target.removeAttribute('id', 'flag')
      event.target.classList.remove('clickDisabled')
      bombsNumber++
    } else {
      event.target.setAttribute('id', 'flag')
      event.target.classList.add('clickDisabled')
      bombsNumber--
    }
    flagCounter()
    setTimeout(checkProgress(), 1000)
  }

  // ? Progress Check function which checks if all bombs have been safely identified
  function checkProgress() {
    const checkBoard = randomBoard.filter(cell => cell.classList.contains('boom'))
    if (checkBoard.every(item => item.id === 'flag')) {
      setTimeout(gameOverWin(), 1000)
    }
  }

  // ? Checking Neighbour Bomb Count and storing as Data Value on object
  function neighbourBombCount() {
    for (let i = 0; i < randomBoard.length; i++) {
      const rightEdge = i % width === width - 1
      const leftEdge = i % width === 0
      let scaryNeighbours = 0
      if (randomBoard[i].classList.contains('safe')) {
        // Left-check
        if (i > 0 && !leftEdge && randomBoard[i - 1].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Top check
        if (i >= width && randomBoard[i - width].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Right Check
        if (i <= randomBoard.length && !rightEdge && randomBoard[i + 1].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Bottom Check
        if (i < randomBoard.length - width && randomBoard[i + width].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Top-Left Check
        if (i > width - 1 && !leftEdge && randomBoard[i - width - 1].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Top-Right Check
        if (i >= width && !rightEdge && randomBoard[i - width + 1].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Bottom-Left Check
        if (i <= randomBoard.length - width && !leftEdge && randomBoard[i + width - 1].classList.contains('boom')) {
          scaryNeighbours++
        }
        // Bottom-Right Check
        if (i < randomBoard.length - width - 1 && !rightEdge && randomBoard[i + width + 1].classList.contains('boom')) {
          scaryNeighbours++
        }
        randomBoard[i].dataset.nearbyBombs = scaryNeighbours
      }
    }
  }


  // ? Recursive function to reveal neighbours of empty squares

  function checkNeighbours(targetCell, cellIndex) {
    const targetCellIndex = randomBoard[cellIndex]
    console.log(targetCellIndex)
    const neighbours = findAllNeighbours(width, targetCellIndex)// should be an array so can forEach
    // console.log(neighbours)
    neighbours.forEach(neighbour => {
      if (parseInt(neighbour.dataset.nearbyBombs) === 0 && neighbour.classList.contains('safe')) {
        neighbour.classList.remove('safe')
        neighbour.classList.add('cleared')
        checkNeighbours(neighbour, neighbour.dataset.index)
        return
      } else if (neighbour.classList.contains('safe') && parseInt(neighbour.dataset.nearbyBombs) > 0) {
        neighbour.classList.remove('safe')
        neighbour.classList.add('cleared')
        neighbour.innerText = neighbour.dataset.nearbyBombs
        // checkNeighbours(neighbour, neighbour.dataset.index)
        return
      } else if (neighbour.classList.contains('cleared')) {
        return
      }
    })
  }

  // ? Function which generates array of neighbours to be passed into the recurisve function

  function findAllNeighbours(width, targetCellIndex) {
    console.log(targetCellIndex)
    const index = parseInt(targetCellIndex.dataset.index)
    const neighbourHoodArray = []
    if (index % width === width - 1) {
      console.log('Right')
      if (randomBoard[index + width]) {
        neighbourHoodArray.push(randomBoard[index + width])
      }
      if (randomBoard[index - width]) {
        neighbourHoodArray.push(randomBoard[index - width])
      }
      if (randomBoard[index + width - 1]) {
        neighbourHoodArray.push(randomBoard[index + width - 1])
      }
      if (randomBoard[index - width - 1]) {
        neighbourHoodArray.push(randomBoard[index - width - 1])
      }
      if (randomBoard[index - 1]) {
        neighbourHoodArray.push(randomBoard[index - 1])
      }
    } else if (!(index % width)) {
      console.log('Left')
      if (randomBoard[index + width]) {
        neighbourHoodArray.push(randomBoard[index + width])
      }
      if (randomBoard[index + width + 1]) {
        neighbourHoodArray.push(randomBoard[index + width + 1])
      }
      if (randomBoard[index + 1]) {
        neighbourHoodArray.push(randomBoard[index + 1])
      }
      if (randomBoard[index - width]) {
        neighbourHoodArray.push(randomBoard[index - width])
      }
      if (randomBoard[index - width + 1]) {
        neighbourHoodArray.push(randomBoard[index - width + 1])
      }
    } else {
      console.log('Middle')
      if (randomBoard[index + width - 1]) {
        neighbourHoodArray.push(randomBoard[index + width - 1])
      }
      if (randomBoard[index + width]) {
        neighbourHoodArray.push(randomBoard[index + width])
      }
      if (randomBoard[index - width]) {
        neighbourHoodArray.push(randomBoard[index - width])
      }
      if (randomBoard[index - width - 1]) {
        neighbourHoodArray.push(randomBoard[index - width - 1])
      }
      if (randomBoard[index + 1]) {
        neighbourHoodArray.push(randomBoard[index + 1])
      }
      if (randomBoard[index - 1]) {
        neighbourHoodArray.push(randomBoard[index - 1])
      }
      if (randomBoard[index + width + 1]) {
        neighbourHoodArray.push(randomBoard[index + width + 1])
      }
      if (randomBoard[index - width + 1]) {
        neighbourHoodArray.push(randomBoard[index - width + 1])
      }
    }
    return neighbourHoodArray
  }

  // ? Timer Variables

  let timerScreen = document.querySelector('.timer')
  timerScreen.innerText = 0
  let sec = 0
  const flagCounterScreen = document.querySelector('.flagCounter')



  // ? Game Start/Reset/Timer Functions

  function startGame() {
    resetTimer()
    clearBoard()
    createNewBoard()
    flagCounter()
    startTimer()
  }

  function resetBoard() {
    resetTimer()
    clearBoard()
    createNewBoard()
    flagCounter()
    startTimer()
  }

  function clearBoard() {
    randomBoard.splice(0, randomBoard.length)
    gridDiv.innerHTML = ''
  }


  function startTimer() {
    timerScreen = setInterval(() => {
      sec += 1
      timerDiv.innerText = sec
    }, 1000)
  }

  function resetTimer() {
    clearInterval(timerScreen)
    sec = 0
    timerScreen.innerText = 0
  }

  function flagCounter() {
    flagCounterScreen.innerHTML = bombsNumber
  }


  // ? Gameover functions

  // function clearRemainingCells() {
  //   const clearRemainingArray = randomBoard.filter(cell => cell.classList.contains('safe'))
  //   clearRemainingArray.forEach(cell => {cell.classList.add('cleared') && cell.innerText = cell.dataset.nearbyBombs}
  // }
  function gameOverWin() {
    clearRemainingCells()
    clearInterval(timerScreen)
    setTimeout(alert('You Won!'), 2000)
    // Change all safe cells - cleared - filter and then change
  }

  function gameOverLose() {
    clearInterval(timerScreen)
    for (let i = 0; i < randomBoard.length; i++) {
      if (randomBoard[i].classList.contains('boom')) {
        randomBoard[i].classList.remove('boom')
        randomBoard[i].classList.add('dead')
      }
    }
  }

  // ? Event Listeners
  startButton.addEventListener('click', startGame)
  resetButton.addEventListener('click', resetBoard)
  easyButton.addEventListener('click', selectBoardDifficulty)
  mediumButton.addEventListener('click', selectBoardDifficulty)
  hardButton.addEventListener('click', selectBoardDifficulty)
  gridDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('clickDisabled')) {
      event.stopPropagation()
    }
  }, true)
  gridDiv.addEventListener('contextmenu', function (event) {
    plantFlag(event)
    event.preventDefault()
  }, false)
}

window.addEventListener('DOMContentLoaded', init)