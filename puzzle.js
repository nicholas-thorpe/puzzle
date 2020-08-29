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
			newElement.id = ((i * 3) + j);
			newElement.alt = "cat" + ((i * 3) + j + 1);
			newElement.onclick = function(){return move();};
			
			//Load the image onto the board
			var row = rows[i];
			row.appendChild(newElement);
		}
	}
	
	//Randomly shuffle the images
	shuffle();
	
	//Enable the reset button's onclick handler
	document.getElementById("reset").onclick = function(){return reset();};
}

/*
	Resets the board when the users clicks the "Play Again" button
*/
function reset() {
	//Reset score
	clicks = 0;
	
	//Set the board back to default
	for (let i = 0; i < 3; i++)
		for (let j = 0; j < 3; j++)
			document.getElementById((i * 3) + j).src = images[i][j];
	
	//Randomly shuffle the images
	shuffle();
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
			rand1 = Math.floor(Math.random() * 9);
			rand2 = Math.floor(Math.random() * 9);
			swap(rand1, rand2);
		}
	} while (isSolved())
}

/*
	Checks to see if the board is solved
*/
function isSolved() {
	//Compares the current images to the solved images
	//If a difference is found, the board is not solved
	for (let i = 0; i < 3; i++)
		for (let j = 0; j < 3; j++)
			if ((i + j) > 0) {
				var current = document.getElementById((i * 3) + j).src;
				var solved = images[i][j];
				current = current.slice(current.length - 5);
				solved = solved.slice(solved.length - 5);
				if (current != solved)
					return false;
			}
	
	return true;
}

/*
	Handles tile swapping for shuffle() and move()
*/
function swap(tile1, tile2) {
	var temp = document.getElementById(tile1).src;
	document.getElementById(tile1).src = document.getElementById(tile2).src;
	document.getElementById(tile2).src = temp;
}

/*
	Documentation
*/
function move() { 
	
}

/*
	Things to do when the user wins
*/
function end() {
	//Update the score box
	score = document.getElementById("score");
	score.text = clicks;
	
	//Alert the user of the win
	alert("You win! Score: " + clicks);
}

window.onload = prepareBoard;
