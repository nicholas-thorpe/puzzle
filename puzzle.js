//Track score
var clicks = 0;

//Load the images
var blank = "images/blank.png"
var images = new Array(3);
for (let i = 0; i < 3; i++)
	images[i] = new Array(3);
for (let i = 0; i < 3; i++)
	for (let j = 0; j < 3; j++)
		images[i][j] = ("images/cat" + ((i * 3) + j + 1) + ".png");

//Prepare to store the positions
var positions = new Array(3)
for (let i = 0; i < 3; i++)
	positions[i] = new Array(3);

//Stores the solved positions
//Does this here so it doesn't repeat the process every time it checks for the solved state
var solved = new Array(3)
for (let i = 0; i < 3; i++) 
	solved[i] = new Array(3)
for (let i = 0; i < 3; i++)
	for (let j = 0; j < 3; j++)
		solved[i][j] = (i + j)

/*
	Adds the tiled image to the board
	Make miscellaneous preparations
*/
function prepareBoard() {
	//Check the browser is capable of basic things
	if (!document.getElementsByTagName)
		return;
	if (!document.getElementById)
		return;
	
	//Find the board
	rows = new Array(3)
	for (let i = 0; i < 3; i++)
		rows[i] = document.getElementById('row' + (i + 1));
	
	//Add the images
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			//Create the image and load its properties
			newElement = document.createElement('img');
			newElement.src = images[i][j];
			newElement.id = (i + j);
			newElement.alt = "cat" + (i + j);
			
			//Store the element's position
			positions[i][j] = (i + j);
			
			//Load the image onto the board
			var row = rows[i];
			row.appendChild(newElement);
		}
	}
	
	//Randomly shuffle the images
	shuffle();
	
	//Enable the reset button's onclick handler
	resetButton = document.getElementById("reset");
	resetButton.onclick = function(){return reset();};
}

/*
	Resets the board when the users clicks the "Play Again" button
*/
function reset() {
	//Reset score
	clicks = 0;
	
	//Set the board back to default
	
	
	//Randomly shuffle the images
	shuffle()
}

/*
	Randomly shuffles the images
*/
function shuffle() {
	//Makes the top left image blank
	var blankTile = document.getElementById(0);
	blankTile.src = blank;
	
	//Makes 1000 random moves
	//After these moves, checks if the board is solved, and if so shuffles again
	do {
		for (let i = 0; i < 1000; i++) {

		}
	} while (isSolved())
}

/*
	Checks to see if the board is solved
*/
function isSolved() {
	//Compares the current positions to the solved one
	//If they are the same, the board is solved
	
	for (let i = 0; i < 3; i++)
		for (let j = 0; i < 3; j++)
			if (solved[i][j] != positions[i][j])
				return false
	
	return true
}

/*
	Documentation
*/
function move() { 

}

window.onload = prepareBoard;
