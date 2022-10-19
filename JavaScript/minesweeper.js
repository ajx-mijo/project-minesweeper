function init() {
  // ? Create grid
  const body = document.querySelector('body')
  const header = document.createElement('header')
  const main = document.createElement('main')
  const menuDiv = document.createElement('div')
  const menuContents = document.createElement('div')
  const menuHighScoreDisplayDiv = document.createElement('div')
  const menuCustomControlsDiv = document.createElement('div')
  const customButton = document.createElement('button')
  const easyButton = document.createElement('button')
  const mediumButton = document.createElement('button')
  const hardButton = document.createElement('button')
  const menuStartResetButtonsDiv = document.createElement('div')
  const startButtonDiv = document.createElement('div')
  const resetButtonDiv = document.createElement('div')
  const startButton = document.createElement('button')
  const resetButton = document.createElement('button')
  const gameDisplayDiv = document.createElement('div')
  const gameBorderedDiv = document.createElement('div')
  const gameInterfaceDiv = document.createElement('div')
  const gridDiv = document.createElement('div')
  const gameCountersDiv = document.createElement('div')
  const flagCounterDiv = document.createElement('div')
  const timerDiv = document.createElement('div')
  header.classList.add('header')
  header.innerText = 'Minesweeper'
  menuDiv.classList.add('menu')
  menuContents.classList.add('menuContents')
  menuHighScoreDisplayDiv.classList.add('menuHighScore')
  menuCustomControlsDiv.classList.add('customControlInterface')
  customButton.classList.add('createButton')
  customButton.innerText = 'Custom'
  customButton.id = 'customGameStartButton'
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
  startButton.innerText = 'Start'
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
  body.appendChild(header)
  body.appendChild(main)
  main.append(menuDiv, gameDisplayDiv)
  menuDiv.appendChild(menuContents)
  menuContents.append(menuHighScoreDisplayDiv, menuCustomControlsDiv, menuStartResetButtonsDiv)
  menuCustomControlsDiv.append(customButton, easyButton, mediumButton, hardButton)
  menuStartResetButtonsDiv.append(startButtonDiv, resetButtonDiv)
  resetButtonDiv.appendChild(resetButton)
  startButtonDiv.appendChild(startButton)
  gameDisplayDiv.appendChild(gameBorderedDiv)
  gameBorderedDiv.append(gameInterfaceDiv)
  gameInterfaceDiv.append(gameCountersDiv, gridDiv)
  gameCountersDiv.append(flagCounterDiv, timerDiv)
  // Element of a grid - saved easy/ medium/ hard variants (custom? - requires more dynamic code with set variants) // Limits on square sizer!!)

  // ? Grid Variables
  const easyBoard = {
    height: 9,
    width: 9,
    bombsNumber: 10,
  }
  const mediumBoard = {
    height: 16,
    width: 16,
    bombsNumber: 40,
  }
  const hardBoard = {
    height: 16,
    width: 30,
    bombsNumber: 99,
  }
  let height = 9
  let width = 9
  let bombsNumber = 10
  let randomBoard = []
  // Initally set to 10x10 but will be made dynamic in order to allow for user choice in game difficulty/size
  // Random assignment of bombs through value or class (10 in this example but will be set against hard/medium/easy - next step user input bomb count)
  // Width
  // Object levels of difficulty stored in objects width/height/bombs etc. (function for all game types)
  // Height
  // Amount of bombs
  // Each game board (newGame?) = []

  // ? Character Variables
  function selectBoardDifficulty(event) {
    resetTimer()
    clearBoard()
    if (event.target.id === 'mediumGameStartButton') {
      gridDiv.setAttribute('id', 'medium')
      height = mediumBoard.height
      width = mediumBoard.width
      bombsNumber = mediumBoard.bombsNumber
    } else if (event.target.id === 'hardGameStartButton') {
      gridDiv.setAttribute('id', 'hard')
      height = hardBoard.height
      width = hardBoard.width
      bombsNumber = hardBoard.bombsNumber
    } else if (event.target.id === 'easyGameStartButton') {
      gridDiv.setAttribute('id', 'easy')
      height = easyBoard.height
      width = easyBoard.width
      bombsNumber = easyBoard.bombsNumber
    }
    startTimer()
    flagCounter()
    createNewBoard()
  }

  function createNewBoard() {
    const bombArray = Array(bombsNumber).fill('boom')
    //console.log(bombArray)
    const safeArray = Array(width * height - bombsNumber).fill('safe')
    //console.log(safeArray)
    const randomArray = safeArray.concat(bombArray).sort(() => Math.random() - 0.5)
    //console.log(randomArray)
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      //cell.innerHTML = i
      cell.classList.add(randomArray[i])
      gridDiv.appendChild(cell)
      randomBoard.push(cell)
    }
    neighbourBombCount()
    document.querySelector('.gameCounters').style.display = 'flex'
    document.querySelector('.gameBordered').style.display = 'grid'
  }
  // All cells will be assigned dataset values for reference in later recursive functions when checking neighbours after click events
  // Can the bombCount function be made recurisve?
  function neighbourBombCount() {
    // Loop through grid, checking each cell
    for (let i = 0; i < randomBoard.length; i++) {
      // Define right-edge index 0, one below, modulus === width - 1
      const rightEdge = i % width === width - 1
      // Define left-edge index 0, next row, one above, modulus === 0
      const leftEdge = i % width === 0
      // Store number of neighbour bombs for dataset & innerText
      let scaryNeighbours = 0
      // Check all possible immediate neighbours of a cell
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
        if (i > width - 1 && !rightEdge && randomBoard[i + 1].classList.contains('boom')) {
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
        // Store scaryNeighbours as dataset and put as innerText to check
        randomBoard[i].dataset.nearbyBombs = scaryNeighbours
        // randomBoard[i].innerText = randomBoard[i].dataset.nearbyBombs
        //console.log(randomBoard[i])
      }

      for (let i = 0; i < randomBoard.length; i++) {
        if (randomBoard[i].dataset.nearbyBombs === '0') {
          randomBoard[i].classList.remove('safe')
          randomBoard[i].classList.add('empty')
          //console.log(randomBoard[i])
        }
      }
    }
  }

  // ? Variables

  let timerScreen = document.querySelector('.timer')
  timerScreen.innerText = 0
  let sec = 0
  let flagCounterScreen = document.querySelector('.flagCounter')


  // ? Executions
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
    // randomBoard.splice(0, randomBoard.length)
    gridDiv.innerHTML = ''
    // while (gridDiv.firstChild) {
    //   gridDiv.removeChild(gridDiv.firstChild)
    // }
  }


  function startTimer() {
    timerScreen = setInterval(() => {
      sec += 1
      timerDiv.innerText = sec
    }, 1000)
    // if gameover pause startcountdown// global let gameOver = true/false statement then setTimeout
  }

  function resetTimer() {
    clearInterval(timerScreen)
    sec = 0
    timerScreen.innerText = 0
  }

  function flagCounter() {
    flagCounterScreen.innerText = bombsNumber
  }

  function plantFlag(event) {
    event.target.setAttribute('id', 'flag')
    flagCounterScreen.innerText -= 1
  }

  function leftClickGame(event) {
    console.log(event.target)
    //check game over first to disable click on grid function
    if (event.target.classList.contains('safe')) {
      // if statement to push to gameOverwin?
      event.target.classList.remove('safe')
      event.target.classList.add('cleared')
      event.target.innerText = event.target.dataset.nearbyBombs// revealing number of scaryNeighbours
    } else if (event.target.classList.contains('cleared')) {
      return
    } else if (event.target.classList.contains('flag')) {
      //if statement to GameOverWin?
      return
    } else if (event.target.classList.contains('boom')) {
      event.target.classList.remove('boom')
      event.target.classList.add('killer')
      gameOverLose()
    } else if (event.target.classList.contains('empty')) {
      // Call Recursive function
      //zeroNumberHunt(event)
    }
    // If contains class 'safe' remove 'safe' class add 'cleared' class - change styling and push nearbyBombs dataset to innerText, return
    // If contains cleared class, return
    // If contains flag return
    // If contains bomb GameOverLose function
    // If contains 0, recursive function to check neighbours for nearbyBombs dataset values > 0, if = 0 then check their neighbours until > 0 then change class from 'safe' to 'cleared' and push nearbyBombs dataset to innerText
  }

  //function zeroNumberHunt(event) {
  // Run result back into leftclickfunction to close loop as will return the correct outcome (i.e. change class and display number or display nothing)
  //if (cell contains 'safe' class) {
  //  change to cleared value 
  // push dataset.nearbyBombs to innerText
  //}
  // check dataset values in eight directions if zero in one direction check dataset values in eight directions(! - send it backwards?)
  //}

  function gameOverLose() {
    for (let i = 0; i < randomBoard.length; i++) {
      if (randomBoard[i].classList.contains('boom')) {
        randomBoard[i].classList.remove('boom')
        randomBoard[i].classList.add('dead')
      }
    }
  }

  // * Function: create board will run when start button clicked: fill with required amount of bomb/'empty' squares (arrays to store values? Combined? ) - auto board is 'Easy' version - define borders of square to prevent wrapping
  // * Function: Assign all non-bomb cells their number value based upon neighbouring bombs, loops? for each direction (8 total corners and sides) then assigning and storing data value (if statements? add to value for each bomb)
  // Function(rightclick): If value = risk apply value = flag if value = flag remove value = flag - will update flag/bomb counter
  // Function: if 0 value reveal neighbour squares until number square - wll use recurion
  // Function: click reveal - will use check recursion function
  // Function: Store and Display High Score (++ correspondent to each game difficulty)
  // Function: Winner - Victory Pop-up ++will display pop-up for name input for HighScore (with audio) congratulations
  // ! First click, if a bomb should reassign the bomb to the top left corner or nearest empty square
  // ++Function: Create 'Easy' board
  // ++Function: Create 'Medium' Board
  // ++Function: Create 'Hard' Board
  // ++Function: Create 'Custom' Board
  // Function: Reset game = remove current Board and create New 'Easy' Board (++Medium/Hard or Custom)
  // Function: gameOverWin - if all squares are revealed and the number of flags = number of bombs call function victory() - will have to dynamic for different game boards
  // Function: gameOverLose - some sort of pop up saying you lost and offering a restart button which will call the reset function.
  // ! Click/Check Function
  // Left click (cell) if contains bomb execute GameOverLose function
  // Left click (cell) if is value = cleared return, if is value = flag return
  // Left Click (cell) if value = risk then check underlying class, if bomb then gameOverLose function is called
  // If number = reveal (show stored data value) return, if empty space then use recursion to check neighbours and neighbours of neighbours until hitting a cell with a value > 0 and similar to revealing (show the stored data value) - I don't really know how recursion works atm :(
  // Function for click event using recursion and setTimeout(? - don't want repitition) to check 'neighbour' cells for value/bomb/flags
  // Above function will return or initiate appropriate action correspondent to value (or class?) or cell clicked - defined in separate functions
  // Click function will call a recursive search/check function which will probably use grid values (width, height and cell position to check/validate contents of 'neighbour cells')
  // ? Events
  // Click events on cells -reveal
  // Right click event on cells -flag plant + change 'flag/bomb' counter -1
  // Click event on Start button
  // Click event on reset button
  // ++ Click events for custom game options & custom game start (will display in console)
  // ++ Click events on Easy/Medium/Hard auto game select
  startButton.addEventListener('click', startGame)
  resetButton.addEventListener('click', resetBoard)
  easyButton.addEventListener('click', selectBoardDifficulty)
  mediumButton.addEventListener('click', selectBoardDifficulty)
  hardButton.addEventListener('click', selectBoardDifficulty)
  // customButton.addEventListener('click')
  gridDiv.addEventListener('click', leftClickGame)
  gridDiv.addEventListener('contextmenu', function (event) {
    plantFlag(event)
    event.preventDefault()
  }, false)
}

window.addEventListener('DOMContentLoaded', init)