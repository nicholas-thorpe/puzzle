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

//Prepare the element array
var elements = new Array(3);
for (let i = 0; i < 3; i++)
	elements[i] = new Array(3);

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
			
			//Store element info
			elements[i][j] = newElement;
			
			//Add the onclick handler to all but the blank tile
			if ((i + j) > 0)
				newElement.onclick = function(){return move();};
			
			//Load the image onto the board
			var row = rows[i];
			row.appendChild(newElement);
		}
	}
	
	//Makes the top left image blank
	elements[0][0].src = blank;
		
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
			elements[i][j].src = images[i][j];
	
	//Makes the top left image blank
	elements[0][0] = blank;
	
	//Enable the tiles' onclick handlers
	for (let i = 0; i < 3; i++)
		for (let j = 0; j < 3; j++)
			if ((i + j) > 0)
				elements[i][j].onclick = function(){return move();};
	
	//Randomly shuffle the images
	shuffle();
}

/*
	Randomly shuffles the images
*/
function shuffle() {	
	//Makes 1000 random moves
	//After these moves, checks if the board is solved, and if so shuffles again
	do {
		for (let i = 0; i < 1000; i++) {
			randx1 = Math.floor(Math.random() * 3);
			randy1 = Math.floor(Math.random() * 3);
			randx2 = Math.floor(Math.random() * 3);
			randx2 = Math.floor(Math.random() * 3);
			swap(randx1, randy1, randx2, randx2);
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
				var current = elements[i][j].src;
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
function swap(x1, x2, y1, y2) {
	//Checks if the swap is valid
	
	//Swaps the tiles
	var temp = elements[x1][y1].src;
	elements[x1][y1].src = elements[x2][y2].src;
	elements[x2][y2].src = temp;
}

/*
	Onclick handler for all tiles
*/
function move() { 
	
	
	
	//Increment the click counter
	clicks++;
	
	//If the board is solved, go to the end state
	if (isSolved())
		end();
}

/*
	Things to do when the user wins
*/
function end() {
	//Disable all tiles' onclick handlers
	for (let i = 0; i < 3; i++)
		for (let j = 0; j < 3; j++)
			elements[i][j].onclick = NULL;
	
	//Change the blank tile to the original picture
	elements[0][0].src = images[0][0];
	
	//Update the score box
	document.getElementById("score").text = clicks;
	
	//Alert the user of the win
	alert("You win! Score: " + clicks);
}

window.onload = prepareBoard;
