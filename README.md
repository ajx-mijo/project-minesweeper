# project-minesweeper
GE Project 1

General note about philosophy using class and data-values to interrogate and manipulate game functions - not sure if best approach - required a strong logical approach

Started out by building out the skeleton of my html through the DOM and appending the child element to their respective parents
Next I moved to focus on generating a unique, random game board on each initialization of the window. To do this I first hard-coded width/height and bomb count to make the development process more straightforward.
I then created a function which formed two arrays containing the number of 'safe' spaces and the number of 'bomb' spaces dyanmically which were then combined in a random order to create my game Board.
I then looped through that random array assigning each grid a dataset value correspondent to its position for positional tracking throughout development and pushed it to a globally defined array so each iteration of a game board would be accessible to all my further functions.
The next step would involve establishing the number of bombs neighbouring each square in order to ascertain the number values of 'safe' cells. In order to achieve this I first established to left and right hand edges of the grid using width/modulus calculations in order to prevent cells checking their wrapped neighbours or potentially non-existent neighbours (-1 etc.) and breaking the code.
I then created a locally defined variable so I could store the cumulative total of 'bomb' nieghbours relative to each cell.
In order to check all possible nieghbours (maximum 8, four straight, four diagonal) I wrote a for loop to iterate over the grid with 8 if statements corrspondent to the 8 possibilities whilst accounting for 'impossible neighbours' with truthy statements and the pre-defined left and right edges.
The number of 'bomb' neighbours was then added to each grid as a dataset value so that it could be latter used by pushing to innerText to responsively display following user interaction.
This function was called at the end of the creatNewBoard function which was then initialized itself by a simple startGame button with an eventListener attached which cleared any existing board and generated a new one.

Following the successful creation of game boards I then switched my attention to building out the main game functions when it game to user interaction. 
I focussed first on the 'left-click' event when a user uncovers a cell, accounting for safe, number-value cells, bomb cells (and consequent loss of game), flagged cells and cells which had a number value of 0

I then created a timer display to be initialized when the game was started/reset/ or a custom game was generated

I then created a simple bomb /flag counter which was set to the bomb amount and was reduced by 1 after every flag(anchor) was placed by the player on the grid


Challenge - disable right click menu pop-up (on game), disable right-click on game before game init