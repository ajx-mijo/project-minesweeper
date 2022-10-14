function init() {
  // ? Create grid
  // Element of a grid - saved easy/ medium/ hard variants (custom? - requires more dynamic code with set variants) // Limits on square sizer!!)
  // ? Grid Variables
  // Initally set to 9x9 but will be made dynamic in order to allow for user choice in game difficulty/size
  // Random assignment of bombs through value or class (10 in this example but will be set against hard/medium/easy - next step user input bomb count)
  // Width
  // Object levels of difficulty stored in objects width/height/bombs etc. (function for all game types)
  // Height
  // Amount of bombs
  // Each game board (square? newGame?) = []
  // ? Character Variables
  // All cells will be assigned dataset values for reference in later recursive functions when checking neighbours after click events
  // ? Executions
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
}
document.addEventListener('DOMContentLoaded', init)