# Project-Minesweeper ReadMe

## Description

Project-Minesweeper was my first solo project at General Assembly and was focussed on utilising a HTML5/CSS3/JavaScript stack to deliver a functional and enjoyable game based on the classic Minesweeper title.


## Deployment link -  [Project Minesweeper](https://ajx-mijo.github.io/project-minesweeper/) 

![Project Screenshot](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451846/readMe/image7_xejmze.png)


## Getting Started/Code Installation

My code is available on my public GitHub repo at the above link.


## Timeframe & Working Team

This Minesweeper build was a week-long solo project where all parts of the process were conducted independently from planning to delivery.


## Technologies Used

- JavaScript
- HTML5
- CSS 3
- VSCODE
- GitHub
- Google Chrome DevTools



## Brief
The brief set out by the instructional team was to build out a version of Minesweeper which was to be playable by one user, against the computer and should clear the board and generate another upon game completion. Furthermore an emphasis was placed on random board generation, differing board sizes and a tracker to keep track of high-scores. The noted significant challenge was the inclusion of recursive functions which was not a topic we had covered in our JavaScript module.




## Planning

To plan my project, I initially sketched out a rough list of the main functionalities and interface design I would have to consider. I then constructed a wireframe and wrote out my functions in pseudo-code and long-form sentences so that I could fully verbalise my mental conceptions of the relevant steps.

![Project Wireframe Screenshot](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451845/readMe/image8_eghn1k.png)

Note that this wireframe underwent alterations during the course of the project as I decided to move the console below the Game Display in a vertical stack to fit with my ‘naval’ aesthetic design decisions.

My day-to-day planning was established in a flexible manner which I reviewed at the beginning and end of every day on project.





## Build/Code Process

My process started out by building the skeleton of my HTML through the DOM and appending the child element to their respective parents.

Next I moved to focus on generating a unique, random game board on each initialization of the window. To do this, I first hard-coded width/height and bomb count to make the development process more straightforward which was then later changed to a dynamic function which accessed an object and global variables to define the height/width and bomb count for each game board.

![Code Screenshot - Game Board](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451844/readMe/image6_aavnrx.png)

I then created a function which formed two arrays containing the number of 'safe' spaces and the number of 'bomb' spaces dynamically which were then combined in a random order to create my game Board.
Next I looped through that random array assigning each grid a dataset value correspondent to its position for positional tracking throughout development and pushed it to a globally defined array so each iteration of a game board would be accessible to all my further functions.

The next step involved establishing the number of bombs neighbouring each square in order to ascertain the number values of 'safe' cells. In order to achieve this, I first established the left and right hand edges of the grid using width/modulus calculations in order to prevent cells checking their wrapped ‘neighbours’ and displaying recognizing an incorrect number of neighbours. By creating a locally defined variable,  I could store the cumulative total of 'bomb neighbours’ relative to each cell.

![Code Screenshot - Bomb Placement](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451844/readMe/image2_ojhdsj.png)

In order to check all possible neighbours (maximum 8, four straight, four diagonal) I wrote a for loop to iterate over the grid with 8 if statements corresponding to the 8 possibilities whilst accounting for 'impossible neighbours' with truthy statements and the pre-defined left and right edges.

![Code Screenshot - Check Neighbouring Cell function](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451844/readMe/image5_elabx4.png)

The number of 'bomb' neighbours was then added to each grid as a dataset value so that it could be latter used by pushing to innerText to responsively display following user interaction.

Following the successful creation of game boards, I then switched my attention to building out the main game functions for user interaction. 

I focussed first on the 'left-click' event when a user uncovers a cell, accounting for safe, number-value cells, bomb cells (and consequent loss of game), flagged cells and cells which had a dataset ‘bomb-neighbour’ value of 0. One of the challenges around the click function was cell disablement if a flag was placed on the cell via right-click. I achieved functionality through the combination of a right-click function and a DOM event Listener which prevented propagation.

![Code Screenshot - Flag Function](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451844/readMe/image1_kwfb66.png)

![Code Screenshot - Event Listeners](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451844/readMe/image4_zrt8ft.png)
 

I created a timer display to be initialised when the game was started/reset/ or a custom game was generated.

I then built a simple bomb /flag counter which was set to the bomb amount and was reduced by 1 after every flag (anchor stylistically) was placed by the player on the game board.

The final significant element of my build was coding the recursive function which would reveal ‘safe’ cells if an ‘empty’ was clicked on. The recursive function would be called within the main click function and would use a secondary function to generate an array of neighbours for each cell which would be passed through the recursive function and ‘reveal’ all ‘safe’ cells before passing empty cells back through.

![Code Screenshot - Recursive Function](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673451844/readMe/image3_pizzvr.png)

## Challenges

- Writing a recursive function was difficult until I was able to access the DOM elements I needed to and create an array that could be iterated over. Taking the process step-by-step and console.logging all elements of my function helped me achieve functionality (although it is not the most DRY code).
- The process of debugging was new to me and certainly took more time than I built into my initial plan - this would be a point that I will consider more closely moving forward onto new projects.


## Wins
- Coding a recursive function which iterated through an array and called itself when necessary
- Developing random board generation 
- Chaining functions to call each other and generate a playable Minesweeper game








## Key Learnings/Takeaways

- My confidence around manipulation and accessing the DOM improved due to the use of functions to dynamically access the DOM and relay critical information to further functions and establish functionality.
- Writing a recursive function has developed my understanding of the complexities of JavaScript functions.
- I also improved my project management skills and put into practice solid wireframing and pseudo-coding techniques. There is certainly room for improvement in this area and I would actively consider using a workboard for my next project to establish ‘mini-deadlines’ within my workflow.



## Bugs

- The recursive function for bubbling out from a square with no ‘bomb’ neighbours is overpowered and clears to much of the board
- The win/lose alert should be removed as it occurs before the final square or bomb detonation visually occurs, slightly degrading user experience.
- The game timer should only start once the user interacts with the game
- The first click should always be on an empty cell and any underlying bomb can be reassigned to another cell.



## Future Improvements

- Responsiveness improvements for smaller screen devices which would involve reorientation of main game elements to allow for better game usability.
- Custom Game Size option for users.
- Active High Score display for Easy/Intermediate/Hard game difficulties.
- Bug fixes
- More detailed page styling.