function init() {
  // ? Create grid
  const body = document.querySelector('body')
  const header = document.createElement('header')
  const main = document.createElement('main')
  const menuDiv = document.createElement('div')
  const menuTitleDiv = document.createElement('div')
  const menuHighScoreDisplayDiv = document.createElement('div')
  const menuCustomControlsDiv = document.createElement('div')
  const createCustomButton = document.createElement('button')
  const customWidth = document.createElement('div')
  const customHeight = document.createElement('div')
  const customBombs = document.createElement('div')
  const menuStartResetButtonsDiv = document.createElement('div')
  const startButton = document.createElement('button')
  const resetButton = document.createElement('button')
  const gameDisplayDiv = document.createElement('div')
  const gameBorderedDiv = document.createElement('div')
  const gridDiv = document.createElement('div')
  const gameCountersDiv = document.createElement('div')
  const flagCounterDiv = document.createElement('div')
  const timerDiv = document.createElement('div')
  header.classList.add('header')
  menuDiv.classList.add('menu')
  menuTitleDiv.classList.add('menuTitle')
  menuHighScoreDisplayDiv.classList.add('menuHighScore')
  menuCustomControlsDiv.classList.add('customControls')
  createCustomButton.classList.add('createCustomButton')
  createCustomButton.id = 'customGameStartButton'
  customWidth.classList.add('customControls')
  customHeight.classList.add('customControls')
  customBombs.classList.add('customControls')
  menuStartResetButtonsDiv.classList.add('startResetButtons')
  startButton.classList.add('startResetButtons')
  startButton.id = 'startButton'
  resetButton.classList.add('startResetButtons')
  resetButton.id = 'resetButton'
  gameDisplayDiv.classList.add('gameDisplay')
  gameBorderedDiv.classList.add('gameBordered')
  gridDiv.classList.add('grid')
  gameCountersDiv.classList.add('gameCounters')
  flagCounterDiv.classList.add('flagCounter')
  timerDiv.classList.add('timer')
  body.appendChild(header)
  body.appendChild(main)
  main.append(menuDiv, gameDisplayDiv)
  menuDiv.append(menuTitleDiv, menuHighScoreDisplayDiv, menuCustomControlsDiv, menuStartResetButtonsDiv)
  menuCustomControlsDiv.append(createCustomButton, customWidth, customHeight, customBombs)
  menuStartResetButtonsDiv.append(startButton, resetButton)
  gameDisplayDiv.appendChild(gameBorderedDiv)
  gameBorderedDiv.append(gameCountersDiv, gridDiv)
  gameCountersDiv.append(flagCounterDiv, timerDiv)
  // Element of a grid - saved easy/ medium/ hard variants (custom? - requires more dynamic code with set variants) // Limits on square sizer!!)

  // ? Grid Variables
  const width = 10
  const height = 10
  const bombsNumber = 10
  const cellCount = width * height
  const randomBoard = []
  // Initally set to 10x10 but will be made dynamic in order to allow for user choice in game difficulty/size
  // Random assignment of bombs through value or class (10 in this example but will be set against hard/medium/easy - next step user input bomb count)
  // Width
  // Object levels of difficulty stored in objects width/height/bombs etc. (function for all game types)
  // Height
  // Amount of bombs
  // Each game board (square? newGame?) = []

  // ? Character Variables

  function createBoard() {
    const bombArray = Array(bombsNumber).fill('boom')
    console.log(bombArray)
    const safeArray = Array(cellCount - bombsNumber).fill('safe')
    console.log(safeArray)
    const shuffledArray = safeArray.concat(bombArray).sort(() => Math.random() - 0.5)
    console.log(shuffledArray)
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      cell.innerHTML = i
      cell.classList.add(shuffledArray[i])
      gridDiv.appendChild(cell)
      randomBoard.push(cell)
    }
  }
  createBoard()
  // All cells will be assigned dataset values for reference in later recursive functions when checking neighbours after click events
  // ? Executions
  function startGame() {

  }
  // Function: create board will run when start button clicked: fill with required amount of bomb/'empty' squares (arrays to store values? Combined? ) - auto board is 'Easy' version - define borders of square to prevent wrapping
  // Function: Assign all non-bomb cells their number value based upon neighbouring bombs, loops? for each direction (8 total corners and sides) then assigning and storing data value (if statements? add to value for each bomb)
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
  //document.addEventListener('click',)
}

window.addEventListener('DOMContentLoaded', init)